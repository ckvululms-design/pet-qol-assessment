const crypto = require("crypto");

const SHEET_HEADERS = [
  "createdAt",
  "firebaseRecordId",
  "assessmentDate",
  "assessmentId",
  "assessmentTitle",
  "petNameOrCode",
  "patientRecordNumber",
  "patientDigits",
  "isExternalUser",
  "totalScore",
  "maxScore",
  "qualityPercent",
  "completedItems",
  "totalItems",
  "overallScore",
  "interpretation",
  "categoryScores",
  "pdfFileName",
  "pdfFileUrl",
  "notes",
];

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const config = readConfig();
    if (!config.ready) {
      res.status(503).json({
        error: `Google export is not configured: ${config.missing.join(", ")}`,
      });
      return;
    }

    const payload = await readJsonBody(req);
    const record = payload?.record;
    if (!record?.assessmentId || !Array.isArray(record.answers)) {
      res.status(400).json({ error: "Invalid record payload" });
      return;
    }

    const accessToken = await getAccessToken(config);
    const folderId = getFolderId(config, record.assessmentId);
    const fileBaseName = buildFileBaseName(record);
    const pdf = await createPdfFile({
      accessToken,
      folderId,
      fileBaseName,
      html: renderRecordHtml(record, payload.firebaseRecordId || ""),
      keepSourceDoc: config.keepSourceDoc,
    });

    await ensureSheet(accessToken, config.sheetId, config.sheetName);
    await appendSheetRow({
      accessToken,
      sheetId: config.sheetId,
      sheetName: config.sheetName,
      row: buildSheetRow(record, payload.firebaseRecordId || "", pdf),
    });

    res.status(200).json({
      ok: true,
      pdfFileId: pdf.id,
      pdfFileName: pdf.name,
      pdfFileUrl: pdf.webViewLink,
      sheetName: config.sheetName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Google export failed" });
  }
};

async function readJsonBody(req) {
  if (req.body) {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

function readConfig() {
  const config = {
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    sheetId: process.env.GOOGLE_SHEET_ID,
    sheetName: process.env.GOOGLE_SHEET_NAME || "Records",
    defaultFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID,
    keepSourceDoc: process.env.GOOGLE_KEEP_SOURCE_DOC === "true",
    folders: {
      "dog-fetch": process.env.GOOGLE_DRIVE_FOLDER_DOG_FETCH,
      "dog-hrql": process.env.GOOGLE_DRIVE_FOLDER_DOG_HRQL,
      "cat-qol": process.env.GOOGLE_DRIVE_FOLDER_CAT_QOL,
      "cancer-qol": process.env.GOOGLE_DRIVE_FOLDER_CANCER_QOL,
      "dog-ccdr": process.env.GOOGLE_DRIVE_FOLDER_DOG_CCDR,
      "dog-cades": process.env.GOOGLE_DRIVE_FOLDER_DOG_CADES,
    },
  };
  const missing = [];
  if (!config.serviceAccountEmail) missing.push("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  if (!config.privateKey) missing.push("GOOGLE_PRIVATE_KEY");
  if (!config.sheetId) missing.push("GOOGLE_SHEET_ID");
  if (!config.defaultFolderId && !Object.values(config.folders).some(Boolean)) {
    missing.push("GOOGLE_DRIVE_FOLDER_ID or assessment-specific folder IDs");
  }
  return { ...config, missing, ready: missing.length === 0 };
}

function getFolderId(config, assessmentId) {
  return config.folders[assessmentId] || config.defaultFolderId;
}

async function getAccessToken(config) {
  const now = Math.floor(Date.now() / 1000);
  const jwt = signJwt(
    { alg: "RS256", typ: "JWT" },
    {
      iss: config.serviceAccountEmail,
      scope: [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ].join(" "),
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    },
    config.privateKey
  );

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error_description || result.error || "Google auth failed");
  }
  return result.access_token;
}

function signJwt(header, payload, privateKey) {
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(
    JSON.stringify(payload)
  )}`;
  const signature = crypto.createSign("RSA-SHA256").update(unsigned).sign(privateKey);
  return `${unsigned}.${base64url(signature)}`;
}

function base64url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function ensureSheet(accessToken, sheetId, sheetName) {
  const metadataResponse = await googleFetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties.title`,
    accessToken
  );
  const metadata = await metadataResponse.json();
  const hasSheet = metadata.sheets?.some((sheet) => sheet.properties?.title === sheetName);

  if (!hasSheet) {
    await googleFetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
      accessToken,
      {
        method: "POST",
        body: JSON.stringify({
          requests: [{ addSheet: { properties: { title: sheetName } } }],
        }),
      }
    );
  }

  const headerResponse = await googleFetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      sheetName
    )}!1:1`,
    accessToken
  );
  const headerResult = await headerResponse.json();
  if (!headerResult.values?.length) {
    await googleFetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
        sheetName
      )}!A1:T1?valueInputOption=USER_ENTERED`,
      accessToken,
      {
        method: "PUT",
        body: JSON.stringify({ values: [SHEET_HEADERS] }),
      }
    );
  }
}

async function appendSheetRow({ accessToken, sheetId, sheetName, row }) {
  await googleFetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      sheetName
    )}!A:T:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    accessToken,
    {
      method: "POST",
      body: JSON.stringify({ values: [row] }),
    }
  );
}

async function createPdfFile({ accessToken, folderId, fileBaseName, html, keepSourceDoc }) {
  const doc = await createDriveFile({
    accessToken,
    metadata: {
      name: `${fileBaseName} - source`,
      parents: [folderId],
      mimeType: "application/vnd.google-apps.document",
    },
    media: Buffer.from(html, "utf8"),
    mediaType: "text/html; charset=utf-8",
    fields: "id,name",
  });

  const exportResponse = await googleFetch(
    `https://www.googleapis.com/drive/v3/files/${doc.id}/export?mimeType=application/pdf`,
    accessToken
  );
  const pdfBytes = Buffer.from(await exportResponse.arrayBuffer());

  const pdf = await createDriveFile({
    accessToken,
    metadata: {
      name: `${fileBaseName}.pdf`,
      parents: [folderId],
      mimeType: "application/pdf",
    },
    media: pdfBytes,
    mediaType: "application/pdf",
    fields: "id,name,webViewLink",
  });

  if (!keepSourceDoc) {
    await googleFetch(`https://www.googleapis.com/drive/v3/files/${doc.id}`, accessToken, {
      method: "DELETE",
    });
  }

  return pdf;
}

async function createDriveFile({ accessToken, metadata, media, mediaType, fields }) {
  const boundary = `codex-${crypto.randomBytes(12).toString("hex")}`;
  const body = Buffer.concat([
    Buffer.from(
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(
        metadata
      )}\r\n--${boundary}\r\nContent-Type: ${mediaType}\r\n\r\n`,
      "utf8"
    ),
    media,
    Buffer.from(`\r\n--${boundary}--`, "utf8"),
  ]);

  const response = await googleFetch(
    `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=${encodeURIComponent(
      fields
    )}`,
    accessToken,
    {
      method: "POST",
      headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
      body,
    }
  );
  return response.json();
}

async function googleFetch(url, accessToken, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google API error ${response.status}: ${text.slice(0, 500)}`);
  }

  return response;
}

function buildSheetRow(record, firebaseRecordId, pdf) {
  return [
    new Date().toISOString(),
    firebaseRecordId,
    record.assessmentDate || "",
    record.assessmentId || "",
    record.assessmentTitle || "",
    record.petNameOrCode || "",
    record.patientRecordNumber || "",
    record.patientDigits || "",
    record.isExternalUser ? "yes" : "no",
    record.totalScore ?? "",
    record.maxScore ?? "",
    record.qualityPercent ?? "",
    record.completedItems ?? "",
    record.totalItems ?? "",
    record.overallScore ?? "",
    record.interpretation || "",
    formatCategoryScores(record.categoryScores),
    pdf.name || "",
    pdf.webViewLink || "",
    record.notes || "",
  ];
}

function buildFileBaseName(record) {
  const petName = sanitizeFilePart(record.petNameOrCode || "未命名動物");
  const patient = sanitizeFilePart(
    record.patientRecordNumber || (record.isExternalUser ? "非四院" : "無病歷號")
  );
  const date = sanitizeFilePart(record.assessmentDate || new Date().toISOString().slice(0, 10));
  const score = `${record.totalScore || 0}-${record.maxScore || 0}`;
  const assessment = sanitizeFilePart(record.assessmentShortTitle || record.assessmentId);
  return `${date}_${assessment}_${petName}_${patient}_${score}分`;
}

function sanitizeFilePart(value) {
  return String(value || "")
    .replace(/[\\/:*?"<>|#%{}[\]~&]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function renderRecordHtml(record, firebaseRecordId) {
  const rows = record.answers
    .map(
      (answer) => `
        <tr>
          <td>${answer.itemNumber}</td>
          <td>${escapeHtml(answer.category)}</td>
          <td>${escapeHtml(answer.question)}</td>
          <td>${answer.score ?? ""}</td>
          <td>${answer.weight || 1}</td>
          <td>${answer.weightedScore ?? ""}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, "Noto Sans TC", sans-serif; color: #17211f; line-height: 1.55; }
          h1 { font-size: 22px; margin: 0 0 8px; }
          h2 { font-size: 16px; margin: 22px 0 8px; color: #05665d; }
          .meta { display: grid; grid-template-columns: 140px 1fr; gap: 4px 10px; margin-top: 12px; }
          .label { color: #5d6c67; font-weight: 700; }
          table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 11px; }
          th, td { border: 1px solid #d6e2dd; padding: 6px; vertical-align: top; }
          th { background: #f1f7f4; text-align: left; }
          .score { font-size: 18px; font-weight: 800; color: #05665d; }
          .note { white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(record.assessmentTitle)}</h1>
        <div class="meta">
          <div class="label">Firebase ID</div><div>${escapeHtml(firebaseRecordId)}</div>
          <div class="label">填寫日期</div><div>${escapeHtml(record.assessmentDate || "")}</div>
          <div class="label">寵物姓名</div><div>${escapeHtml(record.petNameOrCode || "")}</div>
          <div class="label">病歷號碼</div><div>${escapeHtml(record.patientRecordNumber || (record.isExternalUser ? "非四院共用病歷病例" : ""))}</div>
          <div class="label">總分</div><div class="score">${record.totalScore} / ${record.maxScore}</div>
          <div class="label">指標</div><div>${record.qualityPercent}%</div>
          <div class="label">解讀</div><div>${escapeHtml(record.interpretation || "")}</div>
        </div>
        <h2>分類小計</h2>
        <p>${escapeHtml(formatCategoryScores(record.categoryScores))}</p>
        <h2>逐題紀錄</h2>
        <table>
          <thead>
            <tr><th>#</th><th>分類</th><th>題目</th><th>原始分</th><th>權重</th><th>計分</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <h2>備註</h2>
        <p class="note">${escapeHtml(record.notes || "")}</p>
        <p>提醒：此結果僅供追蹤與獸醫討論，不取代診斷。</p>
      </body>
    </html>`;
}

function formatCategoryScores(categories = []) {
  return categories
    .map((category) => `${category.name}: ${category.total}/${category.max}`)
    .join("; ");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

const ASSESSMENT_FOLDER_NAMES = {
  "dog-fetch": "FETCH",
  "dog-hrql": "Dog HRQL",
  "cat-qol": "Cat QOL",
  "cancer-qol": "Cancer HRQoL",
  "dog-ccdr": "CCDR",
  "dog-cades": "CADES",
};

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    verifySecret_(payload.secret || "");

    const record = payload.record;
    if (!record || !record.assessmentId || !Array.isArray(record.answers)) {
      throw new Error("Invalid record payload");
    }

    const config = getConfig_(payload.config || {});
    const folder = getTargetFolder_(config, record.assessmentId);
    const fileBaseName = buildFileBaseName_(record);
    const pdf = createPdf_(folder, fileBaseName, renderRecordHtml_(record, payload.firebaseRecordId || ""));

    const sheet = getSheet_(config.sheetId, config.sheetName);
    const row = buildSheetRow_(record, payload.firebaseRecordId || "", pdf);
    sheet.appendRow(row);

    return json_({
      ok: true,
      pdfFileId: pdf.getId(),
      pdfFileName: pdf.getName(),
      pdfFileUrl: pdf.getUrl(),
      sheetName: sheet.getName(),
      rowNumber: sheet.getLastRow(),
    });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: error.message || String(error) });
  }
}

function doGet() {
  return json_({ ok: true, service: "pet-qol-export", time: new Date().toISOString() });
}

function verifySecret_(secret) {
  const expected = PropertiesService.getScriptProperties().getProperty("EXPORT_SECRET");
  if (expected && secret !== expected) {
    throw new Error("Invalid export secret");
  }
}

function getConfig_(requestConfig) {
  const props = PropertiesService.getScriptProperties();
  const config = {
    sheetId: requestConfig.sheetId || props.getProperty("SHEET_ID"),
    sheetName: requestConfig.sheetName || props.getProperty("SHEET_NAME") || "Records",
    defaultFolderId: requestConfig.defaultFolderId || props.getProperty("DRIVE_FOLDER_ID"),
    folders: {
      "dog-fetch": requestConfig.folders?.["dog-fetch"] || props.getProperty("DRIVE_FOLDER_DOG_FETCH"),
      "dog-hrql": requestConfig.folders?.["dog-hrql"] || props.getProperty("DRIVE_FOLDER_DOG_HRQL"),
      "cat-qol": requestConfig.folders?.["cat-qol"] || props.getProperty("DRIVE_FOLDER_CAT_QOL"),
      "cancer-qol":
        requestConfig.folders?.["cancer-qol"] || props.getProperty("DRIVE_FOLDER_CANCER_QOL"),
      "dog-ccdr": requestConfig.folders?.["dog-ccdr"] || props.getProperty("DRIVE_FOLDER_DOG_CCDR"),
      "dog-cades": requestConfig.folders?.["dog-cades"] || props.getProperty("DRIVE_FOLDER_DOG_CADES"),
    },
  };

  if (!config.sheetId) throw new Error("Missing SHEET_ID or GOOGLE_SHEET_ID");
  if (!config.defaultFolderId && !Object.values(config.folders).some(Boolean)) {
    throw new Error("Missing DRIVE_FOLDER_ID or assessment-specific folder ID");
  }

  return config;
}

function getTargetFolder_(config, assessmentId) {
  const assessmentFolderId = config.folders[assessmentId];
  if (assessmentFolderId) return DriveApp.getFolderById(assessmentFolderId);

  const parentFolder = DriveApp.getFolderById(config.defaultFolderId);
  const folderName = ASSESSMENT_FOLDER_NAMES[assessmentId];
  if (!folderName) return parentFolder;

  const folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) return folders.next();

  return parentFolder.createFolder(folderName);
}

function getSheet_(sheetId, sheetName) {
  const spreadsheet = SpreadsheetApp.openById(sheetId);
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function createPdf_(folder, fileBaseName, html) {
  const pdfBlob = Utilities.newBlob(html, "text/html", `${fileBaseName}.html`).getAs(
    MimeType.PDF
  );
  pdfBlob.setName(`${fileBaseName}.pdf`);
  return folder.createFile(pdfBlob);
}

function buildSheetRow_(record, firebaseRecordId, pdfFile) {
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
    formatCategoryScores_(record.categoryScores),
    pdfFile.getName(),
    pdfFile.getUrl(),
    record.notes || "",
  ];
}

function buildFileBaseName_(record) {
  const petName = sanitizeFilePart_(record.petNameOrCode || "未命名動物");
  const patient = sanitizeFilePart_(
    record.patientRecordNumber || (record.isExternalUser ? "非四院" : "無病歷號")
  );
  const date = sanitizeFilePart_(record.assessmentDate || new Date().toISOString().slice(0, 10));
  const score = `${record.totalScore || 0}-${record.maxScore || 0}`;
  const assessment = sanitizeFilePart_(record.assessmentShortTitle || record.assessmentId);
  return `${date}_${assessment}_${petName}_${patient}_${score}分`;
}

function renderRecordHtml_(record, firebaseRecordId) {
  const rows = (record.answers || [])
    .map(
      (answer) => `
        <tr>
          <td>${answer.itemNumber}</td>
          <td>${escapeHtml_(answer.category)}</td>
          <td>${escapeHtml_(answer.question)}</td>
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
        <h1>${escapeHtml_(record.assessmentTitle)}</h1>
        <div class="meta">
          <div class="label">Firebase ID</div><div>${escapeHtml_(firebaseRecordId)}</div>
          <div class="label">填寫日期</div><div>${escapeHtml_(record.assessmentDate || "")}</div>
          <div class="label">寵物姓名</div><div>${escapeHtml_(record.petNameOrCode || "")}</div>
          <div class="label">病歷號碼</div><div>${escapeHtml_(record.patientRecordNumber || (record.isExternalUser ? "非四院共用病歷病例" : ""))}</div>
          <div class="label">總分</div><div class="score">${record.totalScore} / ${record.maxScore}</div>
          <div class="label">指標</div><div>${record.qualityPercent}%</div>
          <div class="label">解讀</div><div>${escapeHtml_(record.interpretation || "")}</div>
        </div>
        <h2>分類小計</h2>
        <p>${escapeHtml_(formatCategoryScores_(record.categoryScores))}</p>
        <h2>逐題紀錄</h2>
        <table>
          <thead>
            <tr><th>#</th><th>分類</th><th>題目</th><th>原始分</th><th>權重</th><th>計分</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <h2>備註</h2>
        <p class="note">${escapeHtml_(record.notes || "")}</p>
        <p>提醒：此結果僅供追蹤與獸醫討論，不取代診斷。</p>
      </body>
    </html>`;
}

function formatCategoryScores_(categories) {
  return (categories || []).map((category) => `${category.name}: ${category.total}/${category.max}`).join("; ");
}

function sanitizeFilePart_(value) {
  return String(value || "")
    .replace(/[\\/:*?"<>|#%{}[\]~&]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

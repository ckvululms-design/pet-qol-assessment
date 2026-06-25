module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const webAppUrl = process.env.GOOGLE_APPS_SCRIPT_WEBAPP_URL;
    if (!webAppUrl) {
      res.status(503).json({
        error: "Google Apps Script export is not configured: GOOGLE_APPS_SCRIPT_WEBAPP_URL",
      });
      return;
    }

    const payload = await readJsonBody(req);
    const record = payload?.record;
    if (!record?.assessmentId || !Array.isArray(record.answers)) {
      res.status(400).json({ error: "Invalid record payload" });
      return;
    }

    const appScriptResponse = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        record,
        firebaseRecordId: payload.firebaseRecordId || "",
        secret: process.env.GOOGLE_APPS_SCRIPT_SECRET || "",
        config: buildExportConfig(),
      }),
    });

    const text = await appScriptResponse.text();
    const result = parseJsonResponse(text);

    if (!appScriptResponse.ok || result.ok === false) {
      res.status(502).json({
        error:
          result.error ||
          `Google Apps Script export failed with status ${appScriptResponse.status}`,
      });
      return;
    }

    res.status(200).json({
      ok: true,
      pdfFileId: result.pdfFileId || "",
      pdfFileName: result.pdfFileName || "",
      pdfFileUrl: result.pdfFileUrl || "",
      sheetName: result.sheetName || "",
      rowNumber: result.rowNumber || null,
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

function buildExportConfig() {
  return {
    sheetId: process.env.GOOGLE_SHEET_ID || "",
    sheetName: process.env.GOOGLE_SHEET_NAME || "Records",
    defaultFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID || "",
    folders: {
      "dog-fetch": process.env.GOOGLE_DRIVE_FOLDER_DOG_FETCH || "",
      "dog-hrql": process.env.GOOGLE_DRIVE_FOLDER_DOG_HRQL || "",
      "cat-qol": process.env.GOOGLE_DRIVE_FOLDER_CAT_QOL || "",
      "cancer-qol": process.env.GOOGLE_DRIVE_FOLDER_CANCER_QOL || "",
      "dog-ccdr": process.env.GOOGLE_DRIVE_FOLDER_DOG_CCDR || "",
      "dog-cades": process.env.GOOGLE_DRIVE_FOLDER_DOG_CADES || "",
    },
  };
}

function parseJsonResponse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return { ok: false, error: text.slice(0, 500) || "Empty Apps Script response" };
  }
}

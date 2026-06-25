# Google Apps Script 匯出設定

這份 Apps Script 會用你的 Google 帳號執行，所以 Google Sheet 列與 PDF 檔案會由你的 Drive 建立，不會使用 service account 的 Drive quota。

## 建立 Apps Script

1. 開啟 https://script.google.com/
2. 建立新專案，名稱可用 `Pet QOL Export`
3. 將本資料夾的 `Code.gs` 全部貼到 Apps Script 的 `Code.gs`
4. 按儲存

## 設定 Script Properties

在 Apps Script 左側點 Project Settings，找到 Script properties，新增：

- `EXPORT_SECRET`：自訂一串密碼，例如 32 字元以上亂數。Vercel 的 `GOOGLE_APPS_SCRIPT_SECRET` 要填同一串。

如果不想讓 Vercel 傳 Sheet/Drive 設定，也可以在這裡加：

- `SHEET_ID`
- `SHEET_NAME`
- `DRIVE_FOLDER_ID`

目前 Vercel 已會傳 `GOOGLE_SHEET_ID` 和 `GOOGLE_DRIVE_FOLDER_ID`，所以通常只需要設定 `EXPORT_SECRET`。

## 部署 Web App

1. 右上角 Deploy
2. New deployment
3. 類型選 Web app
4. Execute as 選 `Me`
5. Who has access 選 `Anyone`
6. 按 Deploy
7. 第一次會要求授權，請用你的 Google 帳號允許存取 Sheet 和 Drive
8. 複製 Web app URL

## Vercel 環境變數

新增或更新：

- `GOOGLE_APPS_SCRIPT_WEBAPP_URL`：貼 Web app URL
- `GOOGLE_APPS_SCRIPT_SECRET`：貼與 `EXPORT_SECRET` 相同的字串

保留既有：

- `GOOGLE_SHEET_ID`
- `GOOGLE_DRIVE_FOLDER_ID`

設定後請重新部署 Vercel。

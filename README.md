# 犬貓生活品質評估

公開使用的犬貓生活品質與認知功能評估工具，整合六份量表：

- 狗心臟病健康相關生活品質 (FETCH) 評估
- 狗健康相關生活品質 (HRQL) 評估
- 貓咪高齡與安寧照護 (QOL) 評估
- 癌症動物健康相關生活品質 (HRQoL) 評估
- 犬認知功能障礙評分表 (CCDR)
- 犬認知退化分期評分表 (CADES)

## 網址架構建議

本專案採用「一個網站入口，多個獨立路由」：

- `/dog-fetch`
- `/dog-hrql`
- `/cat-qol`
- `/cancer-qol`
- `/dog-ccdr`
- `/dog-cades`

優點是使用者只要記一個網站，Vercel 也只需要維護一個專案；同時每份量表仍能單獨分享網址。缺點是四份量表共用同一套版面，若未來要做成完全不同品牌或不同單位管理，拆成四個網站會更獨立。

四個完全不相關網址的優點是每份量表可以各自調整視覺、權限、SEO 與版本；缺點是維護成本高，使用者也比較容易找不到其他量表。

## 功能

- 手機優先的大字體與大分數按鈕
- 自動計算總分、生活品質指標、完成度與分類小計
- 支援反向題提示
- 支援備註、寵物姓名或代號、填寫日期
- 支援四院共用病歷號碼後五碼輸入，資料內自動轉成 `PT0xxxxx`
- 支援非四院共用病歷病例勾選，公開網址外流時仍可供一般家長使用
- 支援列印 / 儲存 PDF
- 支援複製摘要與複製目前量表連結
- 支援使用者主動上傳完整紀錄到 Firebase Firestore 的 `qolRecords`
- 可透過 Vercel API 匯出到 Google Sheet，並在 Google Drive 建立每次填寫的 PDF
- 未按下「上傳紀錄」前，資料只保存在使用者目前裝置的瀏覽器

## Firebase

本專案使用 Firebase 專案 `gaze-cardiology-4e707`：

- Firebase Web App：`凝視心臟科候補系統`
- Firestore database：`(default)`，位置 `asia-east1`，Native mode
- Collection：`qolRecords`
- Authentication：使用匿名登入寫入紀錄

建議在既有 Firestore rules 中額外加入 `qolRecords` 的 create-only 規則，並保留原本候補系統規則：

```txt
match /qolRecords/{recordId} {
  allow create: if request.auth != null
    && request.resource.data.anonymousUid == request.auth.uid
    && request.resource.data.schemaVersion == 1
    && request.resource.data.assessmentId is string
    && request.resource.data.answers is list
    && request.resource.data.answers.size() <= 40;
  allow read, update, delete: if false;
}
```

## Google Sheet / Drive 匯出

`api/export-record.js` 會在 Vercel 上作為後端 API 使用。家長按下「上傳紀錄」後，前端先寫入 Firebase，再呼叫 `/api/export-record`，由 Vercel 轉送到 Google Apps Script Web App：

- 追加一列到 Google Sheet
- 在 Google Drive 資料夾建立 PDF
- 檔名包含日期、問卷、動物名、病歷號碼或非四院標記，以及總分摘要

Apps Script 程式碼在 `google-apps-script/Code.gs`。請在 Google Apps Script 新專案貼上該檔內容，部署成 Web App，設定：

- Execute as：`Me`
- Who has access：`Anyone`

需要在 Vercel 設定以下環境變數：

- `GOOGLE_APPS_SCRIPT_WEBAPP_URL`
- `GOOGLE_APPS_SCRIPT_SECRET`，建議設定，也要在 Apps Script Script Properties 用同樣值設定 `EXPORT_SECRET`
- `GOOGLE_SHEET_ID`
- `GOOGLE_SHEET_NAME`，可省略，預設 `Records`
- `GOOGLE_DRIVE_FOLDER_ID`

若未來要依問卷分資料夾，可再設定：

- `GOOGLE_DRIVE_FOLDER_DOG_FETCH`
- `GOOGLE_DRIVE_FOLDER_DOG_HRQL`
- `GOOGLE_DRIVE_FOLDER_CAT_QOL`
- `GOOGLE_DRIVE_FOLDER_CANCER_QOL`
- `GOOGLE_DRIVE_FOLDER_DOG_CCDR`
- `GOOGLE_DRIVE_FOLDER_DOG_CADES`

舊的 service account 環境變數已不再需要用於 Sheet / Drive 匯出。

## Vercel 部署

這個專案以前端靜態頁為主，並包含一個 Vercel Serverless API (`/api/export-record`) 供 Google Sheet / Drive 匯出使用。不需要 build command。

1. 將此 repo 推到 GitHub。
2. 在 Vercel 匯入 GitHub repo。
3. Framework Preset 選 `Other` 或保持自動偵測。
4. Build Command 留空。
5. Output Directory 留空或使用專案根目錄。

`vercel.json` 已設定六個路由都回到 `index.html`，使用者可直接打開任一量表網址。

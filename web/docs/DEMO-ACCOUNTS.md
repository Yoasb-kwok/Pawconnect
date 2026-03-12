# Demo 帳號一覽

用於無後端時測試登入及「我的資料」等頁面。密碼全部為 **demo123**。

| 身份         | Email             | 密碼    | 說明 |
|--------------|-------------------|--------|------|
| 一般用戶     | user@demo.com     | demo123 | 一般用戶，可發文、配對、寵物等；**已預設 3 則貼文 + 2 隻寵物（阿黃、咪咪）** |
| 管理員       | admin@demo.com    | demo123 | 可進入管理員面板 |
| 商戶         | merchant@demo.com | demo123 | 可進入商家後台 |
| 寵物工作者   | sitter@demo.com   | demo123 | 與一般用戶共通使用 app，身份顯示為寵物保姆；**「我的資料」會顯示與代放服務頁相同的服務檔案（認證、評分、評價、收費、負責項目、證書、頭像）** |

---

- 登入邏輯：`contexts/AuthContext.tsx` 會先檢查 `lib/demo-auth.ts` 的 demo 帳號，符合則不 call API，直接寫入 localStorage 並登入。
- 登入頁下方有 Demo 帳號提示框，方便測試時複製使用。
- Demo 貼文與寵物：`lib/forum-demo-data.ts` 內有「小明 陳」的 3 則貼文；`lib/demo-auth.ts` 的 `getDemoPets('demo-user-1')` 回傳 2 隻寵物（阿黃、咪咪）。profile 頁若偵測到 demo 用戶會用上述資料，不 call 後端。

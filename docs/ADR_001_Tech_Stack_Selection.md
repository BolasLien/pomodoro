# ADR 001：Vue3 遷移技術選型

## 1. 狀態
- 狀態：Accepted
- 日期：2026-02-10
- 關聯文件：`PRD_Vue3_Tailwind4_Migration.md`

## 2. 背景
現有專案使用 Vue 2 + Vue CLI + Vuex + BootstrapVue。  
本次重構目標為升級到 Vue 3，並建立更輕量、可維護的樣式與圖示策略，同時維持既有功能等價。

## 3. 決策

### 3.1 核心框架與建置
- 採用 `Vue 3`
- 採用 `Vite` 作為建置工具
- 路由採用 `vue-router@4`

### 3.2 狀態管理
- 採用 `Pinia`
- 採用 Pinia persisted state plugin 做本地持久化

### 3.3 樣式系統
- 採用 `Tailwind CSS 4`
- 建立專案級 design tokens（顏色、間距、字級、圓角、陰影）
- 移除 `BootstrapVue` 與其依賴

### 3.4 Icon 策略
- 主方案：`lucide-vue-next`
- 原則：按需引入，不做全量註冊
- 保留 PWA 必要圖檔（favicon、manifest icons）
- 以 icon 元件取代可替換之 PNG/UI 操作圖示

### 3.5 其他套件策略
- 拖曳：`vuedraggable@next`（Vue 3 版本）
- 時間輸入：優先改為原生輸入或輕量 Vue 3 相容元件（避免沿用舊版 timepicker）
- 測試：`Vitest`（單元）+ `Playwright`（E2E，最小流程）

## 4. 選型比較與理由

### 4.1 Vite（選）vs Vue CLI（不選）
- 選 Vite 原因：
- 啟動與熱更新速度更快
- Vue 3 生態整合更自然
- 後續維護與社群趨勢更穩定
- 不選 Vue CLI 原因：
- 專案生態逐步轉向 Vite
- 對新工具鏈擴充性較弱

### 4.2 Pinia（選）vs Vuex（不選）
- 選 Pinia 原因：
- Vue 3 官方建議方案
- API 較簡潔，型別支援與可測試性更好
- store 模組化成本較低
- 不選 Vuex 原因：
- 在 Vue 3 新專案中不是優先方案

### 4.3 Tailwind 4（選）vs BootstrapVue（不選）
- 選 Tailwind 4 原因：
- 設計一致性可透過 token 管理
- 元件樣式客製彈性高
- 可避免引入大型 UI 框架冗餘樣式
- 不選 BootstrapVue 原因：
- 與 Vue 3 相容性與長期維護策略不理想

### 4.4 lucide-vue-next（選）vs Font Awesome（現況）/Iconify（備選）
- 選 lucide-vue-next 原因：
- 套件輕量、API 簡單
- 按需載入容易，對 bundle 友善
- 視覺風格一致
- Iconify 作為備選：
- 若未來需要大量品牌 icon 或特殊圖示集合，再引入

## 5. 影響範圍
- 需要重建前端入口與建置設定（Vite）
- 全部頁面要從 Bootstrap 類名遷移為 Tailwind class
- store 與路由初始化流程需改寫
- 圖示元件需全面替換
- 測試與 CI 指令需同步更新

## 6. 風險與緩解
- 風險：一次性替換範圍過大  
  緩解：採分階段遷移（先骨架再頁面）

- 風險：UI 在 Tailwind 化過程產生回歸  
  緩解：每頁建立視覺檢查清單與快照

- 風險：舊持久化資料無法讀取  
  緩解：實作 store migration（舊 key → 新 schema）

- 風險：圖示替換造成語意不清  
  緩解：建立 icon mapping 表並設計審查一次

## 7. 實施準則
- 先建新骨架分支，不在舊架構上硬改
- 優先確保功能等價，再做 UI 精修
- 每完成一個 phase 就執行一次最小回歸測試
- 保留回滾點（phase-based tags）

## 8. 驗收條件
1. Vue 3 + Vite + Pinia + Router 4 + Tailwind 4 可正常 build/run。
2. Home/List/Finish/Settings 核心功能等價。
3. icon 替換完成且不影響操作理解。
4. 產出包體與現行版本相比不增（目標持平或下降）。

## 9. 後續待辦
1. 建立 `ADR_002_Icon_Mapping.md`（舊 icon 到新 icon 對照表）
2. 建立 `MIGRATION_TASKS.md`（phase 任務分解與工時）
3. 更新 CI/CD（Node LTS、build 指令、部署腳本）

# PRD：Pomodoro 前端重構遷移（Vue 3 + Tailwind CSS 4）

## 1. 文件資訊
- 專案：`pomodoro`
- 版本：`v1`
- 日期：`2026-02-10`
- 目標讀者：產品/前端工程師/測試

## 2. 背景與問題
目前專案基於 Vue 2 + Vue CLI + BootstrapVue，存在以下限制：
- 生態偏舊（Vue 2 維護成本較高）
- 樣式系統分散，設計一致性與擴充性有限
- 使用 PNG/icon 混合策略，包體與資產管理可再優化
- 狀態管理與組件結構可更現代化（Composition API、Pinia）

## 3. 目標（Goals）
- 將前端技術棧遷移至 Vue 3。
- 導入 Tailwind CSS 4 作為主要樣式管理方式。
- 以輕量 icon 庫取代可替換之 PNG/icon 資產，降低 bundle 與維護成本。
- 在不破壞既有核心功能的前提下完成遷移（任務、倒數、休息、完成、鈴聲、PWA）。

## 4. 非目標（Non-goals）
- 不改變產品核心流程與使用邏輯（先維持現有 UX）。
- 不在本次重構新增大型功能（如多人同步、雲端帳號、後端 API）。
- 不重做品牌視覺識別（僅建立可擴充樣式基礎）。

## 5. 使用者與主要情境
- 使用者：個人任務管理者
- 主要情境：
- 新增任務與時間，啟動番茄鐘
- 倒數進行中暫停/繼續/略過
- 任務完成後查看完成清單並重新加入
- 切換鈴聲並在任務結束時播放

## 6. 成功指標（Success Metrics）
- 功能等價：現有 4 個主頁核心行為一致（Home/List/Finish/Settings）。
- 技術升級完成：Vue 3 + Vite + Tailwind 4 + Pinia 上線。
- 前端資產優化：可替換 PNG/icon 至向量 icon（至少導覽與操作 icon 全替換）。
- 品質門檻：
- `lint` 無錯誤
- 主要流程 E2E/手動測試案例全通過
- 生產版可正常部署與 PWA 安裝

## 7. 功能範圍（In Scope）

### 7.1 架構升級
- Vue CLI → Vite
- Vue 2 Options API（保留可讀性）逐步轉 Vue 3（可混合 Composition API）
- Vuex → Pinia（含本地持久化）
- Vue Router 升級至 Vue Router 4

### 7.2 UI 與樣式
- BootstrapVue 移除
- Tailwind CSS 4 導入並建立設計 token（色彩、間距、字級、圓角、陰影）
- 公用元件（Button/Input/Table/Card/Badge）最小集合建立

### 7.3 Icon 策略
- 目標庫（建議）：`lucide-vue-next`（預設）  
- 備選：`@iconify/vue`（若需大量品牌或特殊 icon）
- 以元件式 icon 取代 UI 操作圖示與可替換 PNG 圖示
- 保留必要品牌/啟動畫面圖檔（favicon、PWA icon）

### 7.4 既有能力保留
- 倒數計時與休息切換邏輯
- 鈴聲選擇與播放
- 本地資料持久化
- PWA（manifest、service worker）

## 8. 需求細節（Requirements）

### 8.1 頁面需求
1. Home：
- 顯示目前任務、剩餘時間、進度
- 開始/暫停/繼續/略過操作一致
- 任務完成播放鈴聲，略過不播放

2. List：
- 新增任務（名稱 + mm:ss）
- 表單驗證（空值、00:00）
- 編輯/刪除/拖曳排序

3. Finish：
- 顯示已完成清單
- 支援「再一次」與刪除

4. Settings：
- 顯示可用鈴聲
- 點擊可選擇，並可預覽播放

### 8.2 資料需求
- Store schema 遷移後需與既有資料語意一致：
- `todos`
- `finishs`（可評估改名 `finished`，需帶 migration mapping）
- `timeleft` / `timepick` / `current` / `isBreak` / `status` / `alarm`
- 本地持久化需兼容舊 key（至少一次性轉換）

### 8.3 技術需求
- Node LTS（建議 Node 20）
- TypeScript：可選。若不導入，需保留 JSDoc 型別註解策略
- 測試：
- 單元測試（計時與 store 關鍵 mutation/action）
- 最小 E2E（首頁計時、清單 CRUD、設定鈴聲）

## 9. 遷移策略（Phased Plan）

## Phase 0：盤點與基線（1-2 天）
- 建立目前功能基線清單（按鈕、流程、狀態）
- 定義驗收案例（手動測試腳本）
- 建立性能基線（build size、首屏資產大小）

## Phase 1：新骨架建立（2-3 天）
- 新建 Vue 3 + Vite 專案骨架（同 repo 分支）
- Router/Pinia/Tailwind 4 基礎配置
- PWA 插件與 manifest 初版接入

## Phase 2：核心狀態與計時遷移（3-4 天）
- 遷移 store 結構與倒數邏輯
- 完成 Home + Timer 組件遷移
- 寫入基礎單元測試（計時、段落切換、略過/播放）

## Phase 3：頁面與互動遷移（3-5 天）
- List / Finish / Settings 全部遷移
- 拖曳、時間選擇、鈴聲播放校正
- icon 全面替換（FontAwesome/PNG → 目標 icon 庫）

## Phase 4：樣式與一致性收斂（2-3 天）
- Tailwind 元件化與設計 token 整理
- 響應式檢查（桌機 + 手機）
- 無障礙與互動狀態（focus/disabled/aria）修正

## Phase 5：驗收與發版（1-2 天）
- 回歸測試
- build 分析與容量比對
- 部署流程調整與文件更新

## 10. 風險與對策
- 風險：Vuex → Pinia 語意差異導致計時邏輯回歸問題  
  對策：先抽離純邏輯函式並加單元測試，最後再掛進 store

- 風險：Tailwind 4 與既有樣式混用造成 UI 漂移  
  對策：先建立最小設計 token，頁面分批替換，逐頁比對

- 風險：圖示替換後可視一致性下降  
  對策：先制定 icon mapping 表（舊 icon → 新 icon）再批次替換

- 風險：PWA 行為與快取策略改變  
  對策：先以保守配置上線，避免激進 precache；上線前做離線測試

## 11. 驗收標準（Acceptance Criteria）
1. 主要用例全部可執行：
- 新增任務、開始倒數、暫停/繼續、完成/略過、完成清單回推、鈴聲切換
2. Vue 3 + Tailwind 4 + Pinia + Router 4 全部落地。
3. icon 替換完成且 UI 無功能性退化。
4. 生產建置成功並可部署，PWA 可安裝。
5. 與舊版相比 bundle 大小不增加（目標至少持平，理想下降）。

## 12. 技術決策建議（初版）
- Framework：Vue 3（`<script setup>` 可逐步導入）
- Build Tool：Vite
- State：Pinia + persistedstate plugin
- CSS：Tailwind CSS 4
- Icon：`lucide-vue-next`（優先，按需引入）
- 拖曳：`vuedraggable@next`（Vue 3 版）
- 時間選擇器：改用 Vue 3 相容套件或自製 `mm:ss` 輸入元件

## 13. 交付物（Deliverables）
- 遷移 PRD（本文件）
- 技術選型決策記錄（ADR）
- 分階段 task 清單（Issue/看板）
- 測試案例文件
- 更新後的 README / SPEC / 部署說明

## 14. 建議下一步
1. 先確認此 PRD 範圍（尤其 Non-goals 與 Success Metrics）。
2. 我可接著幫你產出「技術選型 ADR + icon mapping 表」。
3. 再下一步我可以拆成可直接開工的 Sprint 任務清單（含預估工時）。

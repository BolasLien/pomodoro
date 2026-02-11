# Migration Checklist（個人開發精簡版）

日期：2026-02-10  
目標：在不破壞既有功能下，完成 Vue 3 + Tailwind 4 + icon 輕量化遷移。

## 0) 範圍（只做這些）
- [ ] Vue 2 / Vue CLI 升級為 Vue 3 / Vite
- [ ] Vuex 改為 Pinia（含本地持久化）
- [ ] BootstrapVue 改為 Tailwind CSS 4
- [ ] 既有 UI 操作圖示改為輕量 icon 庫（預設 `lucide-vue-next`）
- [ ] 保留功能等價：Home / List / Finish / Settings / PWA

## 1) Phase 1：新骨架
- [ ] 建立 Vue 3 + Vite 專案骨架
- [ ] 導入 Vue Router 4、Pinia、Tailwind 4
- [ ] 建立共用樣式 token（色彩、字級、間距）
- [ ] 建立最小 layout（Header / Content / Footer）
- [ ] 可本機啟動、可 build

完成定義：
- [ ] `npm run dev` 可啟動
- [ ] `npm run build` 成功

## 2) Phase 2：核心邏輯（倒數 + Store）
- [ ] 遷移 todos/finishs/timeleft/current/isBreak/status/alarm 狀態
- [ ] 遷移開始/暫停/繼續/略過/完成流程
- [ ] 保留任務與休息切換邏輯
- [ ] 保留本地持久化（含必要資料轉換）

完成定義：
- [ ] 手動測試：倒數流程完整可跑
- [ ] 單元測試：核心計時邏輯通過

## 3) Phase 3：頁面遷移 + Icon 替換
- [ ] Home 頁遷移完成（含 Timer）
- [ ] List 頁遷移完成（新增/編輯/刪除/拖曳）
- [ ] Finish 頁遷移完成（再一次/刪除）
- [ ] Settings 頁遷移完成（選鈴聲/預覽播放）
- [ ] 導覽與操作 icon 全改為 `lucide-vue-next`
- [ ] 保留必要 PWA 圖檔（favicon/manifest icons）

完成定義：
- [ ] 視覺與互動無明顯功能退化
- [ ] 所有主要按鈕動作可用

## 4) Phase 4：驗收與發版
- [ ] 設定 E2E 測試（建議 Playwright）
- [ ] 完成最小 E2E 案例：
- [ ] 新增任務並開始倒數
- [ ] 暫停/繼續
- [ ] 略過不響鈴、自然完成會響鈴（可 mock audio）
- [ ] 完成項目出現在 Finish，且可再加入
- [ ] Settings 可切換鈴聲
- [ ] 路由頁面可正常切換（Home/List/Finish/Settings）
- [ ] 生產建置與部署流程可跑

完成定義（最終驗收標準）：
- [ ] `lint` 通過
- [ ] `unit test` 通過
- [ ] `E2E test` 全通過（必要條件）
- [ ] `build` 成功
- [ ] 手動 smoke test 通過

## 5) 回滾點（每階段完成後）
- [ ] `git tag migration-phase-1`
- [ ] `git tag migration-phase-2`
- [ ] `git tag migration-phase-3`
- [ ] `git tag migration-phase-4`

## 6) 現在就能做的第一步
- [ ] 開新分支：`feat/vue3-tailwind4-migration`
- [ ] 建立 Vite 骨架並提交第一個 checkpoint

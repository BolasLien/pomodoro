# Pomodoro 專案規格文件

## 1. 專案定位
- 專案名稱：`pomodoro`
- 類型：Vue 2 單頁應用（SPA）番茄鐘任務管理工具
- 目標：讓使用者建立待辦清單並以番茄鐘節奏執行任務與休息循環
- 部署型態：GitHub Pages（`publicPath: './'`）
- 線上入口（README 記載）：`https://bolaslien.github.io/pomodoro/`

## 2. 技術棧與依賴

### 2.1 核心框架
- `vue@2.6.x`
- `vue-router@3.x`
- `vuex@3.x`
- `vuex-persistedstate`（本地持久化 Vuex state）

### 2.2 UI 與互動套件
- `bootstrap-vue` + `bootstrap`
- `@fortawesome/vue-fontawesome`
- `vuedraggable`（清單排序）
- `vue-ellipse-progress`（圓形進度視覺）
- `vue2-timepicker`（時間選擇）
- 字型：`noto-sans-tc`

### 2.3 PWA / 其他
- `@vue/cli-plugin-pwa`
- `register-service-worker`
- `vue-gtag`（Google Analytics，UA ID：`UA-168227875-1`）

## 3. 功能規格

### 3.1 Home（倒數執行頁）
- 顯示目前任務名稱與剩餘時間（分、秒）
- 顯示圓形進度條（依 `timeleft / fullTime` 計算百分比）
- 支援操作：
- `開始`：從待辦第一筆開始倒數
- `暫停`：停止計時，狀態改為暫停
- `繼續`：暫停後可恢復倒數
- `略過`：立即結束當前段落（任務或休息），不播放鈴聲
- 倒數歸零時：
- 自動結束該段
- 若非略過，播放所選鈴聲
- 若仍有待辦，會在任務與休息模式間切換並自動繼續下一段

### 3.2 List（待辦清單頁）
- 可新增待辦事項：
- 欄位：事項名稱（文字）、倒數時間（`mm:ss`）
- 驗證：
- 名稱不可空白
- 時間不可空、不可為 `00:00`
- 支援編輯模式切換：
- 進入編輯模式後可顯示每列的編輯/刪除按鈕
- 支援拖曳排序（`vuedraggable`）
- 單筆待辦可操作：
- 編輯名稱與時間
- 取消編輯（還原原值）
- 儲存編輯
- 刪除

### 3.3 Finish（已完成清單頁）
- 顯示已完成項目（名稱）
- 每筆可操作：
- `再一次`：回推至待辦清單
- `移除`：自完成清單刪除

### 3.4 Settings（鈴聲設定頁）
- 可選擇 4 種鈴聲檔案
- 支援預覽播放
- 點選列後設為目前鈴聲
- 目前鈴聲以勾選 icon 呈現

### 3.5 Not Found
- 任意未匹配路由顯示簡單 `404 Page Not Found`

## 4. 導覽與路由規格
- `/`：Home
- `/list`：List
- `/finish`：Finish
- `/settings`：Settings
- `*`：NotFound
- 每個路由切換後會更新 `document.title`
- App 底部固定導覽列提供四大主頁入口
- `router-view` 包裹於 `keep-alive`，頁面狀態可被快取

## 5. 狀態管理（Vuex）規格

### 5.1 State 欄位
- `todos: []`：待辦清單
- `finishs: []`：完成清單
- `timepick: 0`：當前任務時間設定
- `timeleft: 0`：剩餘秒數
- `alarm: 'alarm1.mp3'`：目前鈴聲檔名
- `current: ''`：當前任務名稱（或休息文案）
- `isBreak: false`：是否處於休息段
- `status: 0`：計時狀態（0 停止、1 播放、2 暫停）

### 5.2 關鍵流程 mutation
- `addTodo`：新增待辦（含名稱、可編輯副本、時間）
- `start`：
- 若 `isBreak=true`，進入「休息一下」
- 否則取出第一筆待辦作為當前任務並自待辦移除
- `countdown`：`timeleft--`
- `finish`：
- 任務段完成時加入 `finishs`（休息段不加入）
- 清空 `current`
- 若待辦仍有項目，切換 `isBreak` 並設定下一段 `timeleft`
- `again`：完成項目回到待辦
- `setStatus`：變更播放/暫停/停止

### 5.3 持久化
- 使用 `vuex-persistedstate`，重新整理頁面後保留清單與計時相關狀態

## 6. 倒數與休息規格
- 單位：秒
- 任務秒數：由待辦時間 `mm:ss` 計算
- 休息秒數：`VUE_APP_TIMELEFT_BREAK`
- 環境變數：
- `.env.development`
- `VUE_APP_TIMELEFT=5`
- `VUE_APP_TIMELEFT_BREAK=3`
- `.env.production`
- `VUE_APP_TIMELEFT=1500`
- `VUE_APP_TIMELEFT_BREAK=300`
- 實際程式中主要使用 `VUE_APP_TIMELEFT_BREAK` 與待辦項目時間，`VUE_APP_TIMELEFT` 目前未實際啟用

## 7. PWA 與資產規格
- 啟用 Service Worker（僅 `production` 註冊）
- 提供離線快取訊息與更新事件 log
- PWA Manifest 已定義：
- `name/short_name`：番茄鐘
- `display: fullscreen`
- `start_url/scope: './'`
- 多尺寸 icon（含 maskable）
- 鈴聲資產位於：`public/alarms/`
- `Alarm2.mp3`
- `Whistle1.mp3`
- `Whistle2.mp3`
- `alarm1.mp3`

## 8. 建置與部署規格
- NPM scripts：
- `npm run serve`：本機開發
- `npm run build`：正式建置
- `npm run lint`：程式檢查
- CI/CD（`.travis.yml`）：
- Node.js `11`
- 執行 `npm run build`
- 將 `dist` 部署至 GitHub Pages（`master` 觸發）

## 9. UI/UX 規格（目前實作）
- 主要語言：繁中介面
- 字體：Noto Sans TC
- 畫面區塊：
- Header（10vh）
- Content（78vh，可滾動）
- Footer 導覽（12vh，固定底部）
- 配色依狀態動態切換：
- 任務進行中偏紅
- 休息模式偏綠
- 停止狀態偏淺灰

## 10. 已知實作差異與限制
- `Settings` 列表中第一筆檔名為 `Alarm1.mp3`，但 `public/alarms/` 現有檔案為 `alarm1.mp3`（大小寫不一致，可能造成該鈴聲播放/選取異常）。
- `Home.finish(true,current)` 呼叫多傳參數，但 method 只使用第一參數，不影響執行但屬冗餘。
- 變數 `VUE_APP_TIMELEFT` 在目前邏輯中未被主流程使用（原碼保留註解）。
- 完成清單欄位僅顯示名稱，未顯示原始完成時長。

## 11. 驗收建議（Spec 對應）
- 可建立待辦並設定時間，且資料重整後仍存在
- 可開始/暫停/繼續/略過倒數且狀態正確切換
- 任務完成時移入完成清單；休息段不加入完成清單
- 完成清單可回推待辦與刪除
- 可切換鈴聲並在任務結束時播放
- 無網路下可載入已快取內容（PWA 基本能力）

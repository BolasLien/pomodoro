# 番茄鐘

由此進入https://bolaslien.github.io/pomodoro/

## 功能描述

- 支援 PWA
- 分成Home、Task、Finish、Setting頁面
- Home:在此頁進行待辦事項倒數
  - 可開始、暫停、繼續倒數
  - 可略過倒數，且略過倒數時不會響鈴
  - 顯示倒數剩餘分鐘與秒鐘
- Task:可新增待辦事項，並且待辦事項會列在此頁
  - 可自訂待辦事項時間
  - 可編輯、刪除待辦事項內容
  - 編輯模式時，可以拖動事項來決定倒數先後順序
- Finish:已完成的事項會列在此頁
  - 可再次加入代辦清單、刪除事項
- Setting:四種鈴聲選一種當響鈴

## 使用工具

- Vue 3
- Vite
- Pinia 和 Vue Router 4
- Tailwind CSS 4
- Playwright

## 開發指令

```bash
npm install
npm run dev
npm run build
npm run lint
```

## E2E 測試（Playwright）

1. 安裝相依套件

```bash
npm install
```

2. 安裝瀏覽器

```bash
npx playwright install
```

3. 執行 E2E

```bash
npm run test:e2e
```

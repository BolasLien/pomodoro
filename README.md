# 番茄鐘
由此進入https://bolaslien.github.io/pomodoro/

## 功能描述
* 支援 PWA
* 分成Home、Task、Finish、Setting頁面
* Home:在此頁進行待辦事項倒數
  * 可開始、暫停、繼續倒數
  * 可略過倒數，且略過倒數時不會響鈴
  * 顯示倒數剩餘分鐘與秒鐘
* Task:可新增待辦事項，並且待辦事項會列在此頁
  * 可自訂待辦事項時間
  * 可編輯、刪除待辦事項內容
  * 編輯模式時，可以拖動事項來決定倒數先後順序
* Finish:已完成的事項會列在此頁
  * 可再次加入代辦清單、刪除事項
* Setting:四種鈴聲選一種當響鈴

## 使用工具
* Vue.js
* Vue cli
* Vuex 和 VueRouter

## 引用套件
* bootstrap-vue
* FontAwesomeIcon
* vuedraggable
* vue-ellipse-progress
* vue2-timepicker

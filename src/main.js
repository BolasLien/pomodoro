import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueGtag from 'vue-gtag'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faPen, faTrashAlt, faSave, faWindowClose, faPlay, faPause, faStepForward, faPlusCircle, faCog, faClock, faPlus, faTasks } from '@fortawesome/free-solid-svg-icons'

import draggable from 'vuedraggable'
import VueEllipseProgress from 'vue-ellipse-progress'
import VueTimepicker from 'vue2-timepicker'

import 'noto-sans-tc/noto_sans_tc_regular/css.css'
import './style/style.styl'
import 'vue2-timepicker/dist/VueTimepicker.css'

library.add(faCheck, faPen, faTrashAlt, faSave, faWindowClose, faPlay, faPause, faStepForward, faPlusCircle, faCog, faClock, faPlus, faTasks)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('draggable', draggable)
Vue.use(VueEllipseProgress, 'vep')
Vue.component('VueTimepicker', VueTimepicker)

Vue.use(VueGtag, {
  config: { id: 'UA-168227875-1' }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style/main.css'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.$subscribe((_, state) => {
    localStorage.setItem(`pomodoro:${store.$id}`, JSON.stringify(state))
  })
})

createApp(App).use(pinia).use(router).mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style/main.css'

const pinia = createPinia()
const persistTimers = new Map()

function pickPersistedState (storeId, state) {
  if (storeId !== 'pomodoro') {
    return state
  }

  return {
    todos: state.todos,
    finished: state.finished,
    currentLabel: state.currentLabel,
    activeTodo: state.activeTodo,
    currentDuration: state.currentDuration,
    timeLeft: state.timeLeft,
    isBreak: state.isBreak,
    status: state.status,
    selectedAlarm: state.selectedAlarm
  }
}

function safePersistState (storeId, state) {
  try {
    const payload = pickPersistedState(storeId, state)
    localStorage.setItem(`pomodoro:${storeId}`, JSON.stringify(payload))
  } catch (error) {
    console.warn(`[persist] failed for store ${storeId}:`, error)
  }
}

pinia.use(({ store }) => {
  store.$subscribe((_, state) => {
    const prevTimer = persistTimers.get(store.$id)
    if (prevTimer) {
      clearTimeout(prevTimer)
    }

    const timer = setTimeout(() => {
      safePersistState(store.$id, state)
      persistTimers.delete(store.$id)
    }, 250)

    persistTimers.set(store.$id, timer)
  })
})

createApp(App).use(pinia).use(router).mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const timeleft = parseInt(process.env.VUE_APP_TIMELEFT)
const timeleftBreak = parseInt(process.env.VUE_APP_TIMELEFT_BREAK)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    todos: [],
    finishs: [],
    timeleft,
    alarm: 'alarm1.mp3',
    current: '',
    isBreak: false,
    // 0 = 停止
    // 1 = 播放
    // 2 = 暫停
    status: 0
  },
  mutations: {
    selectAlarm (state, file) {
      state.alarm = file
    },
    addTodo (state, data) {
      state.todos.push({ name: data, edit: false, model: data })
    },
    dragTodo (state, data) {
      state.todos = data
    },
    delTodo (state, data) {
      state.todos.splice(data, 1)
    },
    editTodo (state, data) {
      state.todos[data].edit = !state.todos[data].edit
    },
    cancelTodo (state, data) {
      state.todos[data].edit = false
      state.todos[data].model = state.todos[data].name
    },
    saveTodo (state, data) {
      state.todos[data].edit = false
      state.todos[data].name = state.todos[data].model
    },
    start (state) {
      if (state.isBreak) {
        state.current = '休息一下'
      } else {
        state.current = state.todos[0].name
        state.todos.splice(0, 1)
      }
    },
    countdown (state) {
      state.timeleft--
    },
    finish (state, data) {
      if (state.todos.length > 0) {
        state.isBreak = !state.isBreak
      }

      if (data !== '休息一下') { state.finishs.push({ name: data }) }

      state.current = ''
      state.timeleft = state.isBreak ? timeleftBreak : timeleft
    },
    again (state, data) {
      state.todos.push({ name: data.item.name, edit: false, model: data.item.name })
      state.finishs.splice(data.index, 1)
    },
    delFinish (state, data) {
      state.finishs.splice(data, 1)
    },
    setStatus (state, data) {
      state.status = data
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    alarm (state) {
      return state.alarm
    },
    todos (state) {
      return state.todos
    },
    timeleft (state) {
      return state.timeleft
    },
    current (state) {
      return state.current
    },
    isBreak (state) {
      return state.isBreak
    },
    finishs (state) {
      return state.finishs
    },
    status (state) {
      return state.status
    }
  }
})

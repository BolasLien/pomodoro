import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// const timeleft = parseInt(process.env.VUE_APP_TIMELEFT)
const timeleftBreak = parseInt(process.env.VUE_APP_TIMELEFT_BREAK)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    todos: [],
    finishs: [],
    timepick: 0,
    timeleft: 0,
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
      state.todos.push({ name: data[0], edit: false, model: data[0], timepick: data[1] })
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
        state.timeleft = parseInt(state.todos[0].timepick.mm * 60) + parseInt(state.todos[0].timepick.ss)
        state.timepick = state.todos[0].timepick
        state.todos.splice(0, 1)
      }
    },
    countdown (state) {
      state.timeleft--
    },
    finish (state, data) {
      if (data[0] !== '休息一下') { state.finishs.push({ name: data[0], timepick: data[1] }) }

      state.current = ''
      if (state.todos.length > 0) {
        state.isBreak = !state.isBreak
        state.timeleft = state.isBreak ? timeleftBreak : parseInt(state.todos[0].timepick.mm * 60) + parseInt(state.todos[0].timepick.ss)
      }
    },
    again (state, data) {
      state.todos.push({ name: data.item.name, edit: false, model: data.item.name, timepick: data.item.timepick })
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
    timepick (state) {
      return state.timepick
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
    },
    getDarkColor (state) {
      return state.isBreak ? '#84DCC6' : state.status !== 1 ? '#f7f7f7' : '#ff686b'
    },
    getLightColor (state) {
      return state.isBreak ? '#A5FFD6' : state.status !== 1 ? '#f7f7f7' : '#ffa69e'
    }
  }
})

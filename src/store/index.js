import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    timeleft: parseInt(process.env.VUE_APP_TIMELEFT),
    alarm: 'alarm1.mp3',
    current: '',
    isBreak: false
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
    }
  }
})

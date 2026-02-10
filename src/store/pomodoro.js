import { defineStore } from 'pinia'

const STORAGE_KEY = 'pomodoro:pomodoro'
const DEFAULT_SHORT_BREAK_MINUTES = 5
const DEFAULT_LONG_BREAK_MINUTES = 15
const DEFAULT_LONG_BREAK_INTERVAL = 4
const DEFAULT_AUTO_START_NEXT = false

function normalizeMinutes (value) {
  const n = Number.parseInt(value, 10)
  if (Number.isNaN(n)) return 0
  return Math.min(Math.max(n, 0), 120)
}

function normalizeBreakInterval (value) {
  const n = Number.parseInt(value, 10)
  if (Number.isNaN(n)) return DEFAULT_LONG_BREAK_INTERVAL
  return Math.min(Math.max(n, 1), 12)
}

function normalizeSeconds (value) {
  const n = Number.parseInt(value, 10)
  return Number.isNaN(n) ? 0 : Math.min(Math.max(n, 0), 59)
}

function createInitialState () {
  return {
    todos: [],
    finished: [],
    currentLabel: '',
    activeTodo: null,
    currentDuration: 0,
    timeLeft: 0,
    isBreak: false,
    breakType: 'short',
    completedFocusCount: 0,
    shortBreakMinutes: DEFAULT_SHORT_BREAK_MINUTES,
    longBreakMinutes: DEFAULT_LONG_BREAK_MINUTES,
    longBreakInterval: DEFAULT_LONG_BREAK_INTERVAL,
    autoStartNext: DEFAULT_AUTO_START_NEXT,
    status: 'idle',
    focusEndAlarm: 'alarm1.mp3',
    breakEndAlarm: 'alarm1.mp3'
  }
}

function loadPersistedState () {
  if (typeof window === 'undefined') return createInitialState()

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createInitialState()
    const parsed = JSON.parse(raw)
    const legacyAlarm = typeof parsed.selectedAlarm === 'string' ? parsed.selectedAlarm : 'alarm1.mp3'
    return {
      ...createInitialState(),
      ...parsed,
      shortBreakMinutes: normalizeMinutes(parsed.shortBreakMinutes),
      longBreakMinutes: normalizeMinutes(parsed.longBreakMinutes),
      longBreakInterval: normalizeBreakInterval(parsed.longBreakInterval),
      autoStartNext: Boolean(parsed.autoStartNext),
      breakType: parsed.breakType === 'long' ? 'long' : 'short',
      focusEndAlarm: typeof parsed.focusEndAlarm === 'string' ? parsed.focusEndAlarm : legacyAlarm,
      breakEndAlarm: typeof parsed.breakEndAlarm === 'string' ? parsed.breakEndAlarm : legacyAlarm
    }
  } catch {
    return createInitialState()
  }
}

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => loadPersistedState(),
  getters: {
    hasTasks: (state) => state.todos.length > 0,
    canSkip: (state) => state.currentLabel.length > 0,
    progress (state) {
      if (!state.currentDuration) return 0
      return Math.max((state.timeLeft / state.currentDuration) * 100, 0)
    },
    darkColor (state) {
      if (state.isBreak) return '#84DCC6'
      if (state.status === 'running') return '#FF686B'
      return '#F7F7F7'
    },
    lightColor (state) {
      if (state.isBreak) return '#A5FFD6'
      if (state.status === 'running') return '#FFA69E'
      return '#F7F7F7'
    }
  },
  actions: {
    addTodo (payload) {
      const name = payload.name?.trim()
      const minutes = normalizeSeconds(payload.minutes)
      const seconds = normalizeSeconds(payload.seconds)

      if (!name || (minutes === 0 && seconds === 0)) {
        return false
      }

      this.todos.push({
        id: crypto.randomUUID(),
        name,
        minutes,
        seconds
      })
      this.todos = [...this.todos]
      return true
    },
    updateTodo (payload) {
      const todo = this.todos.find((item) => item.id === payload.id)
      if (!todo) return

      const name = payload.name?.trim()
      const minutes = normalizeSeconds(payload.minutes)
      const seconds = normalizeSeconds(payload.seconds)

      if (!name || (minutes === 0 && seconds === 0)) {
        return
      }

      todo.name = name
      todo.minutes = minutes
      todo.seconds = seconds
      this.todos = [...this.todos]
    },
    reorderTodos (list) {
      this.todos = list
    },
    deleteTodo (id) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },
    moveFinishedBack (id) {
      const target = this.finished.find((item) => item.id === id)
      if (!target) return
      this.todos.push({
        id: crypto.randomUUID(),
        name: target.name,
        minutes: target.minutes,
        seconds: target.seconds
      })
      this.todos = [...this.todos]
      this.finished = this.finished.filter((item) => item.id !== id)
    },
    deleteFinished (id) {
      this.finished = this.finished.filter((item) => item.id !== id)
    },
    selectFocusEndAlarm (file) {
      this.focusEndAlarm = file
    },
    selectBreakEndAlarm (file) {
      this.breakEndAlarm = file
    },
    updateBreakSettings (payload) {
      this.shortBreakMinutes = normalizeMinutes(payload.shortBreakMinutes)
      this.longBreakMinutes = normalizeMinutes(payload.longBreakMinutes)
      this.longBreakInterval = normalizeBreakInterval(payload.longBreakInterval)
      this.autoStartNext = Boolean(payload.autoStartNext)
    },
    startTimer () {
      if (this.status === 'paused' && this.timeLeft > 0) {
        this.status = 'running'
        return
      }

      if (this.status === 'running') return

      if (!this.currentLabel) {
        if (this.isBreak) {
          const breakMinutes = this.breakType === 'long' ? this.longBreakMinutes : this.shortBreakMinutes
          const breakSeconds = breakMinutes * 60
          this.currentLabel = this.breakType === 'long' ? '長休息' : '短休息'
          this.currentDuration = breakSeconds
          this.timeLeft = breakSeconds
          this.activeTodo = null
        } else {
          const next = this.todos.shift()
          if (!next) return
          this.currentLabel = next.name
          this.currentDuration = next.minutes * 60 + next.seconds
          this.timeLeft = this.currentDuration
          this.activeTodo = next
        }
      }

      this.status = 'running'
    },
    pauseTimer () {
      if (this.status === 'running') {
        this.status = 'paused'
      }
    },
    tick () {
      if (this.status !== 'running') return
      this.timeLeft = Math.max(this.timeLeft - 1, 0)
    },
    completeSegment () {
      if (!this.isBreak && this.activeTodo) {
        this.completedFocusCount += 1
        this.finished.push({
          id: this.activeTodo.id,
          name: this.activeTodo.name,
          minutes: this.activeTodo.minutes,
          seconds: this.activeTodo.seconds
        })
      }

      this.currentLabel = ''
      this.currentDuration = 0
      this.activeTodo = null
      this.status = 'idle'
      this.timeLeft = 0

      if (!this.isBreak && this.todos.length > 0) {
        const useLongBreak = this.completedFocusCount % this.longBreakInterval === 0
        this.isBreak = true
        this.breakType = useLongBreak ? 'long' : 'short'
      } else if (this.isBreak && this.todos.length > 0) {
        this.isBreak = false
        this.breakType = 'short'
      } else {
        this.isBreak = false
        this.breakType = 'short'
      }

      if ((this.isBreak || this.todos.length > 0) && this.autoStartNext) {
        this.startTimer()
      }
    }
  }
})

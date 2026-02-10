<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Pause, Play, SkipForward } from 'lucide-vue-next'
import Timer from '../components/Timer.vue'
import { usePomodoroStore } from '../store/pomodoro'

const store = usePomodoroStore()
const intervalId = ref(null)

const stageText = computed(() => {
  if (store.status === 'running') return store.isBreak ? '休息階段' : '專注階段'
  if (store.status === 'paused') return '已暫停'
  return '準備開始'
})

const canStart = computed(() => {
  if (store.status === 'paused') return true
  return store.todos.length > 0 || store.currentLabel.length > 0
})

function stopInterval () {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

function maybePlayAlarm (skip, wasBreak) {
  if (skip) return
  const file = wasBreak ? store.breakEndAlarm : store.focusEndAlarm
  const audio = new Audio(`/alarms/${file}`)
  audio.play().catch(() => {})
}

function startInterval () {
  stopInterval()
  intervalId.value = setInterval(() => {
    if (store.status !== 'running') {
      stopInterval()
      return
    }

    store.tick()

    if (store.timeLeft <= 0) {
      finish(false)
    }
  }, 1000)
}

function start () {
  store.startTimer()
  if (store.status === 'running') {
    startInterval()
  }
}

function pause () {
  store.pauseTimer()
  stopInterval()
}

function finish (skip) {
  stopInterval()
  const wasBreak = store.isBreak
  store.completeSegment()
  maybePlayAlarm(skip, wasBreak)

  if (store.status === 'running') {
    startInterval()
  }
}

onMounted(() => {
  if (store.status === 'running') {
    startInterval()
  }
})

onUnmounted(() => {
  stopInterval()
})
</script>

<template>
  <section class="space-y-4 sm:space-y-6">
    <div class="app-card flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
      <div>
        <h1 class="page-title">專注計時器</h1>
        <p class="page-subtitle">{{ stageText }}，待辦剩餘 {{ store.todos.length }} 項</p>
      </div>
      <span class="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">本地模式</span>
    </div>

    <Timer />

    <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      <button
        v-if="store.status !== 'running'"
        data-testid="start-btn"
        class="btn-primary w-full sm:w-44"
        :disabled="!canStart"
        @click="start"
      >
        <Play class="h-5 w-5" />
        <span>開始</span>
      </button>

      <button
        v-if="store.status === 'running'"
        data-testid="pause-btn"
        class="btn-secondary w-full sm:w-44"
        @click="pause"
      >
        <Pause class="h-5 w-5" />
        <span>暫停</span>
      </button>

      <button
        v-if="store.canSkip"
        data-testid="skip-btn"
        class="btn-ghost w-full sm:w-44"
        @click="finish(true)"
      >
        <SkipForward class="h-5 w-5" />
        <span>略過</span>
      </button>
    </div>
  </section>
</template>

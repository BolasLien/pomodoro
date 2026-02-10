<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Play, Pause, SkipForward } from 'lucide-vue-next'
import Timer from '../components/Timer.vue'
import { usePomodoroStore } from '../store/pomodoro'

const store = usePomodoroStore()
const intervalId = ref(null)

function stopInterval() {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

function maybePlayAlarm(skip) {
  if (skip) return
  const audio = new Audio(`/alarms/${store.selectedAlarm}`)
  audio.play().catch(() => {})
}

function startInterval() {
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

function start() {
  store.startTimer()
  if (store.status === 'running') {
    startInterval()
  }
}

function pause() {
  store.pauseTimer()
  stopInterval()
}

function finish(skip) {
  stopInterval()
  store.completeSegment()
  maybePlayAlarm(skip)

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
  <div class="space-y-6">
    <Timer />

    <div class="flex justify-center gap-4">
      <button
        v-if="store.status !== 'running'"
        data-testid="start-btn"
        class="rounded-xl bg-black px-6 py-3 text-white transition hover:opacity-90"
        @click="start"
      >
        <Play class="h-5 w-5" />
      </button>

      <button
        v-if="store.status === 'running'"
        data-testid="pause-btn"
        class="rounded-xl bg-slate-700 px-6 py-3 text-white transition hover:opacity-90"
        @click="pause"
      >
        <Pause class="h-5 w-5" />
      </button>

      <button
        v-if="store.canSkip"
        data-testid="skip-btn"
        class="rounded-xl bg-slate-200 px-6 py-3 text-slate-900 transition hover:bg-slate-300"
        @click="finish(true)"
      >
        <SkipForward class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

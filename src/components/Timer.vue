<script setup>
import { computed } from 'vue'
import { usePomodoroStore } from '../store/pomodoro'

const store = usePomodoroStore()

const currentText = computed(() => {
  if (store.currentLabel) return store.currentLabel
  if (store.todos.length > 0) return '點擊開始'
  return '沒有事項'
})

const timeText = computed(() => {
  const minutes = Math.floor(store.timeLeft / 60)
  const seconds = Math.floor(store.timeLeft % 60)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const statusText = computed(() => {
  if (store.status === 'paused') return '暫停中'
  if (store.status === 'running') return store.isBreak ? '休息中' : '專注中'
  return '待命'
})

const meterStyle = computed(() => ({
  width: `${store.progress}%`,
  background: `linear-gradient(90deg, ${store.lightColor}, ${store.darkColor})`
}))
</script>

<template>
  <section class="app-card mx-auto w-full max-w-4xl overflow-hidden" data-testid="timer-card">
    <div class="relative p-5 sm:p-7">
      <div
        class="pointer-events-none absolute inset-0 opacity-60"
        :style="{ background: `radial-gradient(circle at 10% 10%, ${store.lightColor} 0%, transparent 45%)` }"
      ></div>

      <div class="relative space-y-5">
        <div class="flex items-center justify-between gap-3">
          <span
            class="rounded-full px-3 py-1 text-xs font-bold text-slate-900"
            :style="{ backgroundColor: store.lightColor }"
          >
            {{ statusText }}
          </span>
          <span class="text-xs font-semibold text-slate-500">{{ currentText }}</span>
        </div>

        <div class="text-center">
          <p class="text-[clamp(2.8rem,8vw,5.8rem)] font-black leading-none tracking-[0.08em] text-slate-900">
            {{ timeText }}
          </p>
          <p class="mt-2 text-sm font-medium text-slate-500">保持節奏，穩定推進</p>
        </div>

        <div class="space-y-2">
          <div class="h-3 overflow-hidden rounded-full bg-slate-200/80">
            <div class="h-full rounded-full transition-all duration-500" :style="meterStyle"></div>
          </div>
          <div class="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>進度</span>
            <span>{{ Math.round(store.progress) }}%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

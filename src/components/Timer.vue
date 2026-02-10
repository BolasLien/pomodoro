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
</script>

<template>
  <section class="mx-auto w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" data-testid="timer-card">
    <div class="mb-3 text-center text-xl font-bold">{{ currentText }}</div>

    <div class="h-4 overflow-hidden rounded-full bg-gray-200">
      <div
        class="h-full rounded-full transition-all duration-500"
        :style="{ width: `${store.progress}%`, backgroundColor: store.darkColor }"
      ></div>
    </div>

    <p class="mt-4 text-center text-5xl font-semibold tracking-widest">{{ timeText }}</p>
  </section>
</template>

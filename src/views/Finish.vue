<script setup>
import { RotateCcw, Trash2 } from 'lucide-vue-next'
import { usePomodoroStore } from '../store/pomodoro'

const store = usePomodoroStore()
</script>

<template>
  <section class="space-y-4" data-testid="finish-page">
    <div class="app-card p-4 sm:p-5">
      <h1 class="page-title">已完成</h1>
      <p class="page-subtitle">回顧成果，必要時可再次加入任務序列</p>
    </div>

    <div class="app-card overflow-hidden">
      <div v-if="store.finished.length === 0" class="p-6 text-center text-sm font-medium text-slate-500">尚無完成項目</div>

      <div
        v-for="item in store.finished"
        :key="item.id"
        class="grid grid-cols-1 gap-3 border-b border-slate-100 p-4 last:border-b-0 sm:grid-cols-[1fr_auto_auto] sm:items-center"
      >
        <div>
          <p class="text-base font-semibold text-slate-900">{{ item.name }}</p>
          <p class="text-sm text-slate-500">完成時間 {{ String(item.minutes).padStart(2, '0') }}:{{ String(item.seconds).padStart(2, '0') }}</p>
        </div>

        <button class="btn-secondary w-full sm:w-auto" @click="store.moveFinishedBack(item.id)">
          <RotateCcw class="h-4 w-4" />
          <span>再一次</span>
        </button>

        <button class="btn-danger w-full sm:w-auto" @click="store.deleteFinished(item.id)">
          <Trash2 class="h-4 w-4" />
          <span>移除</span>
        </button>
      </div>
    </div>
  </section>
</template>

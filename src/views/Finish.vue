<script setup>
import { RotateCcw, Trash2 } from 'lucide-vue-next'
import { usePomodoroStore } from '../store/pomodoro'

const store = usePomodoroStore()
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white" data-testid="finish-page">
    <div v-if="store.finished.length === 0" class="p-4 text-center text-slate-500">尚無完成項目</div>

    <div v-for="item in store.finished" :key="item.id" class="grid grid-cols-[1fr_auto_auto] items-center gap-2 border-b border-slate-100 p-3 last:border-b-0">
      <div>
        <p class="font-medium">{{ item.name }}</p>
        <p class="text-sm text-slate-500">{{ String(item.minutes).padStart(2, '0') }}:{{ String(item.seconds).padStart(2, '0') }}</p>
      </div>

      <button class="rounded-lg bg-emerald-500 p-2 text-white" @click="store.moveFinishedBack(item.id)">
        <RotateCcw class="h-4 w-4" />
      </button>

      <button class="rounded-lg bg-rose-500 p-2 text-white" @click="store.deleteFinished(item.id)">
        <Trash2 class="h-4 w-4" />
      </button>
    </div>
  </section>
</template>

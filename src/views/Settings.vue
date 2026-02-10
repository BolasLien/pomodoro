<script setup>
import { Play, Check } from 'lucide-vue-next'
import { usePomodoroStore } from '../store/pomodoro'

const store = usePomodoroStore()

const alarms = [
  { name: '鬧鈴', file: 'alarm1.mp3' },
  { name: '電子鬧鈴', file: 'Alarm2.mp3' },
  { name: '哨聲長', file: 'Whistle1.mp3' },
  { name: '哨聲短', file: 'Whistle2.mp3' }
]

function preview(file) {
  const audio = new Audio(`/alarms/${file}`)
  audio.play().catch(() => {})
}
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white" data-testid="settings-page">
    <div
      v-for="item in alarms"
      :key="item.file"
      class="grid grid-cols-[1fr_auto_auto] items-center gap-2 border-b border-slate-100 p-3 last:border-b-0"
      @click="store.selectAlarm(item.file)"
    >
      <span class="font-medium">{{ item.name }}</span>

      <button class="rounded-lg bg-slate-200 p-2" @click.stop="preview(item.file)">
        <Play class="h-4 w-4" />
      </button>

      <Check v-if="store.selectedAlarm === item.file" class="h-5 w-5 text-emerald-600" />
      <div v-else class="h-5 w-5"></div>
    </div>
  </section>
</template>

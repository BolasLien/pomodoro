<script setup>
import { Check, Play } from 'lucide-vue-next'
import { usePomodoroStore } from '../store/pomodoro'

const store = usePomodoroStore()

const alarms = [
  { name: '鬧鈴', file: 'alarm1.mp3', tone: '經典提示音' },
  { name: '電子鬧鈴', file: 'Alarm2.mp3', tone: '清晰電子感' },
  { name: '哨聲長', file: 'Whistle1.mp3', tone: '長音提醒' },
  { name: '哨聲短', file: 'Whistle2.mp3', tone: '短促提醒' }
]

function preview (file) {
  const audio = new Audio(`/alarms/${file}`)
  audio.play().catch(() => {})
}
</script>

<template>
  <section class="space-y-4" data-testid="settings-page">
    <div class="app-card p-4 sm:p-5">
      <h1 class="page-title">鈴聲設定</h1>
      <p class="page-subtitle">選擇最適合你節奏的提醒音效</p>
    </div>

    <div class="app-card overflow-hidden">
      <div
        v-for="item in alarms"
        :key="item.file"
        class="grid cursor-pointer grid-cols-[1fr_auto] items-center gap-3 border-b border-slate-100 p-4 transition hover:bg-slate-50 last:border-b-0 sm:grid-cols-[1fr_auto_auto]"
        :class="store.selectedAlarm === item.file ? 'bg-emerald-50/80' : 'bg-white/80'"
        @click="store.selectAlarm(item.file)"
      >
        <div>
          <p class="text-base font-semibold text-slate-900">{{ item.name }}</p>
          <p class="text-sm text-slate-500">{{ item.tone }}</p>
        </div>

        <button class="btn-ghost w-full sm:w-auto" @click.stop="preview(item.file)">
          <Play class="h-4 w-4" />
          <span>預覽</span>
        </button>

        <div class="hidden sm:flex sm:justify-end">
          <span
            v-if="store.selectedAlarm === item.file"
            class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
          >
            <Check class="h-4 w-4" />
            已選擇
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
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

function selectFocusAlarm (file) {
  store.selectFocusEndAlarm(file)
}

function selectBreakAlarm (file) {
  store.selectBreakEndAlarm(file)
}

const shortBreakMinutes = ref(store.shortBreakMinutes)
const longBreakMinutes = ref(store.longBreakMinutes)
const longBreakInterval = ref(store.longBreakInterval)
const autoStartNext = ref(store.autoStartNext)

watch([shortBreakMinutes, longBreakMinutes, longBreakInterval, autoStartNext], () => {
  store.updateBreakSettings({
    shortBreakMinutes: shortBreakMinutes.value,
    longBreakMinutes: longBreakMinutes.value,
    longBreakInterval: longBreakInterval.value,
    autoStartNext: autoStartNext.value
  })
})
</script>

<template>
  <section class="space-y-4" data-testid="settings-page">
    <div class="app-card space-y-2 p-4 sm:p-5">
      <h1 class="page-title">鈴聲設定</h1>
      <p class="page-subtitle">選擇最適合你節奏的提醒音效</p>
    </div>

    <div class="app-card space-y-4 p-4 sm:p-5">
      <div>
        <h2 class="text-lg font-bold text-slate-900">休息設定</h2>
        <p class="text-sm text-slate-500">設定短休息、長休息與長休息觸發週期</p>
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label class="space-y-1">
          <span class="text-xs font-semibold text-slate-500">短休息（分鐘）</span>
          <input
            v-model.number="shortBreakMinutes"
            data-testid="short-break-input"
            class="app-input"
            type="number"
            min="0"
            max="120"
          />
        </label>

        <label class="space-y-1">
          <span class="text-xs font-semibold text-slate-500">長休息（分鐘）</span>
          <input
            v-model.number="longBreakMinutes"
            data-testid="long-break-input"
            class="app-input"
            type="number"
            min="0"
            max="120"
          />
        </label>

        <label class="space-y-1">
          <span class="text-xs font-semibold text-slate-500">每幾輪觸發長休息</span>
          <input
            v-model.number="longBreakInterval"
            data-testid="long-break-interval-input"
            class="app-input"
            type="number"
            min="1"
            max="12"
          />
        </label>

        <label class="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <input
            v-model="autoStartNext"
            data-testid="auto-start-toggle"
            type="checkbox"
            class="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
          />
          <div>
            <p class="text-sm font-semibold text-slate-800">自動開始下一段</p>
            <p class="text-xs text-slate-500">開啟後，專注與休息會自動銜接開始</p>
          </div>
        </label>
      </div>
    </div>

    <div class="app-card space-y-3 p-4 sm:p-5">
      <div>
        <h2 class="text-lg font-bold text-slate-900">專注結束音效</h2>
        <p class="text-sm text-slate-500">完成專注並進入休息時播放</p>
      </div>
      <div class="grid gap-2">
        <div
          v-for="item in alarms"
          :key="`focus-${item.file}`"
          class="grid cursor-pointer grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50"
          :class="store.focusEndAlarm === item.file ? 'bg-emerald-50/80 border-emerald-200' : 'bg-white/80'"
          @click="selectFocusAlarm(item.file)"
        >
          <div>
            <p class="text-base font-semibold text-slate-900">{{ item.name }}</p>
            <p class="text-sm text-slate-500">{{ item.tone }}</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn-ghost w-full sm:w-auto" @click.stop="preview(item.file)">
              <Play class="h-4 w-4" />
              <span>預覽</span>
            </button>
            <span
              v-if="store.focusEndAlarm === item.file"
              class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
            >
              <Check class="h-4 w-4" />
              已選擇
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="app-card space-y-3 p-4 sm:p-5">
      <div>
        <h2 class="text-lg font-bold text-slate-900">休息結束音效</h2>
        <p class="text-sm text-slate-500">休息結束並回到任務時播放</p>
      </div>
      <div class="grid gap-2">
        <div
          v-for="item in alarms"
          :key="`break-${item.file}`"
          class="grid cursor-pointer grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50"
          :class="store.breakEndAlarm === item.file ? 'bg-emerald-50/80 border-emerald-200' : 'bg-white/80'"
          @click="selectBreakAlarm(item.file)"
        >
          <div>
            <p class="text-base font-semibold text-slate-900">{{ item.name }}</p>
            <p class="text-sm text-slate-500">{{ item.tone }}</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn-ghost w-full sm:w-auto" @click.stop="preview(item.file)">
              <Play class="h-4 w-4" />
              <span>預覽</span>
            </button>
            <span
              v-if="store.breakEndAlarm === item.file"
              class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
            >
              <Check class="h-4 w-4" />
              已選擇
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

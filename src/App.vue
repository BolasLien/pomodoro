<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { AlarmClock, CheckCheck, ListTodo, Settings } from 'lucide-vue-next'
import { usePomodoroStore } from './store/pomodoro'

const store = usePomodoroStore()

const navItems = [
  { to: '/', label: 'Home', icon: AlarmClock },
  { to: '/list', label: 'Tasks', icon: ListTodo },
  { to: '/finish', label: 'Finish', icon: CheckCheck },
  { to: '/settings', label: 'Setting', icon: Settings }
]

const statusTag = computed(() => {
  if (store.status === 'paused') return '暫停中'
  if (store.status === 'running') return store.isBreak ? '休息模式' : '專注模式'
  return '待機'
})

const accentStyle = computed(() => ({
  backgroundColor: store.darkColor
}))
</script>

<template>
  <div class="app-shell xl:grid xl:grid-cols-[260px_1fr]">
    <aside class="hidden border-r border-slate-200/70 bg-white/75 p-5 backdrop-blur xl:block">
      <div class="mb-8 space-y-2">
        <h1 class="text-3xl font-black tracking-tight text-slate-900">番茄鐘</h1>
        <p class="text-sm text-slate-500">Focus Console</p>
      </div>

      <nav class="space-y-2">
        <RouterLink
          v-for="item in navItems"
          :key="`desktop-${item.to}`"
          :to="item.to"
          class="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          active-class="bg-slate-900 text-white hover:bg-slate-900"
        >
          <component :is="item.icon" class="h-5 w-5" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
    </aside>

    <div class="flex min-h-dvh flex-col">
      <header class="sticky top-0 z-10 border-b border-slate-200/60 bg-white/80 px-4 py-3 backdrop-blur md:px-6">
        <div class="flex items-center justify-between gap-3">
          <div>
            <h2 class="text-lg font-bold text-slate-900 md:text-xl">Pomodoro Local App</h2>
            <p class="text-xs text-slate-500">跨裝置 SPA</p>
          </div>
          <span class="rounded-full px-3 py-1 text-xs font-semibold text-slate-900" :style="accentStyle">
            {{ statusTag }}
          </span>
        </div>
      </header>

      <main class="flex-1 overflow-auto px-4 py-4 pb-24 md:px-6 xl:pb-6">
        <RouterView />
      </main>

      <footer class="fixed bottom-0 left-0 right-0 z-10 border-t border-slate-200/80 bg-white/90 p-2 backdrop-blur xl:hidden" style="padding-bottom: calc(0.5rem + env(safe-area-inset-bottom));">
        <nav class="grid grid-cols-4 gap-1">
          <RouterLink
            v-for="item in navItems"
            :key="`mobile-${item.to}`"
            :to="item.to"
            class="flex min-h-11 flex-col items-center justify-center rounded-xl px-2 py-2 text-[11px] font-semibold text-slate-600 transition"
            active-class="bg-slate-900 text-white"
          >
            <component :is="item.icon" class="mb-1 h-5 w-5" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
      </footer>
    </div>
  </div>
</template>

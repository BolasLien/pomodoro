<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { AlarmClock, ListTodo, CheckCheck, Settings } from 'lucide-vue-next'
import { usePomodoroStore } from './store/pomodoro'

const store = usePomodoroStore()

const shellStyle = computed(() => ({
  backgroundColor: store.darkColor
}))

const navItems = [
  { to: '/', label: 'Home', icon: AlarmClock },
  { to: '/list', label: 'Tasks', icon: ListTodo },
  { to: '/finish', label: 'Finish', icon: CheckCheck },
  { to: '/settings', label: 'Setting', icon: Settings }
]
</script>

<template>
  <div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col bg-white shadow-xl">
    <header class="px-4 py-4 text-center text-2xl font-bold" :style="shellStyle">番茄鐘</header>

    <main class="flex-1 overflow-auto p-4">
      <RouterView />
    </main>

    <footer class="sticky bottom-0 border-t px-2 py-2" :style="shellStyle">
      <nav class="grid grid-cols-4 gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex flex-col items-center justify-center rounded-lg px-2 py-2 text-xs font-medium text-gray-700 transition hover:bg-white/70"
          active-class="bg-white/80 text-gray-900"
        >
          <component :is="item.icon" class="mb-1 h-5 w-5" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
    </footer>
  </div>
</template>

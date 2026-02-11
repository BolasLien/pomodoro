<script setup>
import { ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { GripVertical, Pencil, Plus, Save, Trash2, X } from 'lucide-vue-next'
import { usePomodoroStore } from '../store/pomodoro'

const store = usePomodoroStore()

const newName = ref('')
const newMinutes = ref(25)
const newSeconds = ref(0)

const editingId = ref('')
const editName = ref('')
const editMinutes = ref(0)
const editSeconds = ref(0)

const editMode = ref(false)

function addTodo () {
  const ok = store.addTodo({
    name: newName.value,
    minutes: newMinutes.value,
    seconds: newSeconds.value
  })

  if (!ok) {
    window.alert('請輸入待辦事項與有效時間')
    return
  }

  newName.value = ''
  newMinutes.value = 25
  newSeconds.value = 0
}

function startEdit (todo) {
  editingId.value = todo.id
  editName.value = todo.name
  editMinutes.value = todo.minutes
  editSeconds.value = todo.seconds
}

function cancelEdit () {
  editingId.value = ''
}

function saveEdit (todoId) {
  store.updateTodo({
    id: todoId,
    name: editName.value,
    minutes: editMinutes.value,
    seconds: editSeconds.value
  })
  editingId.value = ''
}
</script>

<template>
  <section class="space-y-4" data-testid="list-page">
    <div class="app-card space-y-4 p-4 sm:p-5">
      <div>
        <h1 class="page-title">新增任務</h1>
        <p class="page-subtitle">先設定名稱與時間，再加入任務清單</p>
      </div>

      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[1fr_120px_120px_auto_auto]">
        <label class="space-y-1">
          <span class="text-xs font-semibold text-slate-500">任務名稱</span>
          <input v-model="newName" data-testid="todo-input" class="app-input" placeholder="例如：寫週報" />
        </label>
        <label class="space-y-1">
          <span class="text-xs font-semibold text-slate-500">分鐘</span>
          <input v-model.number="newMinutes" class="app-input" type="number" min="0" max="59" aria-label="minutes" />
        </label>
        <label class="space-y-1">
          <span class="text-xs font-semibold text-slate-500">秒鐘</span>
          <input v-model.number="newSeconds" class="app-input" type="number" min="0" max="59" aria-label="seconds" />
        </label>
        <button class="btn-primary w-full self-end lg:w-auto" @click="addTodo">
          <Plus class="h-4 w-4" />
          <span>新增</span>
        </button>
        <div></div>
      </div>
    </div>

    <div class="app-card overflow-hidden">
      <div class="flex items-center justify-between border-b border-slate-100 p-4 sm:p-5">
        <div>
          <h2 class="text-lg font-bold text-slate-900">任務清單</h2>
          <p class="text-xs text-slate-500">拖曳排序與編輯既有任務</p>
        </div>
        <button class="w-auto" :class="editMode ? 'btn-danger' : 'btn-secondary'" @click="editMode = !editMode">
          <Pencil class="h-4 w-4" />
          <span>{{ editMode ? '完成排序' : '編輯模式' }}</span>
        </button>
      </div>

      <VueDraggableNext
        v-model="store.todos"
        item-key="id"
        handle=".drag-handle"
      >
        <div
          v-for="todo in store.todos"
          :key="todo.id"
          class="grid gap-3 border-b border-slate-100 p-4 last:border-b-0 md:grid-cols-[auto_1fr_auto]"
          :class="editMode ? 'bg-amber-50/45' : 'bg-white/80'"
        >
          <button v-if="editMode" type="button" class="icon-btn drag-handle h-10 w-10">
            <GripVertical class="h-4 w-4" />
          </button>
          <div v-else class="h-10 w-10"></div>

          <template v-if="editingId === todo.id">
            <div class="grid gap-2 md:grid-cols-[1fr_110px_110px]">
              <input v-model="editName" class="app-input" />
              <input v-model.number="editMinutes" class="app-input" type="number" min="0" max="59" />
              <input v-model.number="editSeconds" class="app-input" type="number" min="0" max="59" />
            </div>
            <div class="flex items-center justify-end gap-2">
              <button type="button" class="icon-btn border-emerald-300 text-emerald-700" @click="saveEdit(todo.id)"><Save class="h-4 w-4" /></button>
              <button type="button" class="icon-btn" @click="cancelEdit"><X class="h-4 w-4" /></button>
            </div>
          </template>

          <template v-else>
            <div>
              <p class="text-base font-semibold text-slate-900">{{ todo.name }}</p>
              <p class="text-sm text-slate-500">預估時間 {{ String(todo.minutes).padStart(2, '0') }}:{{ String(todo.seconds).padStart(2, '0') }}</p>
            </div>
            <div v-if="editMode" class="flex items-center justify-end gap-2">
              <button type="button" class="icon-btn border-sky-300 text-sky-700" @click="startEdit(todo)"><Pencil class="h-4 w-4" /></button>
              <button type="button" class="icon-btn border-rose-300 text-rose-700" @click="store.deleteTodo(todo.id)"><Trash2 class="h-4 w-4" /></button>
            </div>
          </template>
        </div>
      </VueDraggableNext>

      <p v-if="store.todos.length === 0" class="p-5 text-center text-sm font-medium text-slate-500">沒有資料，先建立第一個任務</p>
    </div>
  </section>
</template>

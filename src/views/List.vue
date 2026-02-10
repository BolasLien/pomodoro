<script setup>
import { computed, ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { GripVertical, Pencil, Trash2, Save, X, Plus } from 'lucide-vue-next'
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

const todosModel = computed({
  get: () => store.todos,
  set: (value) => store.reorderTodos(value)
})

function addTodo() {
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

function startEdit(todo) {
  editingId.value = todo.id
  editName.value = todo.name
  editMinutes.value = todo.minutes
  editSeconds.value = todo.seconds
}

function cancelEdit() {
  editingId.value = ''
}

function saveEdit(todoId) {
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
    <div class="grid gap-2 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_120px_120px_auto_auto]">
      <input
        v-model="newName"
        data-testid="todo-input"
        class="rounded-lg border border-slate-300 px-3 py-2"
        placeholder="新增待辦事項..."
      />

      <input
        v-model.number="newMinutes"
        class="rounded-lg border border-slate-300 px-3 py-2"
        type="number"
        min="0"
        max="59"
      />

      <input
        v-model.number="newSeconds"
        class="rounded-lg border border-slate-300 px-3 py-2"
        type="number"
        min="0"
        max="59"
      />

      <button class="rounded-lg bg-black px-3 py-2 text-white" @click="addTodo">
        <Plus class="h-4 w-4" />
      </button>

      <button
        class="rounded-lg px-3 py-2 text-white"
        :class="editMode ? 'bg-rose-500' : 'bg-slate-600'"
        @click="editMode = !editMode"
      >
        <Pencil class="h-4 w-4" />
      </button>
    </div>

    <div class="rounded-xl border border-slate-200 bg-white">
      <VueDraggableNext v-model="todosModel" item-key="id" handle=".drag-handle" :disabled="!editMode">
        <div
          v-for="todo in todosModel"
          :key="todo.id"
          class="grid items-center gap-2 border-b border-slate-100 p-3 last:border-b-0 md:grid-cols-[auto_1fr_auto]"
        >
          <button v-if="editMode" class="drag-handle text-slate-500">
            <GripVertical class="h-4 w-4" />
          </button>
          <div v-else class="h-4 w-4"></div>

          <template v-if="editingId === todo.id">
            <div class="grid gap-2 md:grid-cols-[1fr_100px_100px]">
              <input v-model="editName" class="rounded-lg border border-slate-300 px-3 py-2" />
              <input v-model.number="editMinutes" type="number" min="0" max="59" class="rounded-lg border border-slate-300 px-3 py-2" />
              <input v-model.number="editSeconds" type="number" min="0" max="59" class="rounded-lg border border-slate-300 px-3 py-2" />
            </div>
            <div class="flex gap-2">
              <button class="rounded-lg bg-emerald-500 p-2 text-white" @click="saveEdit(todo.id)"><Save class="h-4 w-4" /></button>
              <button class="rounded-lg bg-slate-300 p-2" @click="cancelEdit"><X class="h-4 w-4" /></button>
            </div>
          </template>

          <template v-else>
            <p class="font-medium">待辦事項：{{ todo.name }}，{{ String(todo.minutes).padStart(2, '0') }}:{{ String(todo.seconds).padStart(2, '0') }}</p>
            <div v-if="editMode" class="flex gap-2">
              <button class="rounded-lg bg-sky-500 p-2 text-white" @click="startEdit(todo)"><Pencil class="h-4 w-4" /></button>
              <button class="rounded-lg bg-rose-500 p-2 text-white" @click="store.deleteTodo(todo.id)"><Trash2 class="h-4 w-4" /></button>
            </div>
          </template>
        </div>
      </VueDraggableNext>

      <p v-if="todosModel.length === 0" class="p-4 text-center text-slate-500">沒有資料</p>
    </div>
  </section>
</template>

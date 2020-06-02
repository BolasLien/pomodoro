<template>
  <div id="list" class="row flex-column">
    <div class="col mb-3">
      <div class="row">
        <div class="col-8">
          <b-form-input v-model="newtodo" placeholder="新增待辦事項..."></b-form-input>
        </div>
        <div class="col-2">
          <b-btn variant="success" @click="addTodo">
            <font-awesome-icon :icon="['fas','plus']"></font-awesome-icon>
          </b-btn>
        </div>
        <div class="col-2">
          <b-btn :variant="editColor" @click="listEdit">
            <font-awesome-icon :icon="['fas','pen']"></font-awesome-icon>
          </b-btn>
        </div>
      </div>
    </div>

    <div class="col">
      <b-table-simple>
        <draggable :sort="isEdit" v-model="todos" tag="tbody" v-bind="dragOption">
          <b-tr v-if="todos.length == 0">
            <b-td>沒有資料</b-td>
          </b-tr>
          <b-tr v-else v-for="(todo, index) in todos" :key="index">
            <b-td>
              <b-form-input v-model="todo.model" v-if="todo.edit"></b-form-input>
              <b-btn variant="link" class="text-danger" v-if="todo.edit" @click="cancelTodo(index)">
                <font-awesome-icon :icon="['fas','window-close']" size="2x"></font-awesome-icon>
              </b-btn>
              <b-btn variant="link" class="text-success" v-if="todo.edit" @click="saveTodo(index)">
                <font-awesome-icon :icon="['fas','save']" size="2x"></font-awesome-icon>
              </b-btn>
              <span v-else>{{ todo.name }}</span>
            </b-td>
            <b-td>
              <b-btn v-if="isEdit" variant="link" class="text-primary" @click="editTodo(index)">
                <font-awesome-icon :icon="['fas','pen']"></font-awesome-icon>
              </b-btn>
              <b-btn v-if="isEdit" variant="link" class="text-danger" @click="delTodo(index)">
                <font-awesome-icon :icon="['fas','trash-alt']"></font-awesome-icon>
              </b-btn>
            </b-td>
          </b-tr>
        </draggable>
      </b-table-simple>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newtodo: '',
      isEdit: false,
      editColor: 'primary',
      dragOption: {
        animation: 200
      }
    }
  },
  methods: {
    addTodo () {
      if (this.newtodo.length === 0) {
        alert('不可以新增空白的待辦事項')
      } else {
        this.$store.commit('addTodo', this.newtodo)
      }
    },
    delTodo (index) {
      this.$store.commit('delTodo', index)
    },
    editTodo (index) {
      this.$store.commit('editTodo', index)
    },
    cancelTodo (index) {
      this.$store.commit('cancelTodo', index)
    },
    saveTodo (index) {
      if (this.newtodo.length === 0) {
        alert('無法修改為空白的待辦事項')
      } else {
        this.$store.commit('saveTodo', index)
      }
    },
    listEdit () {
      this.isEdit = !this.isEdit
      this.editColor = this.isEdit ? 'danger' : 'primary'
    }
  },
  computed: {
    todos: {
      get () {
        return this.$store.getters.todos
      },
      set (value) {
        this.$store.commit('dragTodo', value)
      }
    }
  }
}
</script>

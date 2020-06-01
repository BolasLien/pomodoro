<template>
  <div id="finish" class="row">
    <div class="col">
      <b-table :items="finishs" :fields="fields">

      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fields: [
        {

          key: 'name',
          label: '名稱'
        }

      ]
    }
  },
  computed: {
    finishs: {
      get () {
        return this.$store.getters.finishs
      },
      set (value) {
        // this.$store.commit('dragTodo', value)
      }
    }
  }
}
</script>

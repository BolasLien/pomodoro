<template>
  <div id="finish" class="row">
    <div class="col">
      <b-table class="text-center" :items="finishs" :fields="fields">
        <template v-slot:cell(again)="data">
          <b-btn variant="success" @click="again(data)">
            <font-awesome-icon :icon="['fas','plus']"></font-awesome-icon>
          </b-btn>
        </template>
        <template v-slot:cell(del)="data">
          <b-btn variant="danger" @click="delFinish(data)">
            <font-awesome-icon :icon="['fas','trash-alt']"></font-awesome-icon>
          </b-btn>
        </template>

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
        },
        {
          key: 'again',
          label: '再一次'
        },
        {
          key: 'del',
          label: '移除'
        }
      ]
    }
  },
  computed: {
    finishs () {
      return this.$store.getters.finishs
    }
  },
  methods: {
    again (data) {
      this.$store.commit('again', data)
    },
    delFinish (data) {
      this.$store.commit('delFinish', data.index)
    }
  }
}
</script>

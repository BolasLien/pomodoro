<template>
  <div id="settings" class="row">
    <div class="col">
      <b-table class="text-center" :items="items" :fields="fields" @row-clicked="selectAlarm">
        <template v-slot:cell(preview)="data">
          <!-- <audio controls :src="'./alarms/'+data.item.file"></audio> -->
          <b-btn @click="playAudio(data)">
            <font-awesome-icon :icon="['fas','play']"></font-awesome-icon>
          </b-btn>
        </template>
        <template v-slot:cell(select)="data">
          <font-awesome-icon v-if="data.item.file == alarm" :icon="['fas','check']" size="lg"></font-awesome-icon>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          name: '鬧鈴',
          file: 'Alarm1.mp3'
        },
        {
          name: '電子鬧鈴',
          file: 'Alarm2.mp3'
        },
        {
          name: '哨聲長',
          file: 'Whistle1.mp3'
        },
        {
          name: '哨聲短',
          file: 'Whistle2.mp3'
        }
      ],
      fields: [
        {
          key: 'name',
          label: '名稱'
        },
        {
          key: 'preview',
          label: '預覽'
        },
        {
          key: 'select',
          label: '選擇'
        }
      ]
    }
  },
  computed: {
    alarm () {
      return this.$store.getters.alarm
    }
  },
  methods: {
    selectAlarm (item) {
      this.$store.commit('selectAlarm', item.file)
    },
    playAudio (data) {
      const audio = new Audio()
      audio.src = './alarms/' + data.item.file
      audio.play()
      console.log(data.item.file)
    }
  }
}
</script>

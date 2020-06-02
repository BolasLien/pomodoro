<template>
  <div id="home" class="row flex-column justify-content-center">
    <div class="col">
      <h1>{{ currentText }}</h1>
    </div>

    <div class="col">
      <h2>{{ timetext }}</h2>
    </div>

    <div class="col">
      <b-btn variant="primary" v-if="status != 1" @click="start">
        <font-awesome-icon :icon="['fas','play']" ></font-awesome-icon>
      </b-btn>

      <b-btn variant="primary" v-if="status == 1" @click="pause">
        <font-awesome-icon :icon="['fas','pause']" ></font-awesome-icon>
      </b-btn>

      <b-btn variant="primary" v-if="current.length > 0 || todos.length > 0" @click="finish(true,current)">
        <font-awesome-icon :icon="['fas','step-forward']"></font-awesome-icon>
      </b-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timer: 0
    }
  },
  computed: {
    currentText () {
      return this.current.length > 0 ? this.current : this.todos.length > 0 ? '點擊開始' : '沒有事項'
    },
    timetext () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      return `${m} 分 ${s} 秒`
    },
    alarm () {
      return this.$store.getters.alarm
    },
    timeleft () {
      return this.$store.getters.timeleft
    },
    current () {
      return this.$store.getters.current
    },
    todos () {
      return this.$store.getters.todos
    },
    status: {
      get () {
        return this.$store.getters.status
      },
      set (value) {
        this.$store.commit('setStatus', value)
      }
    }
  },
  methods: {
    start () {
      if (this.status === 2) {
      // 暫停後繼續
        this.status = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= 0) {
            this.finish(false)
          }
        }, 1000)
      } else {
      // 開始新的倒數
        if (this.todos.length > 0) {
          this.$store.commit('start')
          this.status = 1
          this.timer = setInterval(() => {
            this.$store.commit('countdown')
            if (this.timeleft <= 0) {
              this.finish(false)
            }
          }, 1000)
        }
      }
    },
    finish (skip) {
      clearInterval(this.timer)
      this.status = 0
      this.$store.commit('finish', this.current)

      if (!skip) {
        const audio = new Audio()
        audio.src = './alarms/' + this.alarm
        audio.play()
      }

      if (this.todos.length > 0) {
        this.start()
      } else {
        alert('結束')
      }
    },
    pause () {
      clearInterval(this.timer)
      this.status = 2
    }
  }
}
</script>

<template>
  <div id="home" class="row flex-column justify-content-center">
    <div class="col text-center mt-5 mb-5">
        <timer></timer>
    </div>
    <div class="col text-center">
      <b-btn variant="light" v-if="status != 1" @click="start">
        <font-awesome-icon :icon="['fas','play']" size="2x"></font-awesome-icon>
      </b-btn>

      <b-btn variant="secondary" v-if="status == 1" @click="pause">
        <font-awesome-icon :icon="['fas','pause']" size="2x"></font-awesome-icon>
      </b-btn>

      <b-btn variant="light" v-if="current.length > 0 || todos.length > 0" @click="finish(true,current)">
        <font-awesome-icon :icon="['fas','step-forward']" size="2x"></font-awesome-icon>
      </b-btn>
    </div>
  </div>
</template>

<script>
import Timer from '../components/Timer.vue'
export default {
  data () {
    return {
      timer: 0
    }
  },
  components: {
    timer: Timer
  },
  computed: {
    alarm () {
      return this.$store.getters.alarm
    },
    timepick () {
      return this.$store.getters.timepick
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
      this.$store.commit('finish', [this.current, this.timepick])

      if (!skip) {
        const audio = new Audio()
        audio.src = './alarms/' + this.alarm
        audio.play()
      }

      if (this.todos.length > 0) {
        this.start()
      } else {
        // alert('太棒了！你完成所有的任務了！')
      }
    },
    pause () {
      clearInterval(this.timer)
      this.status = 2
    }
  }
}
</script>

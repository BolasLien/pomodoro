<template>
  <div id="timer">
    <vep
      :progress="progress"
      :determinate="determinate"
      :color="color"
      :empty-color="emptyColor"
      :emptyColorFill="emptyColorFill"
      thickness="10%"
      emptyThickness="15%"
      :size="400"
      :dash="dash"
      lineMode="normal"
      :legend="false"
      legendClass="legend-custom-style"
      fontSize="5rem"
      font-color="white"
      animation="loop 1000 100"
      :loading="isBreak"
      :no-data="noData"
    >
      <span slot="legend-value">/200</span>
      <div slot="legend-caption">
        <h1>{{ currentText }}</h1>
        <br />
        <h2>{{ timetext }}</h2>
      </div>
    </vep>
  </div>
</template>

<script>
export default {
  data () {
    return {
      determinate: false,
      emptyColorFill: 'transparent',
      noData: false
    }
  },
  computed: {
    status () {
      return this.$store.state.status
    },
    isBreak () {
      return this.$store.state.isBreak
    },
    current () {
      return this.$store.state.current
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    todos () {
      return this.$store.getters.todos
    },
    color () {
      // progress顏色(較深色)
      return this.$store.getters.getDarkColor
    },
    emptyColor () {
      // 外框顏色(較淺色)
      return this.$store.getters.getLightColor
    },
    dash () {
      // return 'strict ' + (this.fullTime / 60) + ' 0.8'
      return '0'
    },
    fullTime () {
      return parseInt(
        this.isBreak
          ? process.env.VUE_APP_TIMELEFT_BREAK
          : process.env.VUE_APP_TIMELEFT
      )
    },
    progress () {
      return (this.timeleft / this.fullTime) * 100
    },
    currentText () {
      return this.current.length > 0
        ? this.current
        : this.todos.length > 0
          ? '點擊開始'
          : '沒有事項'
    },
    timetext () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      return `${m} 分 ${s} 秒`
    }
  }
}
</script>

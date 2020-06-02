<template>
  <div id="timer">
<vep
      :progress="progress"
      :determinate="determinate"
      :color="color"
      empty-color="#F88563"
      :emptyColorFill="emptyColorFill"
      thickness="2%"
      emptyThickness="4%"
      :size="300"
      :dash="dash"
      lineMode="normal"
      :legend="false"
      legendClass="legend-custom-style"
      fontSize="5rem"
      font-color="white"
      animation="loop 1000 100"
      :loading="loading"
      :no-data="noData">

  <span slot="legend-value">/200</span>
  <p slot="legend-caption">{{current}}</p>

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
    color () {
      return 'rgb(217, 97 ,87)'
    },
    dash () {
      return 'strict ' + this.fullTime + ' 0.8'
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
    fullTime () {
      return parseInt(this.isBreak ? process.env.VUE_APP_TIMELEFT_BREAK : process.env.VUE_APP_TIMELEFT)
    },
    progress () {
      return (this.timeleft / this.fullTime) * 100
    },
    loading () {
      return this.isBreak
    }
  }
}
</script>

<template>
  <div class="light" :class="{ light_active: isActive, strobe_active: isStrobeActive }">
    <div class="timer" :class="{ timer_active: isActive }">{{ value }}</div>
  </div>
</template>

<script>
  export default {
    props: ["path", "duration"],
    data: () => ({
      timer: null,
      value: null,
      strobe: false
    }),
    computed: {
      isActive() {
        this.strobe = false
        this.updateTimer(this.duration)
        return this.$route.path === this.path
      },
      isStrobeActive() { return this.strobe && this.isActive }
    },
    methods: {
      updateTimer(duration) {
        clearInterval(this.timer)
        this.value = duration--
        this.timer = setInterval(() => { this.value = duration-- }, 1000)
      }
    },
    watch: {
      value: function (val) { if ( val < 3 ) { this.strobe = true } }
    }
  }
</script>

<style>
  .light {
    align-items: center;
    border-radius: 1.7em;
    display: flex;
    justify-content: center;
    margin: 1.5%;
    opacity: 0.3;
    transition: opacity 0.2s;
    width: available;
    width: -moz-available;
  }
  .light_active {
    opacity: 1;
  }
  .timer {
    font-size: 4rem;
    font-weight: bold;
    opacity: 0.5;
    transition: opacity 0.2s;
    visibility: hidden;
  }
  .timer_active {
    visibility: visible;
  }
  .strobe_active {
    animation-name: blinker;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(1.0,0,0,1.0);
    -webkit-animation-name: blinker;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: cubic-bezier(1.0,0,0,1.0);
    -webkit-animation-duration: 1s;
  }
  @keyframes blinker {
    from { opacity: 1.0; }
    to { opacity: 0.3; }
  }

  @-webkit-keyframes blinker {
    from { opacity: 1.0; }
    to { opacity: 0.3; }
  }
</style>

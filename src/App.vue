<template>
  <div id="screen">
    <Light class="green" path="/green" :duration="this.currentState"/>
    <Light class="yellow" path="/yellow" :duration="this.currentState"/>
    <Light class="red" path="/red" :duration="this.currentState"/>
  </div>
</template>

<script>
  import { defineComponent } from "vue"
  import Light from "./components/Light.vue"

  class State {
    constructor(current, duration, next) {
      this.current = current
      this.duration = duration
      this.next = next
    }
  }

  class Controller {
    trigger(state, callback) {
      callback(state)
      setTimeout(() => { this.trigger(state.next, callback) }, state.duration * 1000)
    }
  }

  export default defineComponent({
    name: "App",
    components: { Light },
    data: () => ({ currentState: null }),
    methods: {},
    mounted() {
      let controller = new Controller()

      let red = new State("/red", 10)
      let yellowToGreen = new State("/yellow", 3)
      let yellowToRed = new State("/yellow", 3)
      let green = new State("/green", 15)

      red.next = yellowToGreen
      yellowToGreen.next = green
      green.next = yellowToRed
      yellowToRed.next = red

      let beginState = red
      if (this.$route.path === "/yellow") beginState = yellowToGreen
      else if (this.$route.path === "/green") beginState = green

      controller.trigger(beginState, (state) => {
        this.$router.push({ path: state.current, component: Light })
        this.currentState = state.duration
      })
    }
  })
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
  }

  #screen {
    background: black;
    border-radius: 1.7em;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
                rgba(0, 0, 0, 0.12) 0px -12px 30px,
                rgba(0, 0, 0, 0.12) 0px 4px 6px,
                rgba(0, 0, 0, 0.17) 0px 12px 13px,
                rgba(0, 0, 0, 0.09) 0px -3px 5px;
    height: 110px;
    display: flex;
    padding: 0.2%;
    width: 340px;
  }

  .red { background: #ff0000; }

  .yellow { background: #ffff00; }

  .green { background: #00ffcc; }
</style>

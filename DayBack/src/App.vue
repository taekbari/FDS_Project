<template>
  <div id="app">
    <login></login>
  </div>
</template>

<script>
import Login from './components/Login.vue';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Login
  }
}
</script>

<style lang="scss">
</style>

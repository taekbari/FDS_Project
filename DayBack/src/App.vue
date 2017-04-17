<template>
  <div id="app">
    <app-header></app-header>
    <app-video></app-video>
    <login></login>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Video from './components/Video.vue';
import Login from './components/Login.vue';

export default {
  name: 'app',
  components: {
    AppHeader: Header,
    AppVideo: Video,
    Login
  }
}
</script>

<style lang="sass">
html
  box-sizing: border-box
  font-size: 16px

*, *::before, *::after
  box-sizing: inherit

body
  margin: 0
</style>

<template>
  <div id="app">
    <!--<app-header></app-header>-->
    <!--<app-video></app-video>-->
    <!--<login></login>-->
    <app-main></app-main>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Video from './components/Video.vue';
import Login from './components/Login.vue';
import Main from './components/Main.vue';

export default {
  name: 'app',
  components: {
    AppHeader: Header,
    AppVideo: Video,
    Login,
    AppMain: Main
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

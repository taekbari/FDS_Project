import Vue from 'vue'
import App from './App.vue'

const eventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get() {
      return eventBus;
    }
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})

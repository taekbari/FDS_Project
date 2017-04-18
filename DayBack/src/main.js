import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

const eventBus = new Vue();

Vue.use(VueMaterial);

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

import Vue from 'vue'
import App from './App.vue'

const eventBus = new Vue();
const store = {
    debug: true,
    state: {
        key: ''
    }
}

Object.defineProperties(Vue.prototype, {
    $eventBus: {
        get() {
            return eventBus;
        }
    },
    $store: {
        get: function() {
            return store;
        }
    }
});

new Vue({
    el: '#app',
    render: h => h(App)
})
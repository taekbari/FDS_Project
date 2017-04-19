import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import Main from './components/Main.vue'

Vue.use(VueMaterial);
// vue-router 사용을 위한 설정
Vue.use(VueRouter);

// eventBus 사용을 위한 설정
const eventBus = new Vue();
// Vue.prototype에 store 객체 연결
const store = {
    state: {
        key: "dc0175a26a365df4637ec75354810965ef65070c",
        userInfo: null
    }
};

Object.defineProperties(Vue.prototype, {
    $eventBus: {
        get() {
            return eventBus;
        }
    },
    $store: {
        get() {
            return store;
        }
    }
});

// 라우트 정의
// 경로와 컴포넌트를 연결한다.
const routes = [{
        path: '/',
        component: Login
    },
    {
        path: '/service',
        component: Main,
    }
];

// 라우터 객체 생성하고 정의해 놓은 라우트 설정
const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
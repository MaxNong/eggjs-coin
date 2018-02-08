'use strict'
import Vue from 'vue'
import router from './router/router'
import App from './App.vue'
import iview from 'iview'
import 'iview/dist/styles/iview.css';
// import './my-theme/index.less';

window.Vue = Vue
Vue.use(iview)
let startApp = function () {
  const app = new Vue({
    router,
    template: '<App/>',
    components: {App}
  }).$mount('#app')
}
startApp()

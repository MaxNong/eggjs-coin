'use strict'
import Vue from 'vue'
import router from './router/router'
import App from './App.vue'

window.Vue = Vue
let startApp = function () {
  const app = new Vue({
    router,
    template: '<App/>',
    components: {App}
  }).$mount('#app')
}
startApp()

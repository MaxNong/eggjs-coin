'use strict'
import Vue from 'vue'
import router from './router/router'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

window.Vue = Vue
Vue.use(ElementUi)
let startApp = function () {
  const app = new Vue({
    router,
    template: '<App/>',
    components: {App}
  }).$mount('#app')
}
startApp()

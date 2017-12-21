let Vue = require('vue/dist/vue')
let App = require('../view/App.vue')

module.exports = {
  app_vue: new Vue({
    template: '<div id="app"><app></app></div>',
    components: {App}
  })
}
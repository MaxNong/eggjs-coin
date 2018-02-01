export default [
  {
    path: '/binance',
    name: 'binance',
    component: resolve => {
      require(['../../view/coinPages/binance/index.vue'], resolve)
    }
  }
]
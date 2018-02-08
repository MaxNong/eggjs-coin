export default [
  {
    path: '/binance',
    name: 'binance',
    component: resolve => {
      require(['../../view/coinPages/binance/index.vue'], resolve)
    }
  },
  {
    path: '/huobi',
    name: 'huobi',
    component: resolve => {
      require(['../../view/coinPages/huobi/index.vue'], resolve)
    }
  }
]
export default [
  {
    path: '/test',
    name: 'test',
    component: resolve => {
      require(['../../view/wymusic/test/test.vue'], resolve)
    }
  }
]
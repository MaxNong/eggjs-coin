import RemoteMusic from './wymusic'
let defaultRouter = [
  {
    path: '/',
    name: 'home',
    component: resolve => {
      require(['../../../view/wymusic/index.vue'], resolve)
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]
let routers = Array.prototype.concat(RemoteMusic, defaultRouter)
export default  routers
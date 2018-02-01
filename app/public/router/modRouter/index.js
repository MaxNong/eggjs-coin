import RemoteMusic from './wymusic'
import coinPages from './coinPages'
let defaultRouter = [
  {
    path: '/',
    name: 'home',
    component: resolve => {
      require(['../../view/wymusic/index.vue'], resolve)
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]
let routers = Array.prototype.concat(coinPages, RemoteMusic, defaultRouter)
export default  routers
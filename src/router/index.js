import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import ls from '@/utils/localStorage.js'

Vue.use(Router)

const router = new Router({
  mode:'history',
  //base: process.env.BASE_URL,
  routes
 })

router.beforeEach((to, from, next) => {
  const app = router.app
  const store = app.$options.store
  const token = store.state.auth.token

  if (token){
    if (to.path === '/login' || to.path ==='/register'){
      next(from.path)
    } else {
      next()
    }
  } else {
    if (to.path ==='/home' || to.path === '/job' || to.path === '/login'
         || to.path === '/register' || to.path === '/forgetPassword' || to.path === '/agreement'){
      next()
    } else {
      ls.setItem('tabIndex', 0)
      next('/login')
    }
  }
})

export default router 
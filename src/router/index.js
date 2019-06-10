import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/view/Register'
import Login from '@/view/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/hello',
      name: 'helloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
router.beforeEach((to, from, next) => {
  let token = store.state.token
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router

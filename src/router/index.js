import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

function getAbsolutePath () {
  let path = location.pathname
  return path.substring(0, path.lastIndexOf('/') + 1)
}

let router = new Router({
  // mode: 'history',
  base: getAbsolutePath(),
  routes: [
    {
      path: '/',
      name: '',
      component: resolve => require(['@/pages/index.vue'], resolve)
    }
  ],
  scrollBehavior (to, from, savedPosition) { // 默认滚动到顶部
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // let userInfo = localStorage.getItem('userInfo')
  // let user = getCookies('user', 'UserID')
  // if (!user && to.path !== '/login') {
  //   next({path: '/login'})
  // } else {
  next()
  // }
})

router.afterEach(transition => {
  NProgress.done()
})

export default router

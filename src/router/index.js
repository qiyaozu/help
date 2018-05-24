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
      component: resolve => require(['@/pages/index.vue'], resolve),
      meta: {
        title: '帮助中心'
      }
    },
    {
      path: '/tickling',
      name: 'tickling',
      component: resolve => require(['@/pages/tickling.vue'], resolve),
      meta: {
        title: '问题反馈'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/pages/search.vue'], resolve),
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/question_detail',
      name: 'question_detail',
      component: resolve => require(['@/pages/question_detail.vue'], resolve),
      meta: {
        title: '帮助与反馈'
      }
    },
    {
      path: '/dirList',
      name: 'dirList',
      component: resolve => require(['@/pages/dirList.vue'], resolve),
      meta: {
        title: '帮助与反馈'
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) { // 默认滚动到顶部
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = to.meta.title
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

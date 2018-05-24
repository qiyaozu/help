// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../static/js/rem'
import '../static/css/reset.css'
import { ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'
// import 'swiper/dist/css/swiper.css'
import { chPost, chGet } from './interface'

Vue.config.productionTip = false
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)

Vue.prototype.chPost = chPost
Vue.prototype.chGet = chGet
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

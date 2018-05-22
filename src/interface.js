import vue from 'vue'
import axios from 'axios'
import { ToastPlugin, LoadingPlugin } from 'vux'
vue.use(ToastPlugin)
vue.use(LoadingPlugin)

// import { TEST_URL } from './settings.js'

// vux 项目
// import { LoadingPlugin, ConfirmPlugin, ToastPlugin, AlertPlugin} from 'vux'
// Vue.use(ConfirmPlugin)
// Vue.use(LoadingPlugin)
// Vue.use(ToastPlugin)
// Vue.use(AlertPlugin)

// console.log(location.hostname.indexOf('5iwd.com'))
// let DEBUG = (location.hostname.indexOf('xx.hoom.org') >= 0 || location.hostname.indexOf('0.0.0.0') >= 0)?true:false
// const COMMONURL = 'http://localhost:18935'
// const COMMONURL1 = 'http://192.168.1.97:8886'
// http://api.chdesign.cn
// var qs = require('qs')
var caihong = axios.create({
  // baseURL: COMMONURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

caihong.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
caihong.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  return Promise.reject(error)
})

let chPost = function (url, data, successFunc) {
  // axios 解决post传参
  var params = new URLSearchParams()
  for (let item in data) {
    params.append(item, data[item])
  };
  // console.log(this)
  this.$vux.loading.show()
  // data = qs.stringify(data)
  caihong.post(url, params).then(res => {
    this.$vux.loading.hide()
    successFunc(res.data)
  }).catch(res => {
    vue.$vux.loading.hide()
  })
}

let chGet = function (url, successFunc, header = {}) {
  vue.$vux.loading.show({
    text: 'Loading'
  })
  caihong.get(url).then(res => {
    vue.$vux.loading.hide()
    if (res.errcode === 0) {
      successFunc(res)
    } else {
      vue.$vux.loading.hide()
    }
  }).catch(res => {
    vue.$vux.loading.hide()
  })
}

export { chPost, chGet }

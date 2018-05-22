let dev = false // 判断当前是开发还是测试
let interFace, m // interFace 接口  m M站

if (dev) {
  interFace = 'http://192.168.1.97:8885'
  m = 'http://192.168.1.97:8880'
} else {
  interFace = 'http://api.chdesign.cn'
  m = 'http://m.chdesign.cn'
}

module.exports = { interFace, m }

// 取出url中的某个参数
function request(paras) { // eslint-disable-line
  // decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。
  var url = decodeURI(location.href) // location.href;--中文乱码
  var paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
  var paraObj = {}
  for (var i = 0, j; j = paraString[i]; i++) { // eslint-disable-line
    paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(j.indexOf('=') + 1, j.length);
  }
  var returnValue = paraObj[paras.toLowerCase()]
  if (typeof (returnValue) === 'undefined') {
    return ''
  } else {
    return returnValue
  }
}

// 添加cookie以及作用域
function addCookieAndDomain(objName, objValue, objHours, strdomain) { // eslint-disable-line
  var str = objName + '=' + objValue + ';domain=' + strdomain
  if (objHours > 0) { // 为0时不设定过期时间
    var date = new Date()
    var ms = objHours * 3600 * 1000
    date.setTime(date.getTime() + ms)
    str += '; expires=' + date.toGMTString() + ';path=/'
  } else {
    str += ';path=/'
  }
  document.cookie = str
}

function getCookies(key, name) { // eslint-disable-line
  var arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'))
  if (arr != null) {
    arr = unescape(arr[2]).split('&')
    for (var x in arr) {
      if (arr[x].split('=')[0] === name) {
        return arr[x].split('=')[1]
      }
    }
  }
  return ''
}

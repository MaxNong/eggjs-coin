import axios from 'axios'
import apiConfig from 'apiConfig'
import qs from 'qs'

/*
{
  type: 'post/get'
  name: 'helpQuestion',
  data: {
    type: 2
  },
 resolve: function () {},
 reject: function () {},
}
*/

function api (object) {
  //如果不是对象或者在apiconfig中没找到
  if (typeof (object) !== 'object' || !apiConfig[object.name]) {
    alert('无效的接口地址')
    return
  }
  console.log('接口地址：' + object.name)
  if (!object.type) object.type = 'get'
  if (object.type == 'post') {
    axios[object.type](apiConfig[object.name], object.data || {}).then(object.resolve || function () {}, object.reject || defaultReject ())
  } else {
    let url = object.data ? `${apiConfig[object.name]}?${qs.stringify(object.data)}` : apiConfig[object.name]
    axios[object.type](url).then(object.resolve || function () {}, object.reject || function () {})
  }
}

function defaultReject (data) {
  window.Vue.$Message.info(data);
}
export default api

import axios from 'axios'
import apiConfig from 'apiConfig'
import qs from 'qs'

/*
{
  name: 'helpQuestion',
  data: {
    type: 2
  }
}
*/

function api (object) {
  if (typeof (object) !== 'object' || !apiConfig[object.name]) {
    alert('无效的接口地址')
    return
  }
  console.log(object)
  if (object.type == 'get') {
    let url = object.data ? `${apiConfig[object.name]}?${qs.stringify(object.data)}` : apiConfig[object.name]
    axios[object.type](url).then(object.resolve || function () {}, object.reject || function () {})
  } else {
    axios[object.type](apiConfig[object.name], object.data || {}).then(object.resolve || function () {}, object.reject || function () {})
  }

}

export default api

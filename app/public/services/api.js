import axios from 'axios'
import apiConfig from 'apiConfig'

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
    axios[object.type](`${apiConfig[object.name]}?${object.data || ''}`).then(object.resolve || function () {}, object.reject || function () {})
  } else {
    axios[object.type](apiConfig[object.name], object.data || {}).then(object.resolve || function () {}, object.reject || function () {})
  }

}

export default api

var path = require('path')

// 获取绝对路径
function getAbsolutePath(addr) {
  if (!/\/src\//.test(addr)) {
    addr = '../src/' + addr;
  }
  return path.resolve(__dirname, addr);
}

module.exports = {
  'vue': 'vue/dist/vue.js',
  'utils': getAbsolutePath('common/utils.js'),
  'icon': getAbsolutePath('component/icon/index.vue'),
  //config
  Config: path.resolve(__dirname, '../config/config.js'),
  //constData
  'constData': getAbsolutePath('/constants/contentCon.js'),
  //components
  'headerBar': getAbsolutePath('component/commonBar/headerBar.vue'),
  'listItem': getAbsolutePath('component/list/listItem.vue'),
  'drapList': getAbsolutePath('component/list/drapList.vue'),
  'footPlayBar': getAbsolutePath('component/commonBar/footPlayBar.vue'),
  'swiper': getAbsolutePath('component/swiper/index.vue')
}


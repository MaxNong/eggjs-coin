var path = require('path')

// 获取绝对路径
function getAbsolutePath(addr) {
  return path.resolve(__dirname, '..', addr);
  console.log(path.resolve(__dirname, '..', addr))
}

module.exports = {
  'vue': 'vue/dist/vue.js',
  'headerAside': getAbsolutePath('components/common/headerAside.vue'),
}


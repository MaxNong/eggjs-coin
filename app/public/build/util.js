const fs = require('fs')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //在指定目录dir中查找满足正则reg的文件路径数组
  findFiles: function (dir, reg) {
    var filesArr = []
    findTraversal(dir)
    function findTraversal (dir) {
      let files = fs.readdirSync(dir)
      files.forEach((filename)=>{
        filename = dir + "/" + filename
        if (fs.statSync(filename).isDirectory()) {
          findTraversal(filename)
        } else {
          if(reg.test(filename)){
            filesArr.push(filename)
          }
        }
      })
    }
    return filesArr
  },
  getAppJsMap: function (path) {
    var entry = {},
      reg = /(\.js)$/,
      key,
      value

    var files = this.findFiles(path, reg)
    files.forEach((file)=> {
      if (file.indexOf('plugins/') == -1 && file.indexOf('vendor/') == -1) {
        if (reg.test(file)) {
          key = file.substring(file.indexOf(path) + path.length + 1).replace(reg, '')
          value = file
          entry[key.split('/')[0]] = value
        }
      }
    })
    return entry
  },
  getScssMap: function (path) {
    var entry = {},
      reg = /(\.scss)$/,
      key,
      value

    var files = this.findFiles(path, reg)
    files.forEach((file)=> {
      if (file.indexOf('plugins/') == -1 && file.indexOf('vendor/') == -1) {
        if (reg.test(file)) {
          key = file.substring(file.indexOf(path) + path.length + 1).replace(reg, '')
          value = file
          entry[key] = value
        }
      }
    })
    return entry
  },
  getViewMap: function (path) {
    var entry = [],
      reg = /(\.vue)$/,
      key,
      value

    var files = this.findFiles(path, reg)
    files.forEach((file)=> {
      if (file.indexOf('plugins/') == -1 && file.indexOf('vendor/') == -1) {
        if (reg.test(file)) {
          key = file.substring(file.indexOf(path) + path.length + 1).replace(reg, '')
          value = file
          entry.push(key.split('/')[0])
        }
      }
    })
    return entry
  },
  getWebpackHtml: function (arrObj) {
    let htmlPlugins = []
    arrObj.forEach(v => {
      htmlPlugins.push(
        new HtmlWebpackPlugin({
          template: './index.html',
          filename: v + '.html',
          inject: true,
          chunks: [v]
        })
      )
    })
    return htmlPlugins
  }
}

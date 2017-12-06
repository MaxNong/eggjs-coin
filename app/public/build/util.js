"use strict";
/**
 * Created by xuxin on 16/10/9.
 */
const fs = require('fs')

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
          entry[key] = value
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
  }
}

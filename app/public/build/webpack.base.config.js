'use strict';
var HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
var aliasConfig = require('./aliasConfig.js')
let util = require('./util')
//基础变量
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
//基础变量
const ENV = 'develop',
  projectRoot = path.resolve(__dirname, '../');

//记录需要编译的路径
const compilePath = {
  appJs: projectRoot + '/js/',
  appView: projectRoot + '/view/'
};


/*var entry = util.getAppJsMap(compilePath.appJs);
var outHtml = util.getViewMap(compilePath.appView);
var htmlPlugins = util.getWebpackHtml(outHtml)
console.log(outHtml)
console.log(htmlPlugins)
console.log(entry)*/
module.exports = {
  entry: {index: './index.js'},
  output: {
    path: path.join(__dirname, '..', './dist'),
    filename: "wymusic/[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {'vue': 'vue/dist/vue.js'}
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: true,
      chunks: ['index']
    })
  ]
}

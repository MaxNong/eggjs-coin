'use strict';
const path = require('path');
const webpackUtil = require('./webpack.util.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const util = require('./util');

//基础变量
const ENV = 'develop',
  projectRoot = path.resolve(__dirname, '../');

var entry = util.getScssMap(projectRoot + '/css');
const baseCssConfig = {
  entry: entry,
  output: {
    path: path.join(projectRoot, 'develop'),
    filename: 'css/[name].css'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'style-loader!css-loader'
        })
      }
    ]
  },
  plugins: [
    //js中require的css在指定目录
    new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true })
  ]
};
module.exports = baseCssConfig;

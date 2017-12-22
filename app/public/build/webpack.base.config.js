'use strict';
let HtmlWebpackPlugin = require('html-webpack-plugin')
let path = require('path');
let aliasConfig = require('./aliasConfig.js')
let util = require('./util')

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
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'url-loader?limit=1000000'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: aliasConfig
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

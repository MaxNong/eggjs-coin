'use strict';
const path = require('path');
const webpackUtil = require('./webpack.util.js');
let baseJsConfig = require('./webpack.base.config.js');
const webpackCssConfig = require('./webpack.css.dev.config.js');
//基础变量
const ENV = 'develop',
  projectRoot = path.resolve(__dirname, '../');

baseJsConfig.output = {
  path: path.join(projectRoot, ENV),
  filename: 'js/[name].js',
  chunkFilename: 'js/[name].js'
};
webpackUtil.watch(webpackCssConfig);
webpackUtil.watch(baseJsConfig);

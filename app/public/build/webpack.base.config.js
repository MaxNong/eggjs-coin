let util = require('./util')
let path = require('path')
let aliasConfig = require('./aliasConf')
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = 'develop';
const projectRoot = path.resolve(__dirname, '../');
const compilePath = {
  appJs: projectRoot + '/js/'
};
function resolve(dir) {
  return path.join(projectRoot, dir)
}

let entry = util.getAppJsMap(compilePath.appJs);
module.exports = {
  entry: entry,
  output: {
    path: resolve('develop'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules'),
    ],
    alias: aliasConfig
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
      },
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
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015']
        }
      }
    ],
  }
}

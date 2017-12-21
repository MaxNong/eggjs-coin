'use strict';
let baseConfig = require('./webpack.base.config')
let webpack = require('webpack')
let compiler = webpack(baseConfig)
compiler.watch({
  aggregateTimeout: 300, // wait so long for more changes
  poll: true // use polling instead of native watchers
}, (err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
      colors: true,
      timings: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  console.log(new Date())
})


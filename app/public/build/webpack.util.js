/**
 * Created by xuxin on 16/10/11.
 */
const webpack = require("webpack");
const ora = require('ora');

module.exports = {
  compile: function (config) {
    var spinner = ora('正在编译...')
    spinner.start()

    webpack(config, function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n')
      console.log(new Date())
    })
  },

  watch: function (config) {
    var spinner = ora('正在监听...')
    spinner.start()
    var compiler = webpack(config)

    compiler.watch({ // watch options:
      aggregateTimeout: 300, // wait so long for more changes
      poll: true // use polling instead of native watchers
      // pass a number to set the polling interval
    }, function (err, stats) {
      spinner.stop()
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
    });
  }
}

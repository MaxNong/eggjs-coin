const path = require('path');
exports.keys = 'UserName=BaoQiang'
exports.view = {
  root:[
    path.join(__dirname, '..', 'app/public/dist'),
  ].join(','),
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
    '.html': 'nunjucks',
  },
};
exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};
exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: 'localhost',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: '123456',
    // 数据库名
    database: 'xfd',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
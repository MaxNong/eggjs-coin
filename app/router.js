// app/router.js
module.exports = app => {
  app.get('/', app.controller.home.index);
  // app.get('/', app.controller.templateController.dispatch);
  app.get('/news', app.controller.news.list);
  // app.get(/^\/api\/(.*)$/, app.controller.wx.dispatch);
  app.get(/^\/api\/(.*)$/, app.controller.wymusicController.dispatch);
  app.get(/^\/modRouter\/(.*)$/, app.controller.templateController.dispatch);
  app.get('/modRouter', app.controller.templateController.dispatch);
  app.get('/wymusic', app.controller.templateController.dispatch);
};
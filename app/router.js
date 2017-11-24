// app/router.js
module.exports = app => {
    app.get('/', app.controller.home.index);
    app.get('/news', app.controller.news.list);
    app.get(/^\/api\/(.*)$/, app.controller.wx.dispatch);
};
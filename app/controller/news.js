module.exports = app => {
  class NewsController extends app.Controller {
    * list() {
      /*const dataList = {
        list: [
          { id: 1, title: 'this is news 1', url: '/news/1' },
          { id: 2, title: 'this is news 2', url: '/news/2' }
        ]
      };
      yield this.ctx.render('news/list.tpl', dataList);*/
      const ctx = this.ctx;
      // const page = ctx.query.page || 1;
      const newsList = yield ctx.service.news.find('id');
      yield ctx.render('news/list.tpl', { list: newsList });
    }
  }
  return NewsController;
};

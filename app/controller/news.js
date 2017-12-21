// const rendererServer = require('vue-server-renderer')
const fs = require('fs')
// const vm = require('../extend/getVue').app_vue
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
      // var temp=new String(newsList.user[0])
      console.log(newsList.user.name)
      yield ctx.render('news/list.tpl', {list: newsList.user.name});
    }

    /*async test() {
      const ctx = this.ctx;
      let text = ''
      const renderer = await rendererServer.createRenderer({
        template: fs.readFileSync('./index.template.html', 'utf-8')
      })
      await renderer.renderToString(vm, (err, html) => {
        text = html
        console.log(html) // will be the full page with app content injected.
      })
      ctx.body = await ctx.renderString(text, {
        viewEngine: 'nunjucks',
      });
    }*/
  }
  return NewsController;
};

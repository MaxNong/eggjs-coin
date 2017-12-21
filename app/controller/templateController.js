'use strict';
const util = require('../util/util.js');

module.exports = app => {
  class TemplateController extends app.Controller {
    async dispatch () {
      let url = this.ctx.request.path
      console.log(url)
      if (url.indexOf('js') != -1) {
        this.ctx.set('content-type', 'application/javascript');
        let arr = url.split('/')
        await this.ctx.render(url)
      } else {
        await this.ctx.render('index.html')
      }
    }
  }
  return TemplateController;
};

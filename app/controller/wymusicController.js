'use strict';
const crypto = require('crypto')
const baseUrl = 'https://api.binance.com'

module.exports = app => {
  class wymusicController extends app.Controller {
    async dispatch () {
      let url = this.ctx.request.path
      let result = null
      const request = this.ctx.request;
      const opts = {
        method: request.method || 'get',
        timeout: 300000,
        data: request.method === 'POST' ? request.body : request.query
      }
      result = await this.ctx.curl(`${baseUrl}${url}`, opts);
      if (result.status == 200) {
        const headers = ['content-type', 'content-disposition'];
        headers.forEach(function (header) {
          if (result.headers[header]) {
            this.ctx.set(header, result.headers[header]);
          }
        }.bind(this));
        this.ctx.body = result.data
      } else {
        this.ctx.body = result.res
      }
    }
  }
  return wymusicController;
};

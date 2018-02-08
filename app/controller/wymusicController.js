'use strict';
const crypto = require('crypto')
// const baseUrl = 'https://api.binance.com'

module.exports = app => {
  class wymusicController extends app.Controller {
    async dispatch () {
      let url = this.ctx.request.path
      let result = null
      let baseUrl = ''
      const request = this.ctx.request;
      if (url.includes('huobi')) {
        baseUrl = 'https://api.huobi.pro'
        url = url.replace(/\/huobi/g, '')
      } else {
        baseUrl = 'https://api.binance.com'
      }
      console.log(url)
      const opts = {
        headers: {
          'X-MBX-APIKEY': 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A'
        },
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

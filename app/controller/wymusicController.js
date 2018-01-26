'use strict';

module.exports = app => {
  class wymusicController extends app.Controller {
    async dispatch () {
      let baseUrl = 'https://api.binance.com'
      let url = this.ctx.request.path
      let result = null
      const request = this.ctx.request;
      console.log(url)
      const opts = {
        method: request.method || 'get',
        headers: {
          'Authorization': this._getAuthorization()
        },
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

        let output = result.data;
        this.ctx.body = output
      } else {
        this.ctx.body = result.res
      }
    }
    _getAuthorization () {
      const uid = this.ctx.session.userinfo &&
        this.ctx.session.userinfo.uid || 0;
      let secret = app.config.secret
      const request = this.ctx.request;
      if (this.IsXe) {
        secret = app.config.xAPIsecret
      }
      return 'Bearer 11111'
    }
  }
  return wymusicController;
};

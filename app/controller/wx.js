
'use strict';
const formidable = require('formidable');
const formstream = require('formstream');

module.exports = app => {
  let formidablePromise = (req, opts) => {
    return new Promise(function (resolve, reject) {
      var form = new formidable.IncomingForm(opts);
      form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields: fields, files: files });
      });
    });
  };
  class ApiController extends app.Controller {
    async dispatch () {
      console.log(33333333)
      const request = this.ctx.request;
      let result = null;
      if (request.headers['content-type'] &&
        request.headers['content-type'].indexOf('multipart/form-data') > -1) {
        result = await this.upload(this.ctx, url, Authorization);
      } else {
        let access_token = await this.ctx.curl('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx510d534a8757afd2&secret=975d1a36f7c620c65e87f54836503c26');
        console.log(access_token.data)
      }

      if (result.status == 200) {
        const headers = ['content-type', 'content-disposition'];
        headers.forEach(function (header) {
          if (result.headers[header]) {
            this.ctx.set(header, result.headers[header]);
          }
        }.bind(this));

        this.ctx.body = result.data;
      } else {
        this.ctx.body = result.res;
      }
    }

    async upload (ctx, url, Authorization) {
      let payloads = await formidablePromise(ctx.req);
      
      let form = formstream();
      for (let item in payloads.files) {
        form.file('file', payloads.files[item].path, payloads.files[item].name);
      }
      for (let item in payloads.fields) {
        form.field(item, payloads.fields[item]);
      }
      let headers = form.headers({
        'Authorization': Authorization
      });
      return await this.ctx.curl(url, {
        method: 'POST',
        headers: headers,
        timeout: 120000,
        stream: form,
        dataType: 'json'
      });
    }
  }
  return ApiController;
};

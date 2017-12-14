/**
 * Created by xuxin on 16/10/14.
 */

const path = require('path'),
  projectRoot = path.resolve(__dirname, '../'),
  tplPath = path.resolve(__dirname, '../../') + '/view/components/',
  commonPath = projectRoot + '/js/common/',
  pluginsPath = projectRoot + '/js/plugins/',
  componentsPath = projectRoot + '/js/components/',
  utilPath = projectRoot + '/js/util/';

module.exports = {
  common: commonPath + 'common.js',
  apiMap: commonPath + 'apiMap.js',
  cookie: pluginsPath + 'cookie/cookie.js',
  paging: pluginsPath + 'tablePaging/paging.js',
  validata: pluginsPath + 'validate/validate.js',
  dataTables: pluginsPath + 'datatables/jquery.dataTables.js',
  JQvalidate: pluginsPath + 'validate/jquery.validate.min.js',
  datepicker: pluginsPath + 'datepicker/bootstrap-datepicker',
  util: utilPath + 'util.js',
  fetch: utilPath + 'fetch.js',
  message: utilPath + 'message.js',
  lang: utilPath + 'lang.js',
  page: commonPath + 'page.js',
  template: utilPath + 'template.js',
  // components
  pagingNew: componentsPath + 'paging.js',
  //tpl模板
  pagingTpl: tplPath + 'paging.tpl'
};

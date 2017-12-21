/**
 * Created by 001793 on 2017/6/27.
 */
let util = {
  userSession:{},
  readParallel: async (promises) => {
    let results = [];
    for (let promise of promises) {
      results.push(await promise);
    }
    return results;
  },
  convertToAuthList : function(auth) {
    let result = [];
    auth.forEach((item) => {
      let flag = result.find((itemc) => { return itemc.url == item.url; });
      if (flag) {
        flag.child.push({ cname: item.cname, isshow: item.isshow, sort: item.sort, directoryid: item.directoryid, ccode: item.ccode });
      } else {
        if (item.ccode) {
          result.push({fname: item.fname, sort: item.sort, isshow: item.isshow, url: item.url, directoryid: item.directoryid, child: [{ sort: item.sort, cname: item.cname, ccode: item.ccode, directoryid: item.directoryid, isshow: item.isshow}]});
        } else {
          result.push({fname: item.fname, sort: item.sort, isshow: item.isshow, url: item.url, directoryid: item.directoryid, child: []});
        }
      }
    })
    return result;
  },
  getAuth: async (ctx, userid) => {
      let auth = await ctx.service.user.getAuthAll(userid);
      auth = util.convertToAuthList(auth);
      return auth;
  },
  deepClone: function clone (item) {
    if (!item) { return item; } // null, undefined values check

    var types = [ Number, String, Boolean ],
      result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function (type) {
      if (item instanceof type) {
        result = type(item);
      }
    });

    if (typeof result == 'undefined') {
      if (Object.prototype.toString.call(item) === '[object Array]') {
        result = [];
        item.forEach(function (child, index, array) {
          result[index] = clone(child);
        });
      } else if (typeof item == 'object') {
        // testing that this is DOM
        if (item.nodeType && typeof item.cloneNode == 'function') {
          var result = item.cloneNode(true);
        } else if (!item.prototype) { // check that this is a literal
          if (item instanceof Date) {
            result = new Date(item);
          } else {
            // it is an object literal
            result = {};
            for (var i in item) {
              result[i] = clone(item[i]);
            }
          }
        } else {
          // depending what you would like here,
          // just keep the reference, or create new object
          if (false && item.constructor) {
            // would not advice to do that, reason? Read below
            result = new item.constructor();
          } else {
            result = item;
          }
        }
      } else {
        result = item;
      }
    }

    return result;
  },
  getDirectoryList: async function (ctx) {
    let userInfo = ctx.session.userInfo;
    if (!(userInfo && userInfo.uid)) {
      return {}
    }
    let auth = await ctx.service.user.getAuthAll(userInfo.uid);

    let directoryData = await ctx.service.directory.read();
    let directoryList = mapDirectoryData(directoryData);
    let path = ctx.path;
    getAuthWithDirectory(auth, directoryList, path);

    return directoryList;
  }
};
const ascOrder = (sortKey) => {
  sortKey = sortKey || 'sort';
  return (A, B) => {
    let aSortKey = A[sortKey] || 100;
    let bSortKey = B[sortKey] || 100;
    if (aSortKey < bSortKey) {
      return -1;
    } else {
      return 1;
    }
  };
};
const mapDirectoryData = (data) => {
  let result = [];
  data = data.sort((A, B) => {
    if (A.fid < B.fid) {
      return -1;
    } else {
      return 1;
    }
  });
  data.forEach((item) => {
    let flag = result.find((itemC) => { return item.fid == itemC.id; });
    if (flag) {
      flag.child.push({cname: item.name, isshow: item.isshow, id: item.id, sort: item.sort});
    } else {
      if (item.fid) {
        result.push({fname: item.name, isshow: item.isshow, id: item.id, fid: item.fid, sort: item.sort, child: [{isshow: item.isshow, cname: item.name, id: item.id}]});
      } else {
        result.push({fname: item.name, isshow: item.isshow, id: item.id, fid: item.fid, sort: item.sort, child: []});
      }
    }
  });
  return result;
};
const getAuthWithDirectory = (authorityList, directoryList, path) => {
  directoryList.forEach((item1) => {
    if (item1.child) {
      item1.child.forEach((item2) => {
        for (let i = 0; i < authorityList.length; i++) {
          if (authorityList[i]['directoryid'] == item2.id) {
            item2.child = item2.child || [];
            item2.child.push(util.deepClone(authorityList[i]));
          }
        }
      });
    }
  });
  directoryList.sort(ascOrder());
  directoryList.forEach((item) => {
    if (item.child && item.child.length > 1) {
      item.child.sort(ascOrder());
      item.child.forEach((item2) => {
        if (item2.child && item2.child.length > 1) {
          item2.child.sort(ascOrder());
        }
      });
    }
  });
  const deleteEmptyDirectory = () => {
    for (let i = 0; i < directoryList.length; i++) {
      if (directoryList[i]['child'] && directoryList[i]['child'].length) {
        for (let j = 0; j < directoryList[i]['child'].length; j++) {
          if (!directoryList[i]['child'][j]['child']) {
            directoryList[i]['child'].splice(j, 1);
          } else {
            for (let k = 0; k < directoryList[i]['child'][j]['child'].length; k++) {
              if (directoryList[i]['child'][j]['child'][k]['url'] === path) {
                directoryList[i]['child'][j]['active'] = true;
                directoryList[i]['active'] = true;
                directoryList[i]['child'][j]['child'][k]['active'] = true;
              }
            }
          }
        }
      } else {
        directoryList.splice(i, 1);
      }
    }
  };
  deleteEmptyDirectory();
  deleteEmptyDirectory();
  deleteEmptyDirectory();
  deleteEmptyDirectory();
};
module.exports = util;

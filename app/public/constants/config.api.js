let community = {
  getInfo: '/api/v1/depth', //获取币安售价信息
  getCoins: '/api/v1/exchangeInfo', //获取币种
  sendOrder: '/api/v3/order' //挂单
}

let huobiapi = {
  get_huobi_coins: '/huobi/v1/common/currencys', //获取火币支持的币种
  get_huobi_symbols: '/huobi/v1/common/symbols', //查询系统支持的所有交易对及精度
  get_huobi_uids: '/huobi/v1/account/accounts',
  get_huobi_depth: '/huobi/market/depth' //获取 Market Depth 数据
}

let apiMap = Object.assign(community, huobiapi)
export default apiMap
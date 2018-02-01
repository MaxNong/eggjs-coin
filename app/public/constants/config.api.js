let community = {
  getInfo: '/api/v1/depth', //获取币安售价信息
  getCoins: '/api/v1/exchangeInfo', //获取币种
  sendOrder: '/api/v3/order' //挂单
}

let apiMap = Object.assign(community)
export default apiMap
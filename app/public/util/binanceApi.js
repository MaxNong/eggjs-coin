/*let option = {
 url:'sendOrder',
 symbol:'LTCBTC&side=BUY&type=LIMIT&timeInForce=GTC&quantity=1&price=0.1&recvWindow=5000&timestamp=1499827319559'
 }*/
import Api from 'api'
import qs from 'qs'
const crypto = require('crypto');
const apiKey = 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A'
const secretKey = 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'
let option = {
  key: '',
  secret: '',
  recvWindow: false,
  timeout: 15000,
  disableBeautification: false,
  handleDrift: false
}

class BinanceRest {
  constructor(opt) {
    let signhash = this._signQuery(opt) //获取签名
    let options = {
      type: 'get',
      name: opt.api,
      data: Object.assign(opt.queryData, {signature: signhash})
    }
    console.log(options)
    Api(options)
  }

  _signQuery(opt) {
    const secret = qs.stringify(opt.queryData)
    return crypto.createHmac('SHA256', secretKey).update(secret).digest('hex');
  }
}
export default BinanceRest
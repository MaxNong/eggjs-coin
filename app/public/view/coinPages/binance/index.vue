<template>
  <div>
    <button @click="startLinten">开启监听</button>
    <div>
      <!--<button v-for="item in allCoins">{{item.symbol}}</button>-->
    </div>
  </div>
</template>
<script>
  import Api from 'api'
  import BinanceRest from 'binanceApi'
  export default {
    data () {
      return {
        allCoins: []
      }
    },
    created() {
//      this.getCoins()
      this.sendOrder()
    },
    methods: {
      getCoins () {
        let self = this
        let option = {
          name: 'getCoins',
          data: {},
          resolve: function (d) {
            self.allCoins = d.data.symbols
          }
        }
        Api(option)
      },
      startLinten () {
        let option = {
          name: 'getInfo',
          data: {},
          resolve: function (data) {
            console.log(data)
          }
        }
        Api(option)
      },
      //挂单
      sendOrder () {
        let option = {
          api: 'sendOrder',
          queryData: {
            symbol: 'LTCBTC',
            side: 'BUY',
            type: 'LIMIT',
            timeInForce: 'GTC',
            quantity: 1,
            price: 0.1,
            recvWindow: 5000,
            timestamp: 1499827319559
          }
        }
        new BinanceRest(option)
      }
    }
  }
</script>
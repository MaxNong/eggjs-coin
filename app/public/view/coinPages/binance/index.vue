<template>
  <div class="layout">
    <Layout>
      <Sider hide-trigger width="200px">
        <h1 style="color: #ffebcc">Binance</h1>
        <Alert type="warning">
          币种选择
          <template slot="desc">
            选择1~3个币种
          </template>
        </Alert>
        <Input v-model="handleCoin" style="margin-bottom: 10px">
        <span slot="prepend">手动输入币种</span>
        </Input>
        <Select v-model="selectVal" multiple style="width:260px">
          <Option v-for="item in allCoins" :value="item.symbol" :key="item.symbol">{{ item.symbol }}</Option>
        </Select>
      </Sider>
      <Content style="height: 100%;overflow: scroll">
        <Row>
          <Col offset="0">
          <Button @click="startLinten" type="primary">开启监听</Button>
          </Col>
        </Row>
        <Row v-for='m in coins' style="height: 400px;overflow: scroll">
          <Col>
          <h1>{{m}}</h1>
          </Col>
          <Col span="6">
          <Card>
            <p slot="title">买单</p>
            <p v-for="(item, key) in asks"><span style="width:20px;color: cornflowerblue">{{key}}</span><span style="color: black">{{item[0]}}</span><span style="color: red;margin-left: 5px">{{item[1]}}</span></p>
          </Card>
          </Col>
          <Col span="6">
          <Card dis-hover>
            <p slot="title">卖单</p>
            <p v-for="(item, key) in bids"><span style="width:20px;color: cornflowerblue">{{key}}</span><span style="color: black">{{item[0]}}</span><span style="color: red;margin-left: 5px">{{item[1]}}</span></p>
          </Card>
          </Col>
          <Col span="12">
          买一和卖一差价 <span style="color: red;margin-left: 8px">{{distance}}</span><br/>
          买单量(100单) <span style="color: red;margin-left: 8px">{{asks100}}</span><br/>
          卖单量(100单) <span style="color: red;margin-left: 8px">{{bids100}}</span><br/>
          买单量(20单) <span style="color: red;margin-left: 8px">{{asks20}}</span><br/>
          卖单量(20单) <span style="color: red;margin-left: 8px">{{bids20}}</span><br/>
          </Col>
        </Row>
      </Content>
    </Layout>
  </div>
</template>
<script>
  import Api from 'api'
  import BinanceRest from 'binanceApi'
  export default {
    data () {
      return {
        allCoins: [],
        selectVal: [], //多选框中选择币种
        handleCoin: '', //手动输入币种
        coinBox: {},
        asks: [], //买单
        bids: [], //卖单
      }
    },
    created() {
      this.getCoins()
      this.sendOrder()
    },
    computed: {
      // 选择多币种
      coins: function () {
        let selCoin = this.handleCoin == '' ? this.selectVal : this.handleCoin.split(',')
        return selCoin
      },
      //买单量100
      asks100: function () {
        let arr = []
        this.asks.forEach(i => {
          arr.push(i[1])
        })
        if (arr.length > 0) return arr.reduce((i, v) => {return parseInt(i) + parseInt(v)})
      },
      bids100: function () {
        let arr = []
        this.bids.forEach(i => {
          arr.push(i[1])
        })
        if (arr.length > 0) return arr.reduce((i, v) => {return parseInt(i) + parseInt(v)})
      },
      asks20: function () {
        let arr = []
        this.asks.forEach((i, k) => {
          if(k <= 19) arr.push(i[1])
        })
        if (arr.length > 0) return arr.reduce((i, v) => {return parseInt(i) + parseInt(v)})
      },
      bids20: function () {
        let arr = []
        this.bids.forEach((i, k) => {
          if(k <= 19) arr.push(i[1])
        })
        if (arr.length > 0) return arr.reduce((i, v) => {return parseInt(i) + parseInt(v)})
      },
      distance: function () {
        if (this.bids[0] && this.asks[0]) {
          return this.asks[0][0] - this.bids[0][0]
        }
      }
    },
    methods: {
      getCoins () {
        let self = this
        let option = {
          type: 'get',
          name: 'getCoins',
          resolve: function (d) {
            self.allCoins = d.data.symbols
          }
        }
        Api(option)
      },
      startLinten () {
        setInterval(this.getCoinInfo, 1000)
      },
      getCoinInfo () {
        let self = this
        this.coins.forEach((i, k) => {
          let option = {
            name: 'getInfo',
            type: 'get',
            data: {
              symbol: i
            },
            resolve: function (d) {
              self.asks = d.data.asks
              self.bids = d.data.bids
            }
          }
          Api(option)
        })
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
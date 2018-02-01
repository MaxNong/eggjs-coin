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
        <Row v-for="m in coins" style="height: 400px;overflow: scroll">
          <Col>
          <h1>{{m}}</h1>
          </Col>
          <Col span="4">
          <Card>
            <p slot="title">买单</p>
            <p v-if="coinBox[m]" v-for="item in coinBox[m].asks"><span style="color: black">{{item[0]}}</span><span style="color: red;margin-left: 5px">{{item[1]}}</span></p>
          </Card>
          </Col>
          <Col span="4">
          <Card dis-hover>
            <p slot="title">卖单</p>
            <p v-for="item in bids"><span style="color: black">{{item[0]}}</span><span style="color: red;margin-left: 5px">{{item[1]}}</span></p>
          </Card>
          </Col>
          <Col span="16">
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
      coins: function () {
        let selCoin = this.handleCoin == '' ? this.selectVal : this.handleCoin.split(',')
        return selCoin
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
              this.$set(this.coinBox, i, d.data)
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
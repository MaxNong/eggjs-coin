<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">火币</div>
        </Menu>
      </Header>
      <Content
        :style="{margin: '88px 20px 0', padding: '15px', overflow: 'scroll', height: '100%',background: '#fff', minHeight: '500px'}">
        <div class="coinsBox">
          <Row>
            <Col span="8">
            <h2>USDT交易区</h2>
            <Select v-model="usdtArray" filterable multiple>
              <Option v-if="item['quote-currency']=='usdt'" v-for="item in allCoins"
                      :value="item['base-currency'] + item['quote-currency']" :key="item['base-currency']">
                {{ item['base-currency'] }}{{item['quote-currency']}}
              </Option>
            </Select>
            </Col>
            <Col span="8">
            <h2>ETH交易区</h2>
            <Select v-model="ethArray" filterable multiple>
              <Option v-if="item['quote-currency']=='eth'" v-for="item in allCoins"
                      :value="item['base-currency'] + item['quote-currency']" :key="item['base-currency']">
                {{ item['base-currency'] }}{{item['quote-currency']}}
              </Option>
            </Select>
            </Col>
            <Col span="8">
            <h2>BTC交易区</h2>
            <Select v-model="btcArray" filterable multiple>
              <Option v-if="item['quote-currency']=='btc'" v-for="item in allCoins"
                      :value="item['base-currency'] + item['quote-currency']" :key="item['base-currency']">
                {{ item['base-currency'] }}{{item['quote-currency']}}
              </Option>
            </Select>
            </Col>
          </Row>
        </div>
        <Row class="margin-bottom">
          <Col span="11">
          <Card>
            <p slot="title">选择的币种</p>
            <template v-if="checkboxGroup.length>0">
              <p style="color: #18b566" v-for="item in checkboxGroup">{{item}}</p>
            </template>
            <p style="color: mediumorchid" v-else>请在USDT、ETH、BTC交易区选择监听的币种</p>
          </Card>
          </Col>
          <Col span="11" offset="2">
          <Button type="success" @click="begin">开始</Button>
          <Button type="warning" style="margin-left: 8px">停止</Button>
          </Col>
        </Row>
        <Table stripe width="100%" border :columns="columns" :data="tableData"></Table>
      </Content>
    </Layout>
  </div>
</template>
<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    text-align: center;
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    line-height: 30px;
    left: 20px;
    color: white;
  }

  .layout-nav {
    /*width: 420px;
    margin: 0 auto;
    margin-right: 20px;*/
    width: 800px;
    float: right;
  }

  .layout-footer-center {
    text-align: center;
  }

  .coinsBox {
    width: 100%;
    margin-bottom: 20px;
  }

  .margin-bottom {
    margin-bottom: 20px;
  }
</style>
<script>
  import Api from 'api'
  export default {
    data () {
      return {
        allCoins: [], //所有支持的币种
        usdtArray: [], //usdt选择的币种
        ethArray: [], //eth选择的币种
        btcArray: [], //btc选择的币种
        columns: [
          {
            title: '币种',
            key: 'coin',
            width: 200,
            fixed: 'left'
          },
          {
            title: '涨跌幅',
            key: 'changeRange',
            width: 200,
            sortable: true
          },
          {
            title: '买单量(20)',
            key: 'buyAmount',
            width: 200
          },
          {
            title: '卖单量(20)',
            key: 'sellAmount',
            width: 200
          },
          {
            title: '买单平均价格(20)',
            key: 'buyAvgPrice',
            width: 200
          },
          {
            title: '卖单平均价格(20)',
            key: 'sellAvgPrice',
            width: 200
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                }, 'View'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                }, 'Edit')
              ]);
            }
          }
        ],
        tableData: []
      }
    },
    created () {
      this.getCoins()
      this.getSymbols()
    },
    computed: {
      //选择的币种
      checkboxGroup: function () {
        return this.usdtArray.concat(this.ethArray, this.btcArray)
      }
    },
    methods: {
      getCoins: function () {
        let option = {
          name: 'get_huobi_coins',
          resolve: function (d) {
            console.log(d)
          }
        }
        Api(option)
      },
      getSymbols: function () {
        let self = this
        let option = {
          name: 'get_huobi_symbols',
          resolve: function (d) {
            console.log(d)
            self.allCoins = d.data.data
          }
        }
        Api(option)
      },
      begin: function () {
        setInterval(this.getTableData, 1000)
      },
      getTableData: function () {
        this.checkboxGroup.forEach(v => {
          let self = this
          let option = {
            data: {
              symbol: v,
              type: 'step5'
            },
            name: 'get_huobi_depth',
            resolve: function (d) {
              let asks = d.data.tick.asks //买单
              let bids = d.data.tick.bids //卖单
              let askAmount = asks.reduce((i, v) => {
                return [0, parseFloat(i[1]) + parseFloat(v[1])]
              })
              let sellAmount = bids.reduce((i, v) => {
                return [0, parseFloat(i[1]) + parseFloat(v[1])]
              })
              let askAvgPrice = asks.reduce((i, v) => {
                return [parseFloat(i[0]) + parseFloat(v[0]), 0]
              })
              let sellAvgPrice = bids.reduce((i, v) => {
                return [parseFloat(i[0]) + parseFloat(v[0]), 0]
              })
              self.tableData = []
              self.tableData.push({
                coin: v,
                changeRange: 18,
                buyAmount: askAmount[1],
                sellAmount: sellAmount[1],
                buyAvgPrice: askAvgPrice[0] / askAmount[1],
                sellAvgPrice: sellAvgPrice[0] / sellAmount[1]
              })
              console.log(d)
            }
          }
          //获取depth数据，能得到asks和bids 20
          Api(option)
        })
      }
    }
  }
</script>

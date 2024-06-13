<template>
  <div class="productInfo">
    <headers></headers>
    <div class="product1">
        <div class="product2">
            <div class="product3">
                <span style="margin-left:20px">产品详情</span>
            </div>
            <div class="productInfo1">
                <div class="productInfo2">产品名称：{{product.name}}</div>
                <div class="productInfo2">产品类型：{{product.type}}</div>
                <div class="productInfo2">登记编码：{{product.code}}</div>
                <div class="productInfo2">发行机构：{{product.company}}</div>
                <div class="productInfo2">风险等级：{{product.risk}}</div>
                <div class="productInfo2">运作模式：{{product.mode}}</div>
                <div class="productInfo2">投资性质：{{product.nature}}</div>
                <div class="productInfo2">币种：{{product.currency}}</div>
                <div class="productInfo2">产品起始日期：{{product.startTime}}</div>
                <div class="productInfo2">产品结束日期：{{product.endTime}}</div>
                <div class="productInfo2">销售区域：{{product.region}}</div>
                <div class="productInfo2" style="padding-bottom:10px">介绍：{{product.introduce}}</div>
                <div class="productInfo2" style="padding-bottom:10px">状态：{{product.state == 0?'停售':'在售'}}</div>
                <div class="productInfo2">剩余数量：{{todayNum}}</div>
                <div class="productInfo2">今日价格：{{todayPrice}}</div>
                <el-button style="margin-left:20px;margin-bottom:10px;margin-top:10px" size="small" type="primary" plain @click="toOrder()">买入</el-button>
            </div>
        </div>
    </div>
    <div class="product1" style="margin-bottom:20px">
        <div class="product2">
            <div class="product3">
                <span style="margin-left:20px">产品近期走势</span>
            </div>
            <div class="productInfo1" id="bianhua" style="height:500px">
                
            </div>
        </div>
    </div>
    <el-dialog
    title="买入"
    :visible.sync="dialogVisible"
    width="40%">
        <span>
            <el-input-number size="small" v-model="num" :min="1" label="请输入买入数量"></el-input-number>
            <div style="margin-top:20px">金额：{{todayPrice * num}}</div>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close" size="mini">取 消</el-button>
            <el-button type="primary" @click="add"  size="mini">确 定</el-button>
        </span>
    </el-dialog>
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {getUser,getSysProductById,getSysProductPriceSeven,saveSysOrder,getSysProductPriceByToday} from '../../api/api'
  import * as echarts from "echarts";
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        todayNum: "",
        todayPrice: "",
        id: "",
        num: "1",
        price: "",
        myChart: null,
        dialogVisible: false,
        product: {},
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      getSysProductPriceByToday() {
        getSysProductPriceByToday().then(res => {
          if (res.code == 1000) {
            this.todayNum = res.data.num
            this.todayPrice = res.data.price
          }
        })
      },
      close() {
        this.num = "1"
        this.price = ""
        this.dialogVisible = false
      },
      add() {
        if(!this.num) {
            this.$message({
                message: '请输入交易数量',
                type: 'warning'
            });
            return;
        }
        var param = {
          productId: this.id,
          price: this.todayPrice * this.num,
          num: this.num,
          endPrice: this.todayPrice * this.num,
          name: this.product.name,
          type: this.product.type,
          code: this.product.code,
          company: this.product.company,
          risk: this.product.risk,
          mode: this.product.mode,
          nature: this.product.nature,
          currency: this.product.currency,
        }
        saveSysOrder(param).then(res => {
          if (res.code == 1000) {
            this.$message({
              message: '交易成功',
              type: 'success'
            });
            this.getSysProductPriceByToday()
            this.getUserInfo()
            this.close()
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            });
          }
        })
      },
      getSysProductById() {
        getSysProductById({id:this.id}).then(res => {
          if (res.code == 1000) {
            this.product = res.data
          }
        }) 
      },
      toOrder() {
          if (this.todayPrice == '未公布') {
            this.$message({
                message: '当日价格暂未公布，暂无法交易',
                type: 'warning'
            });
            return;
          }
          this.dialogVisible = true
      },
      init() {
          getSysProductPriceSeven({id: this.id}).then(res => {
            if (res.code == 1000) {
              this.myChart = echarts.init(document.getElementById("bianhua"))
              var option = {
                  tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                          type: 'cross',
                          label: {
                              backgroundColor: '#6a7985'
                          }
                      }
                  },
                  xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data: res.data.dateList
                  },
                  yAxis: {
                      type: 'value'
                  },
                  series: [
                      {
                      data: res.data.price,
                      type: 'line',
                      areaStyle: {}
                      }
                  ]
              };
              this.myChart.setOption(option);
            }
          })
      },
      getUserInfo() {
          getUser().then(res => {
              if(res.code == 1000) {
                  this.user = res.data
                  window.localStorage.setItem("user_info",JSON.stringify(res.data))
              } else {
                  this.$notify.error({
                      title: '错误',
                      message: res.message
                  });
              }
          })
      },
    },
    created() {
        
    },
    mounted() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
      this.id = this.$route.query.id
      this.getSysProductPriceByToday()
      this.getSysProductById()
      this.init()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/productInfo.css');
</style>
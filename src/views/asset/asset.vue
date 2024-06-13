<template>
  <div class="asset">
    <headers></headers>
    <div class="product1">
        <div class="product2">
            <div class="product3">
                <span style="margin-left:20px">资产统计</span>
            </div>
            <div class="product4 asset3" style="height:300px">
                <div class="asset4" id="asset4">

                </div>
                <div class="asset4 asset5" id="asset4">
                    <div class="asset6">总资产：{{totalPrice}}</div>
                    <div class="asset6">今日资产盈亏：{{phase}}<i v-if="phase < 0" style="color:red" class="el-icon-bottom"></i><i v-if="phase > 0" style="color:green" class="el-icon-top"></i></div>
                    <el-button size="mini" type="primary" plain @click="toPhase">盈亏统计</el-button>
                </div>
            </div>
        </div>
    </div>
    <div class="product1">
        <div class="product2">
            <div class="product3">
                <span style="margin-left:20px">资产筛选</span>
            </div>
            <div class="product4">
                <div style="margin-left:20px;margin-right:10px">
                    产品编码：
                    <el-input style="margin-top:20px;width:220px" size="small" v-model="code" placeholder="请输入产品编码"></el-input>
                </div>
                <div style="margin-left:20px;margin-right:10px">
                    产品：
                    <el-input style="margin-top:20px;width:220px" size="small" v-model="name" placeholder="请输入产品名称"></el-input>
                </div>
                <div style="margin-left:20px;margin-right:10px">
                    发行机构：
                    <el-input style="margin-top:20px;width:220px" size="small" v-model="company" placeholder="请输入发行机构"></el-input>
                </div>
                <div style="margin-left:20px;margin-right:10px">
                    产品类型：
                    <el-select style="margin-top:20px;width:220px" size="small" v-model="type" placeholder="请选择产品类型">
                        <el-option
                        label="基金"
                        value="基金">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:18px;margin-right:10px;width:29%;margin-bottom:20px">
                    <el-button style="margin-top:20px" size="small" type="primary" plain @click="search">搜索</el-button>
                    <el-button style="margin-top:20px" size="small" type="warning" plain @click="refresh">重置</el-button></el-button>
                </div>
            </div>
        </div>
    </div>
    <div class="asset7">
        <div class="asset8">
            <div class="asset9" v-for="(item,index) in tableData" :key="index" @click="toPhaseOrder(item.id)">
                <div class="asset10">
                    {{item.name}}
                </div>
                <div class="asset11">
                    <div>登记编码：{{item.code}}</div>
                    <div>发行机构：{{item.company}}</div>
                    <div>运作模式：{{item.mode}}</div>
                    <div>买入金额：{{item.price}}</div>
                    <div>现有金额：{{item.endPrice}}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="index18">
        <el-pagination
        style="margin-bottom:40px"
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="total">
        </el-pagination>
    </div>
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {getUserMoney,getSysOrderPage} from '../../api/api'
  import * as echarts from "echarts";
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        user: {},
        code: "",
        name: "",
        company: "",
        type: "",
        pageSize: 10,
        pageNumber: 1,
        total: 100,
        tableData: [],
        myChart: null,
        totalPrice: "",
        phase: "",
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      toPhaseOrder(id) {
        this.$router.push("/phase?id="+ id)
      },
      search() {
          this.pageNumber = 1
          this.getSysOrderPage()
      },
      refresh() {
        this.code = ""
        this.name = ""
        this.company = ""
        this.type = ""
        this.pageSize = 10
        this.pageNumber = 1
        this.getSysOrderPage()
      },
      getSysOrderPage() {
          var param = {
              pageNumber: this.pageNumber,
              pageSize: this.pageSize,
              code: this.code,
              name: this.name,
              company: this.company,
              type: this.type,
              userId: this.user.id,
              state: 0,
          }
          getSysOrderPage(param).then(res => {
            if(res.code == 1000) {
                this.tableData = res.data.records
                this.total = res.data.total
            }
          })
      },
      toPhase() {
          this.$router.push("/phase")
      },
      init() {
        getUserMoney().then(res => {
            if (res.code == 1000) {
                this.totalPrice = res.data.price
                this.phase = res.data.phase
                this.myChart = echarts.init(document.getElementById("asset4"))
                var option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    series: [
                        {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: true,
                            fontSize: 15,
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: res.data.list
                        }
                    ]
                };
                this.myChart.setOption(option);
            }
        }) 
      },
      handleCurrentChange(val) {
        this.pageNumber = val
        this.getSysOrderPage()
      },
    },
    created() {
     
    },
    mounted() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
      this.user = JSON.parse(window.localStorage.getItem("user_info"))
      this.init()
      this.getSysOrderPage()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/asset.css');
</style>
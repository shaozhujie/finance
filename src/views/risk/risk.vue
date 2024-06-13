<template>
  <div class="risk">
    <headers></headers>
    <div class="product1">
        <div class="product2">
            <div class="product3">
                <span style="margin-left:20px">风险评估</span>
            </div>
            <div class="product4 asset3" style="height:300px">
                <div class="asset4" id="asset4">

                </div>
                <div class="asset4 asset5" id="asset4">
                    <div class="asset6">风险指数：{{num}}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="product1">
        <div class="product2">
            <div class="product3">
                <span style="margin-left:20px">风险管控提醒</span>
            </div>
            <div class="product4 asset3" style="height:300px">
                <el-input style="margin-left:20px;margin-right:20px" type="number" size="small" v-model="limen" placeholder="设置资产阈值，当资产低于阈值将为您发送邮件通知"></el-input>
                <el-button size="small" style="margin-left:20px" type="primary" plain @click="save">保存</el-button>
            </div>
        </div>
    </div>
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {getSysRisk,editUser} from '../../api/api'
  import * as echarts from "echarts";
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        user: {},
        myChart: null,
        limen: "",
        num: "",
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      save() {
        if (!this.limen) {
          this.$message({
            message: '请输入资产阈值',
            type: 'warning'
          });
          return
        }
        var param = {
          id: this.user.id,
          limen: this.limen
        }
        editUser(param).then(res => {
          if (res.code == 1000) {
            this.$message({
                message: '操作成功',
                type: 'success'
            });
            this.limen = ""
          }
        })
      },
      init() {
        getSysRisk().then(res => {
          if (res.code == 1000) {
            this.num = res.data.num
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
                        fontSize: 40,
                        fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: res.data.listMaps
                    }
                ]
            };
            this.myChart.setOption(option);
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
      this.user = JSON.parse(window.localStorage.getItem("user_info"))
      this.init()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/risk.css');
</style>
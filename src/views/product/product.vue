<template>
  <div class="product">
    <headers></headers>
    <div class="product1">
        <div class="product2">
            <div class="product3">
                <span style="margin-left:20px">产品筛选</span>
            </div>
            <div class="product4">
                <div style="margin-left:20px;margin-right:10px">
                    产品编码：
                    <el-input style="margin-top:20px;width:220px" size="small" v-model="form.code" placeholder="请输入产品编码"></el-input>
                </div>
                <div style="margin-left:20px;margin-right:10px">
                    产品：
                    <el-input style="margin-top:20px;width:220px" size="small" v-model="form.name" placeholder="请输入产品名称"></el-input>
                </div>
                <div style="margin-left:20px;margin-right:10px">
                    发行机构：
                    <el-input style="margin-top:20px;width:220px" size="small" v-model="form.company" placeholder="请输入发行机构"></el-input>
                </div>
                <div style="margin-left:20px;margin-right:10px">
                    产品类型：
                    <el-select size="small" style="margin-top:20px;width:220px" v-model="form.type" placeholder="请选择类型">
                        <el-option
                        v-for="(item,index) in type"
                        :key="index"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:20px;margin-right:10px">
                    币种：
                    <el-select style="margin-top:20px;width:220px" size="small" v-model="form.currency" placeholder="请选择币种">
                        <el-option
                        v-for="(item,index) in currency"
                        :key="index"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:20px;margin-right:10px">
                    运作模式：
                    <el-select style="margin-top:20px;width:220px" size="small" v-model="form.mode" placeholder="请选择运作模式">
                        <el-option
                        v-for="(item,index) in mode"
                        :key="index"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:20px;margin-right:10px;margin-bottom:20px">
                    投资性质：
                    <el-select style="margin-top:20px;width:220px" size="small" v-model="form.nature" placeholder="请选择性质">
                        <el-option
                        v-for="(item,index) in nature"
                        :key="index"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin-left:20px;margin-right:10px;margin-bottom:20px">
                    风险：
                    <el-select style="margin-top:20px;width:220px" size="small" v-model="form.risk" placeholder="请选择风险">
                        <el-option
                        v-for="(item,index) in risk"
                        :key="index"
                        :label="item.name"
                        :value="item.name">
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
    <div class="product5">
      <div class="index10">
        <div class="index11" v-for="(item,index) in tableData" :key="index" style="margin-top:20px">
          <div class="index12">
              <div class="index14">{{item.name}}</div>
          </div>
          <div class="index13">
            <div class="index15">登记编码：{{item.code}}</div>
            <div class="index15">发行机构：{{item.company}}</div>
            <div class="index15">风险等级：{{item.risk}}</div>
            <div class="index15">运作模式：{{item.mode}}</div>
            <div class="index15">投资性质：{{item.nature}}</div>
            <div class="index15">币种：{{item.currency}}</div>
            <div class="index15">产品起始日期：{{item.startTime}}</div>
            <div class="index15">产品结束日期：{{item.endTime}}</div>
            <div class="index16">
              <div class="index17"  @click="toInfo(item.id)">
                查看详情
              </div>
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
    </div>
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {getSysProductPage,getSysProductTypeList,getSysCurrencyList,getSysModeList,getSysNatureList,getSysRiskList} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        type: [],
        currency: [],
        mode: [],
        nature: [],
        risk: [],
        form: {
          name: "",
          type: "",
          code: "",
          company: "",
          risk: "",
          mode: "",
          nature: "",
          currency: "",
          startTime: "",
          endTime: "",
          region: "",
          introduce: "",
          rate: "",
          price: "",
          num: "",
          state: 1,
          remark: "",
          pageSize: 9,
          pageNumber: 1,
        },
        total: 100,
        tableData: [],
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      refresh() {
        this.form = {
          name: "",
          type: "",
          code: "",
          company: "",
          risk: "",
          mode: "",
          nature: "",
          currency: "",
          startTime: "",
          endTime: "",
          region: "",
          introduce: "",
          rate: "",
          price: "",
          num: "",
          state: 1,
          remark: "",
          pageSize: 9,
          pageNumber: 1,
        }
        this.getSysProductPage()
      },
      toInfo(id) {
        this.$router.push("/productInfo?id=" + id)
      },
      handleCurrentChange(val) {
        this.form.pageNumber = val
        this.getSysProductPage()
      },
      getSysProductTypeList() {
          getSysProductTypeList().then(res => {
              if (res.code == 1000) {
                  this.type = res.data
              }
          })
      },
      getSysCurrencyList() {
          getSysCurrencyList().then(res => {
              if (res.code == 1000) {
                  this.currency = res.data
              }
          })
      },
      getSysModeList() {
          getSysModeList().then(res => {
              if (res.code == 1000) {
                  this.mode = res.data
              }
          })
      },
      getSysNatureList() {
          getSysNatureList().then(res => {
              if (res.code == 1000) {
                  this.nature = res.data
              }
          })
      },
      getSysRiskList() {
          getSysRiskList().then(res => {
              if (res.code == 1000) {
                  this.risk = res.data
              }
          })
      },
      getSysProductPage() {
        getSysProductPage(this.form).then(res => {
          if(res.code == 1000) {
            this.tableData = res.data.records
            this.total = res.data.total
          }
        })
      },
      search() {
        this.form.pageNumber = 1
        this.getSysProductPage()
      }
    },
    created() {
     
    },
    mounted() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
      this.getSysProductTypeList()
      this.getSysCurrencyList()
      this.getSysModeList()
      this.getSysNatureList()
      this.getSysRiskList()
      this.getSysProductPage()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/product.css');
</style>
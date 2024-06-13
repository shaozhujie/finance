<template>
  <div class="record">
    <headers></headers>
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
                    状态：
                    <el-select style="margin-top:20px;width:220px" size="small" v-model="state" placeholder="请选择状态">
                        <el-option
                        label="持有"
                        value="0">
                        </el-option>
                        <el-option
                        label="赎回"
                        value="1">
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
    <div class="record1" style="margin-top:20px">
        <div class="record2">
            <div class="product3">
                <span style="margin-left:20px">交易记录</span>
            </div>
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column
                    prop="name"
                    label="产品">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="交易时间">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="买入金额">
                </el-table-column>
                <el-table-column
                    prop="endPrice"
                    label="现存金额">
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="状态">
                  <template slot-scope="scope">
                      <el-tag v-if="scope.row.state == 0">持有</el-tag>
                      <el-tag v-if="scope.row.state == 1" type="warning">赎回</el-tag>
                  </template>
                  >
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="250"
                  >
                  <template slot-scope="scope">
                    <el-button size="mini" v-if="scope.row.state == 0" type="success" @click="redemption(scope.row.id)">赎回</el-button>
                    <el-button size="mini" type="success" @click="toPhaseOrder(scope.row.id)">查看记录</el-button>
                  </template>
                </el-table-column>
            </el-table>
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
  import {getSysOrderPage,redemption,getUser} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        user: {},
        code: "",
        name: "",
        company: "",
        pageSize: 10,
        pageNumber: 1,
        total: 100,
        state: "",
        tableData: [],
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      redemption(id) {
        redemption({id: id}).then(res => {
          if (res.code == 1000) {
              this.$message({
                  message: '赎回成功',
                  type: 'success'
              });
              this.getUserInfo()
              this.getSysOrderPage()
          } else {
              this.$message({
                  message: '赎回失败',
                  type: 'warning'
              });
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
      toPhaseOrder(id) {
        this.$router.push("/phase?id="+ id)
      },
      search() {
        this.pageNumber = 1
        this.getSysOrderPage()
      },
      refresh() {
        this.code = "",
        this.name = "",
        this.company = "",
        this.state = ""
      },
      handleCurrentChange(val) {
        this.pageNumber = val
        this.getSysOrderPage()
      },
      getSysOrderPage() {
        var param = {
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
          code: this.code,
          name: this.name,
          company: this.company,
          state: this.state,
          userId: this.user.id
        }
        getSysOrderPage(param).then(res => {
          if(res.code == 1000) {
            this.tableData = res.data.records
            this.total = res.data.total
          }
        })
      }
    },
    created() {
     
    },
    mounted() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
      this.user = JSON.parse(window.localStorage.getItem("user_info"))
      this.getSysOrderPage()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/record.css');
</style>
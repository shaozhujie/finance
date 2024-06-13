<template>
  <div class="phase">
    <headers></headers>
    <div class="asset7">
        <div class="asset8">
            <div class="asset9" v-for="(item,index) in tableData" :key="index">
                <div class="asset10">
                    {{item.name}}
                </div>
                <div class="asset11">
                    <div>交易单号: {{item.orderId}}</div>
                    <div>登记编码：{{item.code}}</div>
                    <div>发行机构：{{item.company}}</div>
                    <div>日期：{{item.time}}</div>
                    <div>盈亏金额：{{item.money}}<i v-if="item.money < 0" style="color:red" class="el-icon-bottom"></i><i v-if="item.money > 0" style="color:green" class="el-icon-top"></i></div>
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
  import {getSysPhasePage} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        user: {},
        pageSize: 9,
        pageNumber: 1,
        total: 100,
        orderId: "",
        tableData: [],
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      getSysPhasePage() {
        var param = {
          userId: this.user.id,
          orderId: this.orderId,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }
        getSysPhasePage(param).then(res => {
          if(res.code == 1000) {
            this.tableData = res.data.records
            this.total = res.data.total
          }
        })
      },
      handleCurrentChange(val) {
        this.pageNumber = val
        this.getSysPhasePage()
      },
    },
    created() {
     
    },
    mounted() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
      if (this.$route.query.id) {
        this.orderId = this.$route.query.id
      }
      this.user = JSON.parse(window.localStorage.getItem("user_info"))
      this.getSysPhasePage()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/phase.css');
</style>
<template>
  <div class="message">
    <headers></headers>
    <div class="message1">
        <div class="message2" v-for="(item,index) in tableData" :key="index">
            <span style="margin-left:20px">{{index + 1}}.{{item.content}}</span>
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
  import {getSysNewsPage} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        user: {},
        pageSize: 10,
        pageNumber: 1,
        total: 100,
        tableData: [],
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      handleCurrentChange(val) {
        this.pageNumber = val
        this.getSysNewsPage()
      },
      getSysNewsPage() {
        var param = {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          userId: this.user.id
        }
        getSysNewsPage(param).then(res => {
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
      this.getSysNewsPage()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/message.css');
</style>
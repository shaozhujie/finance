<template>
  <div class="header">
    <div class="header1">
        <img src="../assets/image/logo.png">
    </div>
    <div class="header2">
        <div class="header3">
            <div @click="toPage('index')" :class="$route.path == '/'?'active':''" class="menu-item">首页</div>
            <div @click="toPage('product')" :class="$route.path == '/product'?'active':''" class="menu-item">产品</div>
            <div @click="toPage('asset')" :class="$route.path == '/asset'?'active':''" class="menu-item">我的资产</div>
            <div @click="toPage('record')" :class="$route.path == '/record'?'active':''" class="menu-item">交易记录</div>
            <div @click="toPage('risk')" :class="$route.path == '/risk'?'active':''" class="menu-item">风险评估</div>
            <div @click="toPage('message')" :class="$route.path == '/message'?'active':''" class="menu-item" style="display:flex">消息通知<div v-if="count > 0" style="margin-left:4px;background-color:red;width:10px;height:10px;border-radius:50%"> </div></div>
            <div @click="toPage('account')" :class="$route.path == '/account'?'active':''" class="menu-item">账户</div>
            <div @click="toPage('manage')" :class="$route.path == '/manage'?'active':''" class="menu-item">后台管理</div>
        </div>
        <div class="header4">
            <img @click="toCenter" style="border-radius:50%;width:40px;height:40px" :src="$store.state.HOST + user.avatar">
            <div style="margin-left:15px">{{user.userName}}</div>
            <div class="header5" @click="loginOut">
                退出
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import {getUserNews,setUserNews} from '../api/api'
  export default {
    data() {
      return{
        user: {},
        count: 0,
      }
    },
    methods: {
      getUserNews() {
        getUserNews().then(res => {
          if (res.code == 1000) {
            this.count = res.data.count
          }
        })
      },
      toCenter() {
        this.$router.push("/center")
      },
      toPage(name) {
        if (name == "index") {
          this.$router.push("/")
        } else if (name == "product") {
          this.$router.push("/product")
        } else if (name == "asset") {
          this.$router.push("/asset")
        } else if (name == "record") {
          this.$router.push("/record")
        } else if (name == "risk") {
          this.$router.push("/risk")
        } else if (name == "message") {
          setUserNews().then(res => {
            if (res.code == 1000) {
              this.getUserNews()
            }
          })
          this.$router.push("/message")
        } else if (name == "manage") {
          window.open("http://localhost:3000")
        } else if (name == "account") {
          this.$router.push("/account")
        } 
      },
      loginOut() {
        this.$store.dispatch('logout').then(() => {
          window.localStorage.removeItem("user_info")
          window.localStorage.removeItem("user_token")
          this.$message({
              message: '退出成功',
              type: 'success'
          });
          setTimeout(function(){
              window.location.reload()
          },1000)
        })
      }
    },
    created() {
     
    },
    mounted() {
      this.user = JSON.parse(window.localStorage.getItem("user_info"))
      this.getUserNews()
    }
 }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header1 {
      width: 40%;
      display: flex;
      justify-content: center;
  }
  .header2 {
      width: 60%;
      display: flex;
      justify-content: space-between;
  }
  .header3 {
      display: flex;
      align-items: center;
  }
  .menu-item {
    font-size: 14px;
    margin-left: 30px;
    cursor: pointer;
    font-weight: bold;
  }
  .active {
    color: #0088FF;
  }
  .header4 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header5 {
      width: 70px;
      height: 30px;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      background-color: #0088FF;
      margin-left: 20px;
      margin-right: 50px;
      cursor: pointer;
  }
</style>
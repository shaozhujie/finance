<template>
  <div class="bottom">
    <img src="../assets/image/footer-logo.png">
    <div class="bottom1">"实现财务自由,与我们一起规划你的未来!"</div>
    <div class="bottom2">
      <div @click="toPage('index')"  class="menu-item">首页</div>
      <div @click="toPage('product')" class="menu-item">产品</div>
      <div @click="toPage('asset')"  class="menu-item">我的资产</div>
      <div @click="toPage('record')"  class="menu-item">交易记录</div>
      <div @click="toPage('risk')"  class="menu-item">风险评估</div>
      <div @click="toPage('message')"  class="menu-item">消息通知</div>
      <div @click="toPage('account')"  class="menu-item">账户</div>
      <div @click="toPage('manage')"  class="menu-item">后台管理</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        
      }
    },
    methods: {
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
          this.$router.push("/message")
        } else if (name == "manage") {
          window.open("http://localhost:3000")
        } else if (name == "account") {
          this.$router.push("/account")
        } 
      },
    },
    created() {
     
    },
    mounted() {
      
    }
 }
</script>

<style scoped>
  .bottom {
      width: 100%;
      height: 350px;
      background-color: #000050;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  .bottom1 {
      margin-top: 30px;
      font-size: 25px;
      font-weight: bold;
      color: #ffffff;
  }
  .bottom2 {
      margin-top: 30px;
      width: 40%;
      display: flex;
      justify-content: center;
  }
  .menu-item {
    font-size: 14px;
    margin-left: 30px;
    cursor: pointer;
    font-weight: bold;
    color: #ffffff;
  }
</style>
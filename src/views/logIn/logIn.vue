<template>
  <div class="login">
     <div class="login1">
         <img src="../../assets/image/logo.png">
         <div class="login3">欢迎使用金融投资管理系统</div>
         <el-input prefix-icon="el-icon-user" style="width:500px;margin-top:40px" v-model="loginAccount" placeholder="请输入用户账号"></el-input>
         <el-input prefix-icon="el-icon-s-platform" type="password" style="width:500px;margin-top:20px" v-model="password" placeholder="请输入密码"></el-input>
         <div class="login4" @click="toForget">
             忘记密码？
         </div>
         <div class="login5" @click="login">
             登 录
         </div>
         <div class="login5" @click="toRegister">
             注 册
         </div>
     </div>
     <div class="login2">
         <img style="width:95%;height:95%" src="../../assets/image/0fde3d3d1148bdbcb2e7d727fd5b28d0.png">
     </div>
  </div>
</template>

<script>
  import {login,getUser} from '../../api/api'
  export default {
    data() {
      return{
        loginAccount: "",
        password: "",
      }
    },
    methods: {
        toRegister() {
          this.$router.push("/register")
        },
        toForget() {
          this.$router.push("/forget")
        },
        login() {
            if(!this.loginAccount) {
                this.$message({
                    message: '请输入用户名',
                    type: 'warning'
                });
                return;
            }
            if(!this.password) {
                this.$message({
                    message: '请输入密码',
                    type: 'warning'
                });
                return;
            }
            var params = {
                username: this.loginAccount,
                password: this.password
            }
            login(params).then(res => {
                if(res.code == 1000) {
                    this.$message({
                        message: '登陆成功',
                        type: 'success'
                    });
                    var that = this
                    var token = res.data.token
                    window.localStorage.setItem("user_token",token)
                    this.getUserInfo()
                    setTimeout(function() {
                        that.$router.push("/")
                    },500)
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        getUserInfo() {
            getUser().then(res => {
                if(res.code == 1000) {
                    window.localStorage.setItem("user_info",JSON.stringify(res.data))
                }
            })
        },
    },
    created() {
     
    },
    mounted() {
      
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/login.css');
</style>
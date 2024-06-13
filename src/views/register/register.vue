<template>
  <div class="login">
     <div class="login1">
         <img src="../../assets/image/logo.png">
         <div class="login3">欢迎使用金融投资管理系统</div>
         <el-input style="margin-top:20px;width:500px" v-model="loginAccount" placeholder="请输入登录账号"></el-input>
         <el-input style="margin-top:20px;width:500px" v-model="password" type="password" placeholder="请输入登录密码"></el-input>
         <el-input style="margin-top:20px;width:500px" v-model="userName" placeholder="请输入用户名"></el-input>
         <el-input style="margin-top:20px;width:500px" v-model="email" placeholder="请输入邮箱"></el-input>
         <el-input style="margin-top:20px;width:500px" v-model="tel" placeholder="请输入联系方式"></el-input>
         <div class="login4" @click="toLogin">
             已有账号，前往登录！
         </div>
         <div class="login5" @click="saveUser">
             注 册
         </div>
     </div>
     <div class="login2">
         <img style="width:95%;height:95%" src="../../assets/image/0fde3d3d1148bdbcb2e7d727fd5b28d0.png">
     </div>
  </div>
</template>

<script>
  import {saveUser} from '../../api/api'
  export default {
    data() {
      return{
        loginAccount: "",
        password: "",
        userName: "",
        type: "1",
        email: "",
        tel: "",
      }
    },
    methods: {
        toLogin() {
            this.$router.push("/login")
        },
        saveUser() {
            if(!this.loginAccount) {
                this.$message({
                    message: '请输入登录账号',
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
            if(!this.userName) {
                this.$message({
                    message: '请输入用户名',
                    type: 'warning'
                });
                return;
            }
            if(!this.email) {
              this.$message({
                  message: '请输入邮箱',
                  type: 'warning'
              });
              return;
          }
            var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 邮箱正则表达式
            if (!regex.test(this.email)) {
                this.$message({
                    message: '请输入正确的邮箱格式',
                    type: 'warning'
                });
                return;
            }
            if(!this.tel) {
                this.$message({
                    message: '请输入联系方式',
                    type: 'warning'
                });
                return;
            }
            var param = {
                loginAccount: this.loginAccount,
                password: this.password,
                userName: this.userName,
                userType: this.type,
                email: this.email,
                tel: this.tel,
            }
            saveUser(param).then(res => {
                if (res.code == 1000) {
                    this.$message({
                        message: '注册成功，即将为您跳转到登录页面',
                        type: 'success'
                    });
                    var that = this
                    setTimeout(function() {
                        that.$router.push("/login")
                    },500)
                } else {
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    });
                }
            })
        }
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
<template>
  <div class="account">
    <headers></headers>
    <div class="product1" style="margin-bottom:20px">
        <div class="product2">
            <div class="product3">
                <span style="margin-left:20px">账户信息</span>
            </div>
            <div class="product4">
                <div class="account1">
                    账户余额：{{user.account}}
                </div>
                <div class="account1">
                    <el-button size="small" type="primary" plain @click="chongzhi">充值</el-button>
                    <el-button size="small" type="success" plain @click="tixian">提现</el-button>
                </div>
            </div>
        </div>
    </div>
    <el-dialog
    title="提现"
    :visible.sync="dialogVisible"
    width="30%"
    >
        <span>
            <el-input size="small" type="number" v-model="price" placeholder="请输入提现金额"></el-input>
            <el-input style="margin-top:10px" size="small" type="text" v-model="card" placeholder="请输入提现卡号"></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="cancel">取 消</el-button>
            <el-button size="small" type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
    title="充值"
    :visible.sync="dialogVisible1"
    width="30%"
    >
        <span>
            <el-input size="small" type="number" v-model="price" placeholder="请输入充值金额"></el-input>
            <img style="width:300px;height:300px" src="../../assets/image/zhifubao.jpg">
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="cancel1">取 消</el-button>
            <el-button size="small" type="primary" @click="submit1">确 定</el-button>
        </span>
    </el-dialog>
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {saveSysWith,editUser,addCount,getUser} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        user: {},
        dialogVisible: false,
        dialogVisible1: false,
        price: "",
        card: "",
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
        chongzhi() {
            this.dialogVisible1 = true
        },
        tixian() {
            this.dialogVisible = true
        },
        cancel() {
            this.price = ""
            this.card = ""
            this.dialogVisible1 = false
            this.dialogVisible = false
        },
        submit() {
            if(!this.price) {
                this.$message({
                    message: '请输入提现金额',
                    type: 'warning'
                });
                return;
            }
            if(!this.card) {
                this.$message({
                    message: '请输入提现卡号',
                    type: 'warning'
                });
                return;
            }
            var param = {
                price: this.price,
                card: this.card,
            }
            saveSysWith(param).then(res => {
                if (res.code == 1000) {
                    this.$message({
                        message: '提现成功，请等待打款到账',
                        type: 'success'
                    });
                    this.getUserInfo()
                    this.cancel()
                }
            })
        },
        submit1() {
            if(!this.price) {
                this.$message({
                    message: '请输入充值金额',
                    type: 'warning'
                });
                return;
            }
            addCount({price: this.price}).then(res => {
                if (res.code == 1000) {
                    this.$message({
                        message: '充值成功',
                        type: 'success'
                    });
                    this.getUserInfo()
                    this.cancel()
                } else {
                    this.$message({
                        message: '充值失败',
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
    },
    created() {
     
    },
    mounted() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
      this.user = JSON.parse(window.localStorage.getItem("user_info"))
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/account.css');
</style>
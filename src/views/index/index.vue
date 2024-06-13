<template>
  <div class="index">
    <headers></headers>
    <div class="index1">
      <div class="index2">
        <div class="index3">打造金融品牌,提升行业文明,共建和谐金融</div>
        <div class="index3">开拓新价值,创造心(新)未来。</div>
        <div class="index4">Build a financial brand, enhance industry civilization, and build a harmonious financial</div>
        <div class="index4" style="margin-top:3px">Develop new value, create heart (new) future.</div>
        <div class="index5">
          <div class="index6" @click="toProduct">
            投资产品
          </div>
          <div class="index7" @click="toCenter">
            个人中心
          </div>
        </div>
      </div>
    </div>
    <div class="index8">
      <div class="index9">
        金融产品
      </div>
      <div class="index10">
        <div class="index11" v-for="(item,index) in product" :key="index">
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
              <div class="index17" @click="toInfo(item.id)">
                查看详情
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="index18">
        <el-button type="success" @click="toProduct" icon="el-icon-right" circle></el-button>
      </div>
    </div>
    <div class="index19">
      <div class="index20">
        <div class="index21">
          <div class="index22">
            <i style="font-size:40px;color:#ffffff" class="el-icon-date"></i>
          </div>
          <div class="index23">用户数量：{{shuju.user}}+</div>
        </div>
        <div class="index21">
          <div class="index22">
            <i style="font-size:40px;color:#ffffff" class="el-icon-goods"></i>
          </div>
          <div class="index23">产品数量：{{shuju.product}}+</div>
        </div>
        <div class="index21">
          <div class="index22">
            <i style="font-size:40px;color:#ffffff" class="el-icon-data-line"></i>
          </div>
          <div class="index23">交易次数：{{shuju.order}}+</div>
        </div>
        <div class="index21">
          <div class="index22">
            <i style="font-size:40px;color:#ffffff" class="el-icon-monitor"></i>
          </div>
          <div class="index23">产品种类：{{shuju.type}}+</div>
        </div>
      </div>
    </div>
    <bottoms></bottoms>
  </div>
</template>

<script>
  import {getSysProductThree,getIndexData} from '../../api/api'
  import headers from '@/components/header'
  import bottoms from '@/components/bottom'
  export default {
    data() {
      return{
        product: [],
        shuju: {},
      }
    },
    components: {
      headers,
      bottoms
    },
    methods: {
      getIndexData() {
        getIndexData().then(res => {
          if (res.code == 1000) {
            this.shuju = res.data
          }
        })
      },
      getSysProductThree() {
        getSysProductThree().then(res => {
          if (res.code == 1000) {
            this.product = res.data
          }
        })
      },
      toInfo(id) {
        this.$router.push("/productInfo?id=" + id)
      },
      toProduct() {
        this.$router.push("/product")
      },
      toCenter() {
        this.$router.push("/center")
      }
    },
    created() {
     
    },
    mounted() {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
      this.getSysProductThree()
      this.getIndexData()
    }
 }
</script>

<style scoped>
  @import url('../../assets/css/index.css');
</style>
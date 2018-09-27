<template>
  <section id="homeIndex">
    <!-- 数据展示 -->
    <div class="dataShow">
      <div style="background:linear-gradient(to right,#2299E3,#24C6F3)">
        <div>总订单数</div>
        <div style="font-size:40px; margin-top:25px;"><ICountUp :endVal="totalOrder"/></div>
        <div style="border-top:1px solid #fff; margin-top:20px;"></div>
        <div style="margin-top:5px;">(个)</div>
      </div>
      <div style="background:linear-gradient(to right,#EDAA24,#F4D631)">
        <div>已通过订单数</div>
        <div style="font-size:40px; margin-top:25px;"><ICountUp :endVal="totalOrderPass"/></div>
        <div style="border-top:1px solid #fff; margin-top:20px;"></div>
        <div style="margin-top:5px;">(个)</div>
      </div>
      <div style="background:linear-gradient(to right,#13C7D5,#22E5C5)">
        <div>总贷款金额</div>
        <div style="font-size:40px; margin-top:25px;"><ICountUp :endVal="totalAmount"/></div>
        <div style="border-top:1px solid #fff; margin-top:20px;"></div>
        <div style="margin-top:5px;">(元)</div>
      </div>
      <div style="background:linear-gradient(to right,#F17E62,#FFA964)">
        <div>已通过贷款金额</div>
        <div style="font-size:40px; margin-top:25px;"><ICountUp :endVal="totalAmountPass"/></div>
        <div style="border-top:1px solid #fff; margin-top:20px;"></div>
        <div style="margin-top:5px;">(元)</div>
      </div>
    </div>
    <!-- 日期查询 -->
    <div class="dateQuery">
      <span>开始时间</span>
      <Datepicker style="margin-left:10px;" input-class="datepicker-input" v-model="search_start" @input="getData" />
      <span style="margin-left:50px;">结束时间</span>
      <Datepicker style="margin-left:10px;" input-class="datepicker-input" v-model="search_end" @input="getData" />
    </div>
  </section>
</template>
<script>
import api from '@/api'
import util from '@/util'
import constant from '@/util/constant'
import Datepicker from '@/components/Datepicker.vue'
import ICountUp from 'vue-countup-v2'

export default {
  name: "homeIndex",
  data: function () {
    return {
      totalOrder: 0,
      totalOrderPass: 0,
      totalAmount: 0,
      totalAmountPass: 0,
      search_start: util.dateToString(constant.A_MONTH_BEFORE),
      search_end: util.dateToString(constant.NOW),
    }
  },
  components: {
    Datepicker,
    ICountUp
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    getData () {
      return api.homeInfo({
        search_start: this.search_start,
        search_end: this.search_end
      })
      .then(({ app_cnt, pass_cnt, app_sum, pass_sum }) => {
        this.totalOrder = app_cnt;
        this.totalOrderPass = pass_cnt;
        this.totalAmount = app_sum;
        this.totalAmountPass = pass_sum;
      })
      .catch(err => alert(err))
    }
  }
}
</script>
<style>
  #homeIndex .dataShow{
    display: flex;
    justify-content:space-around;
    align-items: center;
    height: 210px;
    margin-top: 10px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09);
  }
  #homeIndex .dataShow>div{
    width: 270px;
    height: 150px;
    border-radius: 6px;
    padding: 20px 90px 20px 30px;
    font-size: 16px;
    color: #fff;
    text-shadow: 0 1px 1px #00609A;
  }
  #homeIndex .dateQuery{
    display: flex;
    align-items: center;
    height: 90px;
    background-color: #fff;
    font-size: 16px;
    font-weight: bold;
    letter-spacing:1px;
    padding-left: 20px;
    margin-top: 10px;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09);
  }
</style>

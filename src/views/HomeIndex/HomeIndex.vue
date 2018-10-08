<template>
  <div class="content">
    <div class="container-fluid">
      <div id="main-stats">
        <div class="row-fluid stats-row">
          <div class="span3 stat">
            <div class="data">
              <p>总订单数</p>
              <span class="number" id="totalOrder">
                <ICountUp :endVal="totalOrder"/>
              </span>
            </div>
          </div>
          <div class="span3 stat">
            <div class="data">
              <p>已通过订单数</p>
              <span class="number" id="totalOrderPass">
                <ICountUp :endVal="totalOrderPass"/>
              </span>
            </div>
          </div>
          <div class="span3 stat">
            <div class="data">
              <p>总贷款金额</p>
              <span class="number">¥</span>
              <span class="number" id="totalAmount">
                <ICountUp :endVal="totalAmount"/>
              </span>
            </div>
          </div>
          <div class="span3 stat last">
            <div class="data">
              <p>已通过贷款金额</p>
              <span class="number">¥</span>
              <span class="number" id="totalAmountPass">
                <ICountUp :endVal="totalAmountPass"/>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 20px">
        <div class="alert alert-success search-box">
          <div class="field-box">
            <label>开始时间:</label>
            <Datepicker input-class="datepicker-input" v-model="search_start" @input="getData" />
            <label>结束时间:</label>
            <Datepicker input-class="datepicker-input" v-model="search_end" @input="getData" />
          </div>
        </div>
      </div>
    </div>
  </div>
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
      .catch(err => this.$ui.alert(err))
    }
  }
}
</script>

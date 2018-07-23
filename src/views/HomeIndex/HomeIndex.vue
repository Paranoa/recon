<template>
  <div class="content">
    <div class="container-fluid">
      <div id="main-stats">
        <div class="row-fluid stats-row">
          <div class="span3 stat">
            <div class="data">
              <p>总订单数</p>
              <span class="number" id="totalOrder">{{ totalOrder }}</span>
            </div>
          </div>
          <div class="span3 stat">
            <div class="data">
              <p>已通过订单数</p>
              <span class="number" id="totalOrderPass">{{ totalOrderPass }}</span>
            </div>
          </div>
          <div class="span3 stat">
            <div class="data">
              <p> 总贷款金额</p>
              <span class="number">¥</span><span class="number" id="totalAmount">{{ totalAmount }}</span>
            </div>
          </div>
          <div class="span3 stat last">
            <div class="data">
              <p>已通过贷款金额</p>
              <span class="number">¥</span><span class="number" id="totalAmountPass">{{ totalAmountPass }}</span>
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
    Datepicker
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
      .then(res => {
        this.totalOrder = res.app_sum;
        this.totalOrderPass = res.app_cnt;
        this.totalAmount = res.pass_sum;
        this.totalAmountPass = res.pass_cnt;

        initCountUp([{
          id: 'totalOrder',
          value: this.totalOrder
        },{
          id: 'totalOrderPass',
          value: this.totalOrderPass
        },{
          id: 'totalAmount',
          value: this.totalAmount
        },{
          id: 'totalAmountPass',
          value: this.totalAmountPass
        }])
      })
      .catch(err => alert(err))
    }
  }
}

function initCountUp (num) {
  if (num instanceof Array) {
    for (var each of num) {
      initCountUp(each)
    }
  } else {
    new CountUp(num.id, 0, num.value, 0, 2).start();
  }
}
</script>

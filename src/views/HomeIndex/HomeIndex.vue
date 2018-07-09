<template>
  <div class="content">
    <div class="container-fluid">
      <form name='index_frm' class="index_frm" method="GET">
        <input type='hidden' name='action' class='action' value='index'/>
        <input type='hidden' name='do' class='do' value='main'/>
        <!-- upper main stats -->
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
              <datepicker input-class="datepicker-input" v-model="search_start" @input="getData"></datepicker>
              <label>结束时间:</label>
              <datepicker input-class="datepicker-input" v-model="search_end" @input="getData"></datepicker>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import Datepicker from '@/components/Datepicker.vue'

export default {
  name: "homeIndex",
  data: function () {
    return {
      totalOrder: 0,
      totalOrderPass: 0,
      totalAmount: 0,
      totalAmountPass: 0,
      search_start: "",
      search_end: "",
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
      console.log(this.search_start + ' ' + this.search_end)
      return api.get('../mock/test.json')
        .then(res => {
          this.totalOrder = res.totalOrder;
          this.totalOrderPass = res.totalOrderPass;
          this.totalAmount = res.totalAmount;
          this.totalAmountPass = res.totalAmountPass;

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

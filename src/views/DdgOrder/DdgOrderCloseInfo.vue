<template>
  <div>
    <BaseModal :title="title" :width="width" @close="close">
      <template slot="body">
        <div style="height: 430px">
          <div class="search-line" style="margin-bottom: 20px">
            <span>门店名称： 
              <div class="ui-select" style="width: auto">
                  <select>
                  </select>
              </div>
              <span>
                  时间：<Datepicker v-model="search_start" />
                  至：<Datepicker v-model="search_end" />
              </span>
              <div id="billing_query" class="btn-glow" style="margin-left: 20px;"><i class="icon-search"></i>查询</div>
            </span>
          </div>
          <table class="table table-bordered table-hover table-condensed">
            <thead>
              <tr>
                <th>门店</th>
                <th>结算流水号</th>
                <th>结算日期</th>
                <th>结算金额<i class="ico-help" title="点击具体金额可查看结算订单明细"></i></th>
                <th>结算本金</th>
                <th>结算手续费</th>
                <th>结算风险管理费</th>
                <th>结算提前还款手续费</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record of records" :key="record.id">
                <td>{{ record.storeName }}</td>
                <td>{{ record.paymentNo }}</td>
                <td>{{ record.payDate }}</td>
                <td><a @click="showDetail = true, paymentNo = record.paymentNo">{{ record.payAmount }}</a></td>
                <td>{{ record.payCorpus }}</td>
                <td>{{ record.charge }}</td>
                <td>{{ record.payRisk }}</td>
                <td>{{ record.payRepayAllFee }}</td>
              </tr>
            </tbody>
          </table>
          <div class="pagination-aside">
            <div class="pagination">
              <Paginate :page-count="pageCount" @change="getCashRecord" />
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
      </template>
    </BaseModal>
    <BillingDetail title="结算信息详情" width="1400px" v-if="showDetail" :modalId="paymentNo" @close="showDetail = false"/>
  </div>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import Datepicker from '@/components/Datepicker.vue'
  import Paginate from '@/components/Paginate.vue'
  import api from '@/api/api'
  import BillingDetail from './DdgOrderCloseInfoDetail.vue'

  export default {
    props: ['title', 'width', 'modalId'],
    data () {
      return {
        search_start: '',
        search_end: '',
        ordersTotal: 0,
        records: [],
        showDetail: false,
        paymentNo: '',
      }
    },
    computed: {
      pageCount: vm => (Math.ceil(vm.ordersTotal/10) || 1),
    },
    components: {
      BaseModal,
      Paginate,
      Datepicker,
      BillingDetail,
    },
    methods: {
      close () {
        this.$emit('close')
      },
      getCashRecord () {

      }
    },
    mounted () {
      console.log(this.modalId)
      api.test()
        .then(() => {
          this.records = [{
            payAmount: 10000
          },{
            payAmount: 20000
          }]
        })
    }
  }
</script>

<style scoped>
  .ico-help {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(../../assets/help.png);
    background-size: 100% 100%;
    vertical-align: middle;
    margin: -5px 5px 0;
    cursor: pointer;
    }
</style>
<template>
  <div>
    <BaseModal title="结算信息" :width="width" @close="close">
      <template slot="body">
        <div>
          <form class="search-line" style="margin-bottom: 20px" @submit.prevent="getCashRecord()">
            <div>门店名称： 
              <div class="ui-select" style="width: auto">
                <select v-model="query.code">
                  <option value="0">全部</option>
                  <option v-for="store of belowStores" :value="store.c_STORE_CODE" :key="store.c_STORE_CODE">{{ store.c_NAME }}</option>
                </select>
              </div>
              <span>
                时间：<Datepicker v-model="query.startDate" />
                至：<Datepicker v-model="query.endDate" />
              </span>
              <button class="btn-glow" style="margin-left: 20px;"><i class="icon-search"></i>查询</button>
              <button type="button" class="btn-glow" style="margin-left: 10px" @click="exportXls"><i class="icon-search"></i>导出</button>
            </div>
          </form>
          <table class="table table-bordered table-hover table-condensed ddg-table">
            <thead>
              <tr class="ddg-thead">
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
              <template v-if="records.length">
                <tr v-for="record of records" :key="record.id">
                  <td>{{ record.storeName }}</td>
                  <td>{{ record.paymentNo }}</td>
                  <td>{{ record.payDate | simpleDate }}</td>
                  <td class="txtrt"><a class="link" @click="showDetail = true, paymentNo = record.paymentNo">{{ record.payAmount | fix2 }}</a></td>
                  <td class="txtrt">{{ record.payCorpus | fix2 }}</td>
                  <td class="txtrt">{{ record.charge | fix2 }}</td>
                  <td class="txtrt">{{ record.payRisk | fix2 }}</td>
                  <td class="txtrt">{{ record.payRepayAllFee | fix2 }}</td>
                </tr>
              </template>
              <template v-else>
                  <tr>
                    <td class="txtcenter" colspan="8">未查询到结果</td>
                  </tr>
              </template>
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
  import { mapGetters } from 'vuex'
  import BaseModal from '@/components/BaseModal.vue'
  import Datepicker from '@/components/Datepicker.vue'
  import Paginate from '@/components/Paginate.vue'
  import api from '@/api'
  import util from '@/util'
  import BillingDetail from './DdgOrderCloseInfoDetail.vue'

  const ROWS_COUNT = 10

  export default {
    props: ['width', 'modalId'],
    data () {
      return {
        query: {
          page: 1,
          code: '0',
          startDate: '',
          endDate: ''
        },
        ordersTotal: 0,
        records: [],
        showDetail: false,
        paymentNo: '',
      }
    },
    computed: {
      pageCount: vm => (Math.ceil(vm.ordersTotal/10) || 1),
      ...mapGetters(['belowStores'])
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
      getCashRecord (page = 1) {
        this.query.page = page

        api.ddgBillingInfo({
          page: this.query.page,
          rows: ROWS_COUNT,
          startDate: this.query.startDate,
          endDate: this.query.endDate,
          merchantCode: this.query.code === '0' ? this.$store.getters.merchantCode: '',
          storeCode: this.query.code === '0'? '' : this.query.code,
        })
        .then(res => {
          this.records = res.rows,
          this.ordersTotal = res.total
        })
      },
      exportXls () {
        api.ddgExportBillingInfo({
          page: this.query.page,
          rows: ROWS_COUNT,
          startDate: this.query.startDate,
          endDate: this.query.endDate,
          merchantCode: this.query.code === '0' ? this.$store.getters.merchantCode: '',
          storeCode: this.query.code === '0'? '' : this.query.code,
        })
        .then(res => {
          if (res && res.type === 'text/xml') {
            util.downloadXls(res, '结算信息导出' + new Date().getTime() +'.xls')
            alert('导出成功')
          } else {
            alert('导出失败:' + JSON.stringify(res))              
          }
        })
        .catch(err => alert(err))
      }
    },
    mounted () {
      this.getCashRecord()
    }
  }
</script>

<style scoped>
  .link { 
    cursor: pointer;
  }
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

  .ddg-table td {
    text-align: center;
  }

  .ddg-thead th {
    padding-bottom: 5px;
    background: #eee;
    text-align: center
  }
</style>
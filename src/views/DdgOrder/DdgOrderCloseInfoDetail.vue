<template>
  <BaseModal :title="title" :width="width" @close="close">
    <template slot="body">
      <div style="height: 430px">
        <form class="search-line" style="margin-bottom: 20px" @submit.prevent="getCashRecordDetail()">
          <span>
            搜索：<input type="text" v-model="keyword" class="input-large search_start" maxlength="20">
          </span>
          <button class="btn-glow" style="margin-left: 20px;"><i class="icon-search"></i>查询</button>
        </form>
        <table class="table table-bordered table-hover table-condensed ddg-table">
          <thead>
            <tr class="ddg-thead">
              <th>申请编号</th>
              <th>客户姓名</th>
              <th>客户手机</th>
              <th>门店</th>
              <th>结算时间</th>
              <th>结算期数</th>
              <th>结算金额</th>
              <th>结算本金</th>
              <th>结算手续费</th>
              <th>结算风险管理费</th>
              <th>结算提前还款手续费</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="records.length">
              <tr v-for="record of records" :key="record.extId">
                <td>{{ record.extId }}</td>
                <td>{{ record.name }}</td>
                <td>{{ record.mobile }}</td>
                <td>{{ record.storeName }}</td>
                <td>{{ record.payDate }}</td>
                <td>{{ record.tenor }}</td>
                <td class="txtrt">{{ record.payAmount | fix2 }}</td>
                <td class="txtrt">{{ record.payCorpus| fix2 }}</td>
                <td class="txtrt">{{ record.charge | fix2 }}</td>
                <td class="txtrt">{{ record.payRisk | fix2 }}</td>
                <td class="txtrt">{{ record.payRepayAllFee | fix2 }}</td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td class="txtcenter" colspan="11">未查询到结果</td>
              </tr>             
            </template>
          </tbody>
        </table>
        <div class="pagination-aside">
          <div class="pagination">
            <Paginate :page-count="pageCount" @change="getCashRecordDetail" />
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <button type="button" class="btn btn-default" @click="close">关闭</button>
    </template>
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import Paginate from '@/components/Paginate.vue'
  import api from '@/api'

  const ROWS_COUNT = 10

  export default {
    props: ['title', 'width', 'modalId'],
    data () {
      return {
        keyword: '',
        ordersTotal: 0,
        records: []
      }
    },
    computed: {
      pageCount: vm => (Math.ceil(vm.ordersTotal/10) || 1),
    },
    components: {
      BaseModal,
      Paginate,
    },
    methods: {
      close () {
        this.$emit('close')
      },
      getCashRecordDetail (page = 1) {
        api.billingDetail({
          page,
          rows: ROWS_COUNT,
          paymentNo: this.modalId,
          searchKey: this.keyword
        })
        .then(({ rows, total }) => { 
          this.records = rows
          this.ordersTotal = total
        })
        .catch(err => alert(err))
      }
    },
    mounted () {
      this.getCashRecordDetail()
    }
  }
</script>

<style scoped>
  .ddg-table td {
    text-align: center;
  }
  
  .ddg-thead th {
    padding-bottom: 5px;
    background: #eee;
    text-align: center
  }
</style>
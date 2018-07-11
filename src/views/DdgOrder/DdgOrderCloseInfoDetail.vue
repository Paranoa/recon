<template>
  <BaseModal :title="title" :width="width" @close="close">
    <template slot="body">
      <div style="height: 430px">
        <div class="search-line" style="margin-bottom: 20px">
          <span>
              搜索：<input type="text" v-model="keyword" class="input-large search_start" maxlength="20">
          </span>
          <div class="btn-glow" style="margin-left: 20px;" @click="query"><i class="icon-search"></i>查询</div>
        </div>
        <table class="table table-bordered table-hover table-condensed">
          <thead>
            <tr>
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
            <tr v-for="record of records" :key="record.extId">
              <td>{{ record.extId }}</td>
              <td>{{ record.name }}</td>
              <td>{{ record.mobile }}</td>
              <td>{{ record.storeName }}</td>
              <td>{{ record.payDate }}</td>
              <td>{{ record.tenor }}</td>
              <td>{{ record.payAmount }}</td>
              <td>{{ record.payCorpus }}</td>
              <td>{{ record.charge }}</td>
              <td>{{ record.payRisk }}</td>
              <td>{{ record.payRepayAllFee }}</td>
            </tr>
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
  import Datepicker from '@/components/Datepicker.vue'
  import Paginate from '@/components/Paginate.vue'
  import api from '@/api/api'

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
      query () {
        this.getCashRecordDetail()
      },
      getCashRecordDetail () {
        api.billingDetail()
          .then(res => records = res)
      }
    },
    mounted () {
      console.log(this.modalId)
      api.test()
        .then(() => {
          this.records = [{
            amount: 10000
          },{
            amount: 20000
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
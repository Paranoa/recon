<template>
  <BaseModal :title="title" :width="width" @close="close">
    <template slot="body">
      <div style="height: 430px">
        <table class="table table-bordered table-hover table-condensed">
          <thead>
            <tr>
              <th style="width: 20em">提现批次号</th>
              <th>提现金额(元)</th>
              <th>提现状态</th>
              <th>提现时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record of records" :key="record.id">
              <td>{{ record.requestId }}</td>
              <td>{{ record.amount }}</td>
              <td>{{ record.status | cashStatus }}</td>
              <td>{{ record.createTime }}</td>
            </tr>
            <tr v-if="!records.length">
              <td colspan="4" class="txtcenter">加载中...</td>
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
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import Paginate from '@/components/Paginate.vue'
  import api from '@/api/api'

  export default {
    props: ['title', 'width', 'modalParam'],
    data () {
      return {
        records: []
      }
    },
    computed: {
      pageCount: vm => (Math.ceil(vm.ordersTotal/10) || 1),
      ordersTotal: vm => vm.records.length,
    },
    components: {
      BaseModal,
      Paginate,
    },
    methods: {
      close () {
        this.$emit('close')
      },
      getCashRecord () {

      }
    },
    mounted () {
      console.log(this.modalParam)
      api.storeDepositStatus({
        storeCode: this.modalParam.storeCode,
        fundId: this.modalParam.quDaoCode
      })
      .then(res => this.records = res)
      .catch(err => alert(err))
    }
  }
</script>

<style>
</style>
<template>
  <BaseModal :title="title" :width="width" @close="close">
    <template slot="body">
      <div style="height: 430px">
        <table class="table table-bordered table-hover table-condensed" id="cashRecordTable">
          <thead>
            <tr>
              <th data-column-id="requestId" style="width: 20em">提现批次号</th>
              <th data-column-id="amount">提现金额(元)</th>
              <th data-column-id="status">提现状态</th>
              <th data-column-id="showTime">提现时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record of records" :key="record.id">
              <td>{{ record.requestId }}</td>
              <td>{{ record.amount }}</td>
              <td>{{ record.status }}</td>
              <td>{{ record.showTime }}</td>
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
  import FileUpload from '@/components/FileUpload.vue'
  import Paginate from '@/components/Paginate.vue'
  import api from '@/api/api'

  export default {
    props: ['title', 'width', 'modalId'],
    data () {
      return {
        mark: '',
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
      getCashRecord () {

      }
    },
    mounted () {
      console.log('load' + this.modalId)
    }
  }
</script>

<style>
</style>
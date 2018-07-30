<template>
  <BaseModal title="提现记录" :width="width" @close="close">
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
            <tr v-for="record of recordsCurPage" :key="record.requestId">
              <td>{{ record.requestId }}</td>
              <td>{{ record.amount }}</td>
              <td>{{ record.status | cashStatus }}</td>
              <td>{{ record.createTime }}</td>
            </tr>
            <tr v-if="loading">
              <td colspan="4" class="txtcenter">加载中...</td>
            </tr>
            <tr v-else-if="!records.length">
              <td colspan="4" class="txtcenter">未查询到结果...</td>
            </tr>
          </tbody>
        </table>
        <div class="pagination-aside" v-if="recordsCurPage.length">
          <div class="pagination">
            <Paginate :total="ordersTotal" @change="turnPage" />
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
    props: ['width', 'modalParam'],
    data () {
      return {
        records: [],
        curPage: 1,
        loading: true
      }
    },
    computed: {
      ordersTotal: vm => vm.records.length,
      recordsCurPage () {
        var pageCount = this.curPage - 1
        return this.records.slice( pageCount * ROWS_COUNT, (pageCount + 1) * ROWS_COUNT)
      }
    },
    components: {
      BaseModal,
      Paginate,
    },
    methods: {
      close () {
        this.$emit('close')
      },
      turnPage (page) {
        this.curPage = page
      }
    },
    mounted () {
      this.loading = true
      api.storeDepositStatus({
        storeCode: this.modalParam.storeCode,
        fundId: this.modalParam.quDaoCode
      })
      .then(res => {
        this.loading = false
        this.records = res
      })
      .catch(err => {
        this.loading = false
        alert(err)
      })
    }
  }
</script>

<style>
</style>
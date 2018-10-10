<template>
  <BaseModal title="收款计划" :width="width" @close="close">
    <template slot="body">
      <div class="content-body">
        <div class="flex rightAlignment">
          <div class="button exportBtn" @click="exportXls">
            导出
          </div>
        </div>
        <!-- 表格区域 -->
        <div class="tableRegion" style="padding:0px;height:400px;">
          <el-table :data="repaymentPlan" height="100%" :header-cell-style="{'background':'#FAFAFA'}" border>
            <el-table-column min-width="90" header-align="center" align="center" prop="tenor" label="期数"></el-table-column>
            <el-table-column min-width="120" header-align="center" align="center" label="计划收款日期">
                <template slot-scope="scope">
                  {{ scope.row.payDate | simpleDate }}
                </template>
            </el-table-column>
            <el-table-column min-width="120" header-align="center" align="center" label="实际收款日期">
                <template slot-scope="scope">
                  {{ scope.row.finishDate | simpleDate }}
                </template>
            </el-table-column>
            <el-table-column min-width="120" header-align="center" align="center" label="应收金额">
                <template slot-scope="scope">
                  {{ scope.row.payAmount | fix2 }}
                </template>
            </el-table-column>
            <el-table-column min-width="100" header-align="center" align="center" prop="status" label="收款状态"></el-table-column>
            <el-table-column min-width="120" header-align="center" align="center" label="应收本金">
                <template slot-scope="scope">
                  {{ scope.row.payCorpus | fix2 }}
                </template>
            </el-table-column>
            <el-table-column min-width="140" header-align="center" align="center" label="应收手续费">
                <template slot-scope="scope">
                  {{ scope.row.charge | fix2 }}
                </template>
            </el-table-column>
            <el-table-column min-width="140" header-align="center" align="center" label="应收风险管理费">
                <template slot-scope="scope">
                  {{ scope.row.payRisk | fix2 }}
                </template>
            </el-table-column>
            <el-table-column min-width="160" header-align="center" align="center" label="应收提前还款手续费">
                <template slot-scope="scope">
                  {{ scope.row.payRepayAllFee | fix2 }}
                </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import api from '@/api'
  import util from '@/util'

  export default {
    props: ['width', 'modalId'],
    data () {
      return {
        repaymentPlan: []
      }
    },
    components: {
      BaseModal
    },
    methods: {
      close () {
        this.$emit('close')
      },
      exportXls () {
        api.ddgExportPaymentPlan({
          orderNo: this.modalId
        })
        .then(res => {
          if (res && res.size) {
            util.downloadXls(res, '收款计划导出' + new Date().getTime() +'.xls')
            this.$ui.alert('导出成功')
          } else {
            this.$ui.alert('导出失败:' + JSON.stringify(res))              
          }
        })
        .catch(err => this.$ui.alert(err))
      }
    },
    mounted () {
      api.ddgPaymentPlan({
        orderNo: this.modalId
      })
      .then(res => {
        this.repaymentPlan = res.rows
      })
      .catch(err => this.$ui.alert(err))
    }
  }
</script>

<style scoped>
  .content-body{
    padding: 20px 25px;
    height: 550px;
  }
</style>
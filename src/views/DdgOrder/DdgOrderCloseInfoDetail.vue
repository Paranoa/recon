<template>
  <BaseModal style="z-idnex:12000;" title="结算信息详情" :width="width" @close="close">
    <template slot="body" id="DdgOrderCloseInfoDetail">
      <div class="content-body">
        <!-- 查询区域 -->
        <div class="flex">
          <div class="flex heightCenter">
            <span style="font-size:16px;color:#212121;">搜索</span>
            <input class="input" style="margin-left:10px;" type="text" v-model="keyword">
          </div>
          <div class="flex" style="margin-left:50px;">
            <div class="button queryBtn" @click="getCashRecordDetail(1)">
              查询
            </div>
            <div class="button exportBtn" style="margin-left:30px;" @click="exportXls">
              导出
            </div>
          </div>
        </div>
        <!-- 表格区域 -->
        <div class="tableRegion" style="padding:0px;">
          <el-table :data="records" height="100%" :header-cell-style="{'background':'#FAFAFA'}" border>
            <el-table-column min-width="120" header-align="center" prop="extId" label="申请编号"></el-table-column>
            <el-table-column min-width="105" header-align="center" align="center" prop="name" label="客户姓名"></el-table-column>
            <el-table-column min-width="120" header-align="center" align="center" prop="mobile" label="客户手机"></el-table-column>
            <el-table-column min-width="105" header-align="center" prop="storeName" label="门店"></el-table-column>
            <el-table-column min-width="110" header-align="center" label="结算时间">
                <template slot-scope="scope">
                  {{ scope.row.payDate | simpleDate }}
                </template>
            </el-table-column>
            <el-table-column min-width="90" header-align="center" align="center" prop="tenor" label="结算期数"></el-table-column>
            <el-table-column min-width="150" header-align="center" align="center" label="结算金额">
                <template slot-scope="scope">
                  {{ scope.row.payAmount | fix2 }}
                </template>
            </el-table-column>
            <el-table-column min-width="150" header-align="center" align="center" label="结算本金">
                <template slot-scope="scope">
                  {{ scope.row.payCorpus | fix2 }}
                </template>
            </el-table-column>
            <el-table-column min-width="160" header-align="center" align="center" label="结算手续费">
                <template slot-scope="scope">
                  {{ scope.row.charge | fix2 }}
                </template>
            </el-table-column>
            <el-table-column min-width="170" header-align="center" align="center" label="结算风险管理费">
                <template slot-scope="scope">
                  {{ scope.row.payRisk | fix2 }}
                </template>
            </el-table-column>
            <el-table-column min-width="180" header-align="center" align="center" label="结算提前还款手续费">
                <template slot-scope="scope">
                  {{ scope.row.payRepayAllFee | fix2 }}
                </template>
            </el-table-column>
          </el-table>
          <div style="height:100px;" class="flex heightCenter">
            <el-pagination style="margin:0px auto;" background layout="prev, pager, next" :total="ordersTotal"  @current-change="getCashRecordDetail"></el-pagination>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'
  import Paginate from '@/components/Paginate.vue'
  import api from '@/api'
  import util from '@/util'

  const ROWS_COUNT = 10

  export default {
    props: ['width', 'modalId'],
    data () {
      return {
        keyword: '',
        page: 1,
        ordersTotal: 0,
        records: []
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
      getCashRecordDetail (page = 1) {
        this.page = page

        api.billingDetail({
          page: this.page,
          rows: ROWS_COUNT,
          paymentNo: this.modalId,
          searchKey: this.keyword
        })
        .then(({ rows, total }) => { 
          this.records = rows
          this.ordersTotal = total
        })
        .catch(err => this.$ui.alert(err))
      },
      exportXls () {
        api.ddgExportBillingDetail({
          page: 1,
          rows: 9999,
          paymentNo: this.modalId,
          searchKey: this.keyword
        })
        .then(res => {
          if (res && res.size) {
            util.downloadXls(res, '结算信息详情导出' + new Date().getTime() +'.xls')
            this.$ui.alert('导出成功')
          } else {
            this.$ui.alert('导出失败:' + JSON.stringify(res))              
          }
        })
        .catch(err => this.$ui.alert(err))
      }
    },
    mounted () {
      this.getCashRecordDetail()
    }
  }
</script>
<style>
  #DdgOrderCloseInfoDetail .content-body{
    padding: 30px 35px;
    height: 550px;
    display: flex;
    flex-direction: column;
  }
  #DdgOrderCloseInfoDetail strong{
    font-size: 16px;
  }
</style>

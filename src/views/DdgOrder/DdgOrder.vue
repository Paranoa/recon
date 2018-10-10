<template>
  <div id="ddgOrder">
    <!-- 搜索区域 -->
    <div class="searchRegion">
      <!-- 第一行 -->
      <div class="flex">
        <div class="flex heightCenter">
          <span>搜索</span>
          <input class="input" style="margin-left:10px;" type="text" placeholder="姓名 / 手机号 / 申请编号" v-model="searchCondition.name">
        </div>
        <div class="flex heightCenter" style="margin-left:50px;">
          <span>门店名称</span>
          <select class="select" style="margin-left:10px;" v-model="searchCondition.store_code">
            <option value="">全部</option>
            <option v-for="store of $store.state.user.belowStores" :key="store.c_STORE_CODE" :value="store.c_STORE_CODE">
              {{ store.c_NAME }}
            </option>
          </select>
        </div>
         <div class="flex heightCenter" style="margin-left:50px;">
          <span>状态</span>
          <select class="select" style="margin-left:10px;" v-model="searchCondition.app_status">
            <option value="">全部</option>
            <option v-for="status of ddgStatus" :key="status.key" :value="status.key">
              {{ status.val }}
            </option>
          </select>
        </div>
      </div>
      <!-- 第二行 -->
      <div class="flex" style="margin-top:25px;">
        <div class="flex heightCenter">
          <span>时间</span>
          <Datepicker style="margin-left:10px;" input-class="datepicker-input" v-model="searchCondition.search_start" />
          <span style="margin:0px 15px;">至</span>
          <Datepicker input-class="datepicker-input" v-model="searchCondition.search_end" />
        </div>
        <div class="flex heightCenter" style="margin-left:30px;">
          <el-radio-group class="radio" v-model="searchCondition.type">
            <el-radio :label="1"><span style="font-size:16px;">申请时间</span></el-radio>
            <el-radio :label="2"><span style="font-size:16px;">放款时间</span></el-radio>
          </el-radio-group>
        </div>
        <div class="flex flex1 rightAlignment">
          <div class="button queryBtn" style="margin-right:30px;" @click="queryOrder">
            查询
          </div>
          <div class="button exportBtn" style="margin-right:30px;" @click="exportResult">
            导出
          </div>
          <div class="button settlementInfoBtn" @click="modal.closeInfo = true">
            结算信息
          </div>
        </div>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="tableRegion">
      <div class="flex1">
        <el-table :data="orders" height="100%" :header-cell-style="{'background':'#FAFAFA'}" border>
          <el-table-column min-width="120" header-align="center" prop="C_APP_ID" label="申请编号"></el-table-column>
          <el-table-column min-width="115" header-align="center" prop="D_APPLICATION" label="申请时间"></el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" prop="C_NAME_CN" label="客户姓名"></el-table-column>
          <el-table-column min-width="120" header-align="center" align="center" prop="C_MBL_TEL" label="客户手机"></el-table-column>
          <el-table-column min-width="150" header-align="center" align="center" label="申请金额">
            <template slot-scope="scope">
              {{ scope.row.N_AMT_APPLIED | fix2 | numFormat }}
            </template>
          </el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" prop="N_TENOR_APPLIED" label="申请期数"></el-table-column>
          <el-table-column min-width="190" header-align="center" prop="pdt" label="分期类型"></el-table-column>
          <el-table-column min-width="110" header-align="center" align="center" label="审批日期">
            <template slot-scope="scope">
              {{ scope.row.D_DECISION | len10 }}
            </template>
          </el-table-column>
          <el-table-column min-width="110" header-align="center" align="center" label="放款日期">
            <template slot-scope="scope">
              {{ scope.row.D_DRAWDOWN | len10 }}
            </template>
          </el-table-column>
          <el-table-column min-width="105" header-align="center" align="center" prop="C_SALES_ID" label="销售姓名"></el-table-column>
          <el-table-column min-width="95" header-align="center" align="center" label="订单类型">
            <template slot-scope="scope">
              {{ scope.row.C_APP_TYPE | appType }}
            </template>
          </el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" label="状态">
            <template slot-scope="scope">
              <span>
                <span v-if="scope.row.N_APP_STATUS === '130' && scope.row.D_SEND_FUND_TIME">
                   已通知银行放款
                </span>
                <span v-else>
                  {{ scope.row.N_APP_STATUS | statusMean }}
                </span>
              </span>
            </template>
          </el-table-column>
          <el-table-column min-width="150" header-align="center" align="center" prop="STORE_NAME" label="门店"></el-table-column>
          <el-table-column min-width="270" header-align="center" align="center" label="操作">
            <template slot-scope="scope">
              <div class="flex flexCenter" v-if="+scope.row.N_APP_STATUS == 160">
                <div class="tableBtn tableReceivablesPlanBtn" style="margin:0px 10px;" @click="modal.paymentPlan = true, modalId.paymentPlan = scope.row.C_APP_ID">
                  收款计划
                </div>
                <div v-if="![0,2,3,4,5,8,21,23].includes(+scope.row.N_LOAN_AFTER_STATUS)" class="tableBtn tableCommonBtn" style="margin:0px 10px;" @click="modalId.refund = scope.row.C_APP_ID, modal.refund = true">
                  退贷预约
                </div>
                <div v-else>
                  <div v-if="[2,23].includes(+scope.row.N_LOAN_AFTER_STATUS)">
                    <div class="tableBtn tableCancelReservationBtn" style="margin:0px 10px;" @click="modalId.refundCancel = scope.row.C_APP_ID, modal.refundCancel = true">
                      取消预约
                    </div>
                    <div class="tableBtn tableCommonBtn" style="margin:0px 10px;" @click="modalId.refundConf = scope.row, modal.refundConf = true">
                      上传凭证
                    </div>
                  </div>
                  <span v-else-if="scope.row.N_LOAN_AFTER_STATUS" style="margin:0px 10px;">
                    {{ scope.row.N_LOAN_AFTER_STATUS | loanAfterStatus }}
                  </span>
                </div>
              </div>
              <div class="flex flexCenter" v-else-if="+scope.row.N_APP_STATUS === 103">
                <div class="tableBtn  tableAuditthroughBtn" style="margin:0px 10px;" @click="modal.applyDdg = true, modalId.applyDdg = scope.row.C_APP_ID">
                  审核通过
                </div>
                <div class="tableBtn tableAuditRefuseBtn" style="margin:0px 10px;" @click="spReject(scope.row.C_APP_ID)">
                  审核拒绝
                </div>
              </div>
              <div v-if="scope.row.SHOW_APPLY_BUTTON" class="tableBtn tableCommonBtn marginCenter" @click="modalId.applyLoan = scope.row.C_APP_ID, modal.applyLoan = true">
                {{ scope.row.SHOW_APPLY_BUTTON_NAME }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="height:100px;" class="flex heightCenter">
        <el-pagination style="margin:0px auto;" background layout="prev, pager, next" :total="ordersTotal"  @current-change="queryOrder"></el-pagination>
      </div>
    </div>
    <!-- 弹框区域 -->
    <aside class="backdrop" v-show="hasModal"></aside>
    <Refund v-if="modal.refund" width="670px" :hidePrincipal="true" :modalId="modalId.refund"
      @close="closeModal('refund')"
      @success="closeModal('refund'); queryOrder()" />

    <RefundCancel v-if="modal.refundCancel" width="560px" :hidePrincipal="true" :modalId="modalId.refundCancel"
      @close="closeModal('refundCancel')" 
      @success="closeModal('refundCancel'); queryOrder()" />

    <ApplyLoan v-if="modal.applyLoan" width="1100px" :modalId="modalId.applyLoan"
      @close="closeModal('applyLoan')"
      @success="closeModal('applyLoan'); queryOrder()" />

    <RefundConf v-if="modal.refundConf" width="500px" :modalParam="modalId.refundConf"
      @close="closeModal('refundConf')"
      @success="closeModal('refundConf'); queryOrder()" />

    <CloseInfo v-if="modal.closeInfo" width="1300px" :modalId="modalId.closeInfo"
      @close="closeModal('closeInfo')"/>

    <ApplyDdg v-if="modal.applyDdg" width="430px" :modalId="modalId.applyDdg"
      @close="closeModal('applyDdg')"
      @success="closeModal('applyDdg'); queryOrder()"/>

    <PaymentPlan v-if="modal.paymentPlan" width="1200px" :modalId="modalId.paymentPlan"
      @close="closeModal('paymentPlan')"/>
  </div>
</template>
<script>
  import api from '@/api'
  import util from '@/util'
  import constant from '@/util/constant'
  import Datepicker from '@/components/Datepicker.vue'
  
  import Refund from '../Order/OrderRefund.vue'
  import RefundCancel from '../Order/OrderRefundCancel.vue'
  import ApplyLoan from '../Order/OrderApplyLoan.vue'
  import RefundConf from '../Order/OrderRefundConf.vue'
  import CloseInfo from './DdgOrderCloseInfo.vue'
  import ApplyDdg from './DdgOrderApplyDdg.vue'
  import PaymentPlan from './DdgOrderPaymentPlan.vue'
  export default {
    data () {
      return {
        orders: [],
        searchCondition: {
          page: 1,
          name: '',
          search_start: util.dateToString(constant.A_MONTH_BEFORE),
          search_end: util.dateToString(constant.NOW),
          store_code: '',
          app_status: '',
          type: 1,
        },
        ddgStatus: constant.DDG_STATUS,
        ordersTotal: 0,
        modal: {
          refund: false,
          refundCancel: false,
          applyLoan: false,
          refundConf: false,
          closeInfo: false,
          applyDdg: false,
          paymentPlan: false
        },
        modalId: {},
      }
    },
    computed: {
      hasModal () {
        for (var key in this.modal) {
          if (this.modal[key]) {
            return true
          }
        }
      }
    },
    components: {
      Datepicker,
      Refund,
      RefundCancel,
      ApplyLoan,
      RefundConf,
      CloseInfo,
      ApplyDdg,
      PaymentPlan,
    },
    mounted () {
      this.queryOrder()
    },
    methods: {
      queryOrder (page = 1) {
        this.searchCondition['page'] = page

        api.ddgOrderList({
          page: this.searchCondition.page,
          name: this.searchCondition.name,
          store_code: this.searchCondition.store_code,
          app_status: this.searchCondition.app_status,
          search_start: this.searchCondition.search_start,
          search_end: this.searchCondition.search_end,
          tp: this.searchCondition.type,
        })
        .then(({ result, resultCnt }) => {
          this.orders = result
          this.ordersTotal = resultCnt
        })
      },
      exportResult () {
        api.ddgDoOut({
          page: this.searchCondition.page,
          name: this.searchCondition.name,
          store_code: this.searchCondition.store_code,
          app_status: this.searchCondition.app_status,
          search_start: this.searchCondition.search_start,
          search_end: this.searchCondition.search_end,
          tp: this.searchCondition.type,
        })
        .then(res => {
          if (res && res.size) {
            util.downloadXls(res, '单单过订单导出' + new Date().getTime() +'.xls')
            this.$ui.alert('导出成功')
          } else {
            this.$ui.alert('导出失败:' + JSON.stringify(res))
          }
        })
        .catch(err => alert(err))
      },
      closeModal(modalId) {
        this.modal[modalId] = false
      },
      spReject (appId) {
        this.$ui.confirm('确定要拒绝这笔订单吗？', (confirm) => {
          api.ddgRefuse({
            appId: appId
          })
          .then(() => { 
            confirm.close()
            this.$ui.alert('拒绝成功')
            this.queryOrder()
          })
          .catch(err => alert(err))
        })
      }
    }
  }
</script>

<style>
  #ddgOrder{
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
  }
  #ddgOrder .datepicker-input{
    width: 176px;
  }
  #ddgOrder .tableRegion{
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 20px;
    background-color: #fff;
    padding:10px 25px;
  }
</style>


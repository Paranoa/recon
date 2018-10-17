<template>
  <section id="order">
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
            <option v-for="status of GEEX_SHOW_STATUS_MEAN" :key="status.key" :value="status.key">
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
          <el-radio-group class="radio" v-model="searchCondition.tp">
            <el-radio :label="1"><span style="font-size:14px;">申请时间</span></el-radio>
            <el-radio :label="2"><span style="font-size:14px;">放款时间</span></el-radio>
          </el-radio-group>
        </div>
        <div class="flex flex1 rightAlignment">
          <div class="button queryBtn" style="margin-right:30px;" @click="queryOrder(1)">
            查询
          </div>
          <div class="button exportBtn" @click="doOut">
            导出
          </div>
        </div>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="tableRegion">
      <div class="flex1">
        <el-table :data="orders" height="100%" :header-cell-style="{'background':'#FAFAFA'}" border>
          <el-table-column min-width="90" header-align="center" prop="C_APP_ID" label="申请编号"></el-table-column>
          <el-table-column width="90" header-align="center" prop="D_APPLICATION" label="申请时间"></el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" prop="C_NAME_CN" label="客户姓名"></el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" prop="C_MBL_TEL" label="客户手机"></el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" label="申请金额">
            <template slot-scope="scope">
              {{ scope.row.N_AMT_APPLIED | fix2 | numFormat }}
            </template>
          </el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" label="放款金额">
            <template slot-scope="scope" v-if="scope.row.N_APP_STATUS === 160">
              {{ scope.row.N_AMT_DRAWDOWN | fix2 | numFormat }}
            </template>
          </el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" label="放款户名">
            <template slot-scope="scope">
              <div v-if="scope.row.C_FUND_ID === 'NYB01'">
                {{ scope.row.C_NAME_CN }}
              </div>
              <div v-else>
                {{ scope.row.C_FUND_ID | fundMean }}
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" prop="N_TENOR_APPLIED" label="申请期数"></el-table-column>
          <el-table-column min-width="90" header-align="center" prop="pdt" label="分期类型"></el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" label="审批日期">
            <template slot-scope="scope">
              {{ scope.row.D_DECISION | len10 }}
            </template>
          </el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" label="放款日期">
            <template slot-scope="scope">
              {{ scope.row.D_DRAWDOWN | len10 }}
            </template>
          </el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" prop="C_SALES_ID" label="销售姓名"></el-table-column>
          <el-table-column min-width="100" header-align="center" align="center" label="状态">
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
          <el-table-column min-width="90" header-align="center" align="center" label="订单类型">
            <template slot-scope="scope">
            {{ scope.row.C_APP_TYPE | appType }}
            </template>
          </el-table-column>
          <el-table-column min-width="220" header-align="center" align="center" label="操作">
            <template slot-scope="scope">
              <div class="flex flexCenter">
                <div class="flex flexCenter" v-if="scope.row.N_APP_STATUS == '160'">
                  <div v-if="![0,2,3,4,5,8,21,23].includes(+scope.row.N_LOAN_AFTER_STATUS)" style="margin:0px 10px;" class="tableBtn tableCommonBtn" @click="modalId.refund = scope.row.C_APP_ID, modal.refund = true">
                    退贷预约
                  </div>
                  <div v-else class="flex flexCenter">
                    <div class="flex flexCenter" v-if="[2, 23].includes(+scope.row.N_LOAN_AFTER_STATUS)">
                      <div class="tableBtn tableCancelReservationBtn" style="margin:0px 10px;" @click="modalId.refundCancel = scope.row.C_APP_ID, modal.refundCancel = true">取消预约</div>
                      <div class="tableBtn tableCommonBtn" style="margin:0px 10px;" @click="modalId.refundConf = scope.row, modal.refundConf = true">上传凭证</div>
                    </div>
                    <span v-else-if="scope.row.N_LOAN_AFTER_STATUS" style="margin:5px 10px;width:80px;display:block;">
                      {{ scope.row.N_LOAN_AFTER_STATUS | loanAfterStatus }}
                    </span>
                  </div>
                </div>
                <div v-else-if="scope.row.N_APP_STATUS == '130' && scope.row.FINANCE_CODE == 'DDG'">
                  <div class="tableBtn tableCommonBtn" style="margin:0px 10px;background-color: #19DDB0;box-shadow: 0 1px 3px 0 #15C59C;width:100px;padding-top:1px;" @click="applDdgReject(scope.row.C_APP_ID, scope.row.C_ORG04)">转单单过申请</div>
                </div>
                <div v-if="scope.row.SHOW_APPLY_BUTTON" class="tableBtn tableCommonBtn" style="margin:0px 10px;" @click="modalId.applyLoan = scope.row.C_APP_ID, modal.applyLoan = true">
                  {{ scope.row.SHOW_APPLY_BUTTON_NAME }}
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="height:100px;" class="flex heightCenter">
        <el-pagination style="margin:0px auto;" background layout="prev, pager, next" :total="ordersTotal" :current-page="searchCondition.page"  @current-change="queryOrder"></el-pagination>
      </div>
    </div>
    <!-- 弹框区域 -->
    <aside class="backdrop" v-show="hasModal"></aside>
    <Refund v-if="modal.refund" width="670px" :modalId="modalId.refund"
      @close="closeModal('refund')"
      @success="closeModal('refund'); queryOrder()" />

    <RefundCancel v-if="modal.refundCancel" width="670px" :modalId="modalId.refundCancel"
      @close="closeModal('refundCancel')"
      @success="closeModal('refundCancel'); queryOrder()" />

    <ApplyLoan v-if="modal.applyLoan" width="1140px" :modalId="modalId.applyLoan"
      @close="closeModal('applyLoan')"
      @success="closeModal('applyLoan'); queryOrder()" />

    <RefundConf v-if="modal.refundConf" width="670px" :modalParam="modalId.refundConf"
      @close="closeModal('refundConf')"
      @success="closeModal('refundConf'); queryOrder()" />
  </section>
</template>

<script>
import api from '@/api'
import Datepicker from '@/components/Datepicker.vue'
import util from '@/util'
import constant from '@/util/constant'

import Refund from './OrderRefund.vue'
import RefundCancel from './OrderRefundCancel.vue'
import ApplyLoan from './OrderApplyLoan.vue'
import RefundConf from './OrderRefundConf.vue'
export default {
  data () {
    return {
      searchCondition:{
        name:"",
        store_code:"",
        app_status:"",
        search_start:util.dateToString(constant.A_MONTH_BEFORE),
        search_end:util.dateToString(constant.NOW),
        tp:1,
        page:1
      },
      GEEX_SHOW_STATUS_MEAN: [
        {key:'110',val:'审批中'},
        {key:'130',val:'已批准,待放款'},
        {key:'140',val:'已拒绝'},
        {key:'160',val:'已放款'}
      ],
      orders: [],
      ordersTotal:0,
      modal: {
        refund: false,
        refundCancel: false,
        uploadProof: false,
        applyLoan: false,
        refundConf: false,
      },
      modalId: {},
    }
  },
  mounted () {
    this.queryOrder();
  },
  methods: {
    queryOrder (page = 1) {
      const self = this; 
      self.searchCondition['page'] = page
      api.queryOrder(self.searchCondition).then(resultData=>{
        self.orders = resultData.result
        self.ordersTotal = resultData.resultCnt
      })
    },
    doOut(){
      const self = this;
      api.doOut(self.searchCondition).then(res => {
        if (res && res.size) {
          util.downloadXls(res, '订单查询导出' + new Date().getTime() +'.xls')
          alert('导出成功')
        } else {
          alert('导出失败:' + JSON.stringify(res))              
        }
      })
    },
    applDdgReject (appId,storeCode) {
      this.$ui.confirm('如申请成功，此订单将从无卡订单转换为单单过订单，是否确认该申请？', (confirm) => {
        api.ddgApply({
          cAppId: appId,
          storeCode: storeCode
        })
        .then(() => {
          this.$ui.alert('申请成功');
          this.queryOrder()
          confirm.close()
        })
        .catch(err => {
          confirm.close()
          this.$ui.alert(err)
        })
      })
    },
    closeModal(modalId) {
      this.modal[modalId] = false
    }
  },
  computed: {
    hasModal () {
      for (var key in this.modal) {
        if (this.modal[key]) {
          return true
        }
      }
    },
  },
  components: {
    Datepicker,
    util,
    Refund,
    RefundCancel,
    ApplyLoan,
    RefundConf
  }
}
</script>
<style>
  #order{
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
  }
  #order .datepicker-input{
    width: 176px;
  }
  #order .tableRegion{
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 20px;
    background-color: #fff;
    padding:10px 25px;
  }
  #order>.tableRegion .el-table__row .cell{
    padding: 3px 7px;
    font-size: 12px;
  }
  /* #order .el-table__body-wrapper.is-scrolling-none::-webkit-scrollbar{
    width:0;
  } */
</style>

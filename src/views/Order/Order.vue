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
            <el-radio :label="1"><strong style="font-size:16px;">申请时间</strong></el-radio>
            <el-radio :label="2"><strong style="font-size:16px;">放款时间</strong></el-radio>
          </el-radio-group>
        </div>
        <div class="flex flex1 rightAlignment">
          <div class="button queryBtn" style="margin-right:30px;" @click="queryOrder">
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
        <el-table :data="orders" :default-sort = "{prop: 'C_APP_ID', order: 'descending'}" height="100%" :header-cell-style="{'background':'#FAFAFA'}" border>
          <el-table-column header-align="center" align="center" prop="C_APP_ID" label="申请编号" sortable></el-table-column>
          <el-table-column header-align="center" align="center" prop="D_APPLICATION" label="申请时间" sortable></el-table-column>
          <el-table-column header-align="center" align="center" prop="C_NAME_CN" label="客户姓名" sortable></el-table-column>
          <el-table-column header-align="center" align="center" prop="C_MBL_TEL" label="客户手机" sortable></el-table-column>
          <el-table-column header-align="center" align="center" label="申请金额" sortable>
            <template slot-scope="scope">
              {{ scope.row.N_AMT_APPLIED | fix2 | numFormat }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="放款金额" sortable>
            <template slot-scope="scope" v-if="scope.row.N_APP_STATUS === 130">
              {{ scope.row.N_AMT_DRAWDOWN | fix2 | numFormat }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="N_TENOR_APPLIED" label="申请期数" sortable></el-table-column>
          <el-table-column header-align="center" align="center" prop="pdt" label="分期类型" sortable></el-table-column>
          <el-table-column header-align="center" align="center" label="订单类型" sortable>
            <template slot-scope="scope">
            {{ scope.row.C_APP_TYPE | appType }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="状态" sortable>
            <template slot-scope="scope">
              <span class="label" :class="scope.row.N_APP_STATUS | statusClass">
                <span v-if="scope.row.N_APP_STATUS === '130' && scope.row.D_SEND_FUND_TIME">
                  已通知银行放款
                </span>
                <span v-else>
                  {{ scope.row.N_APP_STATUS | statusMean }}
                </span>
              </span>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="操作" sortable>
            <template slot-scope="scope">
              <div v-if="scope.row.N_APP_STATUS == '160'">
                <div v-if="![0,2,3,4,5,8,21,23].includes(+scope.row.N_LOAN_AFTER_STATUS)" class="tableBtn marginCenter" @click="modalId.refund = scope.row.C_APP_ID, modal.refund = true">
                  退贷预约
                </div>
                <div v-else>
                  <div v-if="[2, 23].includes(+scope.row.N_LOAN_AFTER_STATUS)">
                    <div class="cancelReservationBtn marginCenter" @click="modalId.refundCancel = scope.row.C_APP_ID, modal.refundCancel = true">查看/取消预约</div>
                    <div class="tableBtn marginCenter" @click="modalId.refundConf = scope.row, modal.refundConf = true">上传凭证</div>
                  </div>
                  <span v-else-if="scope.row.N_LOAN_AFTER_STATUS" class="label">
                    {{ scope.row.N_LOAN_AFTER_STATUS | loanAfterStatus }}
                  </span>
                </div>
              </div>
              <div v-else-if="scope.row.N_APP_STATUS == '130' && scope.row.FINANCE_CODE == 'DDG'">
                <div class="tableBtn marginCenter" @click="applDdgReject(scope.row.C_APP_ID, scope.row.C_ORG04)">单单过申请</div>
              </div>
              <div v-if="scope.row.SHOW_APPLY_BUTTON" class="tableBtn marginCenter" @click="modalId.applyLoan = scope.row.C_APP_ID, modal.applyLoan = true">
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
  </section>
</template>

<script>
import api from '@/api'
import Datepicker from '@/components/Datepicker.vue'
import util from '@/util'
import constant from '@/util/constant'
export default {
  data () {
    return {
      searchCondition:{
        name:"",
        store_code:"",
        app_status:"",
        search_start:util.dateToString(constant.A_MONTH_BEFORE),
        search_end:util.dateToString(constant.NOW),
        tp:1
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
      if (confirm('是否确认该笔订单申请单单过？')) {
        api.ddgApply({
          cAppId: appId,
          storeCode: storeCode
        })
        .then(() => {
          alert('申请成功');
          this.queryOrder()
        })
        .catch(err => alert(err))
      }
    }
  },
  components: {
    Datepicker,
    util
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
  #order .searchRegion{
    height: 135px;
    margin-top: 10px;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09);
    padding: 30px 25px;
    font-size: 16px;
    font-weight: bold;
    letter-spacing:2px;
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
  /* #order .el-table__body-wrapper.is-scrolling-none::-webkit-scrollbar{
    width:0;
  } */
  #order .cancelReservationBtn{
    width: 80px;
    height: 26px;
    background: #FAFAFA;
    border: 1px solid #A0A0A0;
    box-shadow: 0 1px 3px 0 rgba(210,210,210,0.92);
    border-radius: 100px;
    text-align: center;
    color: #777777;
    cursor: pointer;
  }
</style>

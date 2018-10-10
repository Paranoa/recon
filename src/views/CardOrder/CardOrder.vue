<template>
  <section id="cardOrder">
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
            <option v-for="status of orderStatus" :key="status.key" :value="status.key">
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
            <el-radio :label="1"><span style="font-size:15px;">申请时间</span></el-radio>
            <el-radio :label="2"><span style="font-size:15px;">放款时间</span></el-radio>
          </el-radio-group>
        </div>
        <div class="flex flex1 rightAlignment">
          <div class="button queryBtn" style="margin-right:30px;" @click="cardOrderList">
            查询
          </div>
          <div class="button exportBtn" @click="exportExl">
            导出
          </div>
        </div>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="tableRegion">
      <div class="flex1">
        <el-table :data="orders" :default-sort = "{prop: 'orderNo', order: 'descending'}" height="100%" :header-cell-style="{'background':'#FAFAFA'}" border>
          <el-table-column min-width="165" header-align="center" align="center" prop="orderNo" label="订单编号"></el-table-column>
          <el-table-column min-width="120" header-align="center" align="center" prop="createTime" label="申请时间"></el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" prop="name" label="客户姓名"></el-table-column>
          <el-table-column min-width="120" header-align="center" align="center" prop="mobile" label="客户手机"></el-table-column>
          <el-table-column min-width="150" header-align="center" align="center" label="申请金额">
            <template slot-scope="scope">
              {{ scope.row.orderAmount | fix2 | numFormat }}
            </template>
          </el-table-column>
          <el-table-column min-width="150" header-align="center" align="center" label="收款金额">
            <template slot-scope="scope">
              {{ scope.row.merchantAmount | fix2 | numFormat }}
            </template>
          </el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" prop="tenor" label="申请期数"></el-table-column>
          <el-table-column min-width="110" header-align="center" align="center" label="放款日期">
            <template slot-scope="scope">
              {{ scope.row.drawdownTime || '-' }}
            </template>
          </el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" prop="saleName" label="销售姓名"></el-table-column>
          <el-table-column min-width="90" header-align="center" align="center" prop="paymentStatus" label="状态"></el-table-column>
          <el-table-column min-width="150" header-align="center" align="center" prop="storeName" label="门店"></el-table-column>
          <el-table-column min-width="150" header-align="center" align="center" label="退款状态">
            <template slot-scope="scope">
              <div v-if="scope.row.refundFlag === 0">
                已退贷
              </div>
              <div v-else>
                {{ scope.row.refundStatus }}
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="150" header-align="center" align="center" label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.refundStatus === '未退款' && scope.row.paymentStatus === '支付成功' && scope.row.refundFlag !== '0'">
                <div class="tableBtn tableCommonBtn marginCenter" @click="checkRefundLimit(scope.row)">退贷预约</div>
              </div>
              <div v-else-if="scope.row.refundStatus === '商户退货中' && scope.row.paymentStatus === '支付成功' && scope.row.refundFlag !== '0'">
                <div class="tableBtn tableCancelReservationBtn marginCenter" @click="cancelReserve(scope.row.orderNo)">取消预约</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="height:100px;" class="flex heightCenter">
        <el-pagination style="margin:0px auto;" background layout="prev, pager, next" :total="ordersTotal"  @current-change="cardOrderList"></el-pagination>
      </div>
    </div>
    <!-- 弹框区域 -->
    <aside class="backdrop" v-show="hasModal"></aside>
    <CCIRefund title="退贷预约" v-if="modal.cciRefund" width="670px" :modalParam="modalParam.cciRefund" @close="closeModal('cciRefund')" @success="closeModal('cciRefund'); cardOrderList()" />
  </section>
</template>
<script>
  import api from '@/api'
  import util from '@/util'
  import constant from '@/util/constant'
  import Datepicker from '@/components/Datepicker.vue'
  
  import CCIRefund from './CardOrderCCIRefund.vue'
  export default {
    data () {
      return {
        searchCondition: {
          name:"",
          store_code: '',
          app_status: '',
          search_start: util.dateToString(constant.A_MONTH_BEFORE),
          search_end: util.dateToString(constant.NOW),
          type: 1,
          page: 1
        },
        orders: [],
        ordersTotal: 0,
        orderStatus: constant.ORDER_STATUS,
        modal: {
          cciRefund: false
        },
        modalParam: {
          cciRefund: {}
        },
      }
    },
    mounted () {
      this.cardOrderList()
    },
    methods: {
      cardOrderList (page = 1) {
        this.searchCondition['page'] = page
        api.cardOrderList({
          page: this.searchCondition.page,
          store_code: this.searchCondition.store_code || '',
          app_status: this.searchCondition.app_status || '',
          search_start: this.searchCondition.search_start || '',
          search_end: this.searchCondition.search_end || '',
          tp: this.searchCondition.type || '',
          name: this.searchCondition.name || ''
        })
        .then(({ rows, total }) => {
          this.orders = rows
          this.ordersTotal = total
        })
        .catch(err => this.$ui.alert(err))
      },
      exportExl () {
        api.exportExcel({
          store_code: this.searchCondition.store_code || '',
          app_status: this.searchCondition.app_status || '',
          search_start: this.searchCondition.search_start || '',
          search_end: this.searchCondition.search_end || '',
          type: this.searchCondition.type || '',
          name: this.searchCondition.name || ''
        })
        .then(res => {
          if (res && res.size) {
            util.downloadXls(res, '刷卡消费导出' + new Date().getTime() +'.xls')
            this.$ui.alert('导出成功')
          } else {
            this.$ui.alert('导出失败:' + JSON.stringify(res))
          }
        })
        .catch(err => this.$ui.alert(err))
      },
      checkRefundLimit (order) {
        api.checkRefundLimit({ appId: order.orderNo})
        .then(res => {
          this.modalParam.cciRefund = {
            appId: order.orderNo,
            ...res
          }
          this.modal.cciRefund = true
        })
        .catch(err => {
          this.$ui.alert(err);
        })
        
      },
      cancelReserve (appId) {
        this.$ui.confirm('您确认要取消退贷申请吗？', (confirm) => {
          api.cancelRefund({ appId })
          .then(() => {
            confirm.close()
            this.$ui.alert('取消成功')
            this.cardOrderList()
          })
          .catch(err => this.$ui.alert(err))
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
      }
    },
    components: {
      Datepicker,
      CCIRefund
    }
  }
</script>

<style>
  #cardOrder{
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
  }
  #cardOrder .datepicker-input{
    width: 176px;
  }
  #cardOrder .tableRegion{
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 20px;
    background-color: #fff;
    padding:10px 25px;
  }
</style>

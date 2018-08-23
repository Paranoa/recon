<template>
  <div>
    <div v-show="!showDetail">
      <div class="table-wrapper products-table section">
        <div class="table-wrapper orders-table section">
          <header class="title-bar">
            <h4>单单过订单</h4>
          </header>
          <form class="order_list_frm" @submit.prevent="queryOrder(true)">
            <div class="query-block">
              <div class="txtcenter">
                <input type="text" class='input-search' v-model="query.name" placeholder="姓名/手机号/申请编号" maxlength="25">
                <button class="submit-btn">确定</button>
              </div>
              <div class="fix">
                <span class="fl wd50p box">门店名称
                  <select class="ui-mb-select" v-model="query.store_code">
                    <option value="">全部</option>
                    <option v-for="store of belowStores" :key="store.c_STORE_CODE" :value="store.c_STORE_CODE">
                      {{ store.c_NAME }}
                    </option>
                  </select>
                </span>
                <span class="fl wd50p box">
                  状态
                  <select class="ui-mb-select" v-model="query.app_status">
                    <option value="">全部</option>
                    <option v-for="status of ddgStatus" :key="status.key" :value="status.key">
                      {{ status.val }}
                    </option>
                  </select>
                </span>
              </div>
              <div class="fix mgt10">
                <span class="fl wd50p box">时间：<Datepicker input-class="ui-mb-datepicker" id="searchDateStart" v-model="query.search_start"/></span>
                <span class="fl wd50p box">至：<Datepicker input-class="ui-mb-datepicker" id="searchDateEnd" v-model="query.search_end" @opened="searchDateOpened" /></span>
              </div>
            </div>
          </form>
          <table class="table table-hover order-table order-table-title">
            <thead>
              <tr class="table-head">
                <th class="wd25p">客户姓名</th>
                <th class="wd25p">客户手机</th>
                <th class="wd25p">申请金额</th>
                <th class="wd25p">状态</th>
              </tr>
            </thead>
          </table>
          <div class="main-table">
            <table class="table table-hover order-table order-table-body">
              <colgroup>
                <col class="wd25p">
                <col class="wd25p">
                <col class="wd25p">
                <col class="wd25p">
              </colgroup>
              <tbody>
                <tr class="first" v-for="order of orders" :key="order.C_APP_ID" @click="showDetail = true; detailOrder = order">
                  <td>{{ order.C_NAME_CN }}</td>
                  <td>{{ order.C_MBL_TEL }}</td>
                  <td>{{ order.N_AMT_APPLIED | fix2 }}</td>
                  <td>
                    <span :class="order.N_APP_STATUS | statusClass">
                      <template v-if="order.N_APP_STATUS === '130' && order.D_SEND_FUND_TIME">
                        已通知银行放款
                      </template>
                      <template v-else>
                        {{ order.N_APP_STATUS | statusMean }}
                      </template>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <OrderDetail v-show="showDetail" :order="detailOrder" @close="showDetail = false" @refresh="queryOrder(true)"/>
  </div>
</template>

<script>
  import api from '@/api'
  import { mapGetters } from 'vuex'
  import util from '@/util'
  import constant from '@/util/constant'
  import Datepicker from '@/components/Datepicker.vue'
  import OrderDetail from './DdgOrderDetail.vue'

  export default {
    data () {
      return {
        orders: [],
        query: {
          page: 1,
          name: '',
          search_start: util.dateToString(constant.A_MONTH_BEFORE),
          search_end: util.dateToString(constant.NOW),
          store_code: '',
          app_status: '',
          type: '1',
        },
        isBottomed: false,
        stores: [],
        ddgStatus: constant.DDG_STATUS,
        modal: {
          refund: false,
          refundCancel: false,
          uploadProof: false,
          applyLoan: false,
          refundConf: false,
          closeInfo: false,
          pamentPlan: false,
          applyDdg: false,
          paymenPlan: false,
        },
        loading: false,
        showDetail: false,
        detailOrder: {},
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
      ...mapGetters(['belowStores'])
    },
    components: {
      Datepicker,
      OrderDetail,
    },
    filters: {
      statusClass (value) {
        return {
          '99' : 'color-error',
          '110': 'color-info',
          '130': 'color-alert',
          '140': 'color-error',
          '160': 'color-success',
          '162': 'color-error',
        }[value] || 'color-info'
      }
    },
    mounted () {
      hackDatePickerInput()
      window.addEventListener('scroll', this.windowScroll)
      this.queryOrder(true).then(() => {
        // 初始化查询第一页后仍不足一屏的高度。则查询下一页
        if (document.documentElement.offsetHeight < document.documentElement.clientHeight) {
          this.queryOrder()
        }
      })
    },
    methods: {
      queryOrder (isCover) {
        if (isCover) {
          // 改变条件重新查询时,页码变更为1,已到底重置为false
          this.query.page = 1
          this.isBottomed = false
        }
        if (this.paramValid() && !this.loading && !this.isBottomed) {
          this.loading = true
          return api.ddgOrderList({
            page: this.query.page,
            name: this.query.name,
            store_code: this.query.store_code,
            app_status: this.query.app_status,
            search_start: this.query.search_start,
            search_end: this.query.search_end,
            tp: this.query.type,
          })
          .then(({ result, resultCnt }) => {
            this.loading = false
            // 到最后一页时标记为已到底
            if (result && this.query.page < Math.ceil(resultCnt/10)) {
              this.query.page++
            } else {
              this.isBottomed = true
            }
            if (isCover) {
              // 改变条件重新查询时,滑动到顶部
              $(window).scrollTop(0)
              this.orders = result
            } else {
              this.orders = [...this.orders, ...result]
            }
          })
          .catch(err => {
            this.loading = false
            alert(err)
          })
        }
      },
      spReject (appId) {
        if (confirm('确定要拒绝这笔订单吗？')) {
          api.ddgRefuse({
            appId: appId
          })
          .then(() => { 
            alert('拒绝成功')
            this.queryOrder()
          })
          .catch(err => alert(err))
        }
      },
      searchDateOpened () {
        // datepicker显示位置调整,临时解决方案
        $('#searchDateEnd').parents('.vdp-datepicker').find('.vdp-datepicker__calendar').css({ marginLeft: '-85px'})
      },
      paramValid () {

      },
      windowScroll (event) {
        if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
          if (!this.showDetail) {
            this.queryOrder()
          }
        }
      }
    }
  }

  // 防止datePicker的input被点击到,临时解决方案
  function hackDatePickerInput () {
    var div = document.createElement('div')
    var div2 = document.createElement('div')

    $(div).addClass('datepicker-mask')
    $(div2).addClass('datepicker-mask')

    $(div).click(() => {
      $('#searchDateEnd').parents('.vdp-datepicker').find('.vdp-datepicker__calendar').hide()
      $('#searchDateStart').click()
    })
    $(div2).click(() => { 
      $('#searchDateStart').parents('.vdp-datepicker').find('.vdp-datepicker__calendar').hide()
      $('#searchDateEnd').click()
    })

    $('#searchDateStart').parent().addClass('rel').append(div)
    $('#searchDateEnd').parent().addClass('rel').append(div2)
  }
</script>

<style>
  input:focus, select:focus { outline: none }
  .title-bar { position: fixed; width: 100%; top: 0; left: 0; z-index: 2 }
  .order_list_frm { position: fixed; width: 100%; top: 44px; left: 0; z-index: 3; background: #fff; }
  .order-table-title { position: fixed; width: 100%; top: 166px; left: 0; z-index: 2 }
  .order-table-body { margin-top: 216px; z-index: 1;}

  .title-bar h4 { background: #122036; color: #fff; font-size: 16px; text-align: center; line-height: 44px }
  .table { margin-bottom: 0 }
  .content { padding-bottom: 50px }
  input.input-search { width: 70%; margin-top: 8px; background: url(../../assets/ico/ico-search.png) #F2F2F2 5px no-repeat; background-size: 16px; padding-left: 25px; border: none; border-radius: 15px;}
  .main-table { z-index: 1; }
  .box { padding-left: 10px; box-sizing: border-box; }
  .order-table thead th, .order-table tbody td { text-align: center; }
  .order-table thead th { background: #FAFAFA; color: #444444; vertical-align: middle; padding-top: 0; padding-bottom: 0 }
  .order-table tr { height: 50px; border: .5px solid #D7D7D7 }
  .submit-btn, .submit-btn:focus { color: #1AB3FF; background: none; border: none; outline: none }
  .ui-mb-select, .ui-mb-input, .ui-mb-datepicker { display: inline-block; width: 120px; height: 26px; line-height: 18px; border: 1px solid #BDBDBD }
  .ui-mb-select { background: url(../../assets/ico/ico-arr-blue-down.png) #FAFAFA right no-repeat; padding-right: 24px; background-size: 24px 24px; -webkit-appearance: none;}
  .ui-mb-input { background: #FAFAFA; padding: 4px 6px; box-sizing: border-box; }
  .ui-mb-datepicker { width: 120px; background: url(../../assets/ico/ico-calendar.png) #FAFAFA right no-repeat; padding-right: 24px; background-size: 24px 24px; }

  .color-info { color: #1AB3FF }
  .color-alert { color: rgb(255,69,0) }
  .color-success { color: rgb(129, 189, 130) }
  .color-error { color: #b94a48 }

  .datepicker-mask { position:  absolute; width: 100%; height: 100%; left: 0; top: 0; background: none; z-index: 1}

  @media (max-width: 370px) {
    .ui-mb-select, .ui-mb-input, .ui-mb-datepicker { width: 90px }
  }
</style>

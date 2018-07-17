<template>
  <div class="content">
    <div class="container-fluid">
      <div id="pad-wrapper">
        <div class="table-wrapper products-table section">
          <div class="table-wrapper orders-table section">
            <div class="row-fluid head" style="margin: 15px;">
              <div class="span12"><h4>退款处理</h4></div>
            </div>
            <form class="order_list_frm">
              <div class="row-fluid filter-block">
                <div class="pull-left search-line">
                  <span>搜索：<input type="text" class='name' v-model.trim="query.name" placeholder="姓名/手机号/申请编号" maxlength="25"></span>
                    <span>状态： 
                      <div class="ui-select">
                        <select name="app_status" class="app_status" v-model="query.status">
                          <option value="0">全部</option>
                          <option v-for="status of payStatus" :key="status.key" :value="status.key">
                            {{ status.val }}
                          </option>
                        </select>
                      </div>
                    </span>
                </div>
              </div>
              <div class="row-fluid filter-block">
                <div class="pull-right search-buttons">
                  <div class="btn-glow search_btn" style="margin-right: 10px;" @click="tkOrderList()"><i class="icon-search"></i>查询</div>
                </div>
              </div>
            </form>
            <div class="row-fluid">
              <table class="table table-hover order-table">
                <thead>
                  <tr>
                    <th>申请编号</th>
                    <th>客户姓名</th>
                    <th>客户手机</th>
                    <th>申请金额</th>
                    <th>放款金额</th>
                    <th>申请期数</th>
                    <th>分期类型</th>
                    <th>申请时间</th>
                    <th>审批日期</th>
                    <th>放款日期</th>
                    <th>门店名称</th>
                    <th>销售姓名</th>
                    <th>订单状态</th>
                    <th>提交时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="first" v-for="order of orders" :key="order.orderNo">
                    <td>{{ order.C_APP_ID }}</td>
                    <td>{{ order.C_NAME_CN }}</td>
                    <td>{{ order.C_MBL_TEL}}</td>
                    <td>{{ order.N_AMT_APPLIED | fix2 }}</td>
                    <td class="{ red: order.N_APP_STATUS == 130 }">{{ order.N_AMT_DRAWDOWN | fix2 }}</td>
                    <td>{{ order.N_TENOR_APPLIED }}</td>
                    <td>{{ order.pdt }}</td>
                    <td>{{ order.D_APPLICATION }}</td>
                    <td>{{ order.D_DECISION }}</td>
                    <td>{{ order.D_DRAWDOWN }}</td>
                    <td>{{ order.STORE_NAME }}</td>
                    <td>{{ order.C_SALES_ID }}</td>
                    <td>{{ order.N_APP_STATUS | statusMean }}</td>
                    <td>{{ order.uptime || '-' }}</td>
                    <td>
                      <div class="btn-glow" @click="modal.tkAudit = true, modalParam.tkAudit = order">退款处理</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination-aside">
      <div class="pagination">
        <Paginate :page-count="orderPageCount" @change="tkOrderList" />
      </div>
    </div>
    <aside class="backdrop" v-show="hasModal"></aside>
    <TkAudit v-if="modal.tkAudit" width="600px" :modalParam="modalParam.tkAudit" @close="closeModal('tkAudit')" @success="tkOrderList()"/>
  </div>
</template>

<script>
  import api from '@/api/api'
  import constant from '@/util/constant'
  import Paginate from '@/components/Paginate.vue'
  import Datepicker from '@/components/Datepicker.vue'
  import TkAudit from './TkOrderTkAudit.vue'

  const ROWS_COUNT = 10

  export default {
    data () {
      return {
        query: {
          status: '0'
        },
        stores: [],
        orders: [],
        payStatus: constant.PAY_STATUS,
        ordersTotal: 0,
        modal: {
          tkAudit: false
        },
        modalParam: {
          tkAudit: {}
        }
      }
    },
    computed: {
      orderPageCount: vm => (Math.ceil(vm.ordersTotal / ROWS_COUNT) || 1),
      hasModal () {
        for (var key in this.modal) {
          if (this.modal[key]) {
            return true
          }
        }
      }
    },
    components: {
      Paginate,
      Datepicker,
      TkAudit,
    },
    mounted () {
      this.tkOrderList()
    },
    methods: {
      tkOrderList (page = 1) {
        api.tkOrderList({
          page,
          name: this.query.name || '',
          status: this.query.status || '',
        })
        .then(({ rows, total }) => {
          this.orders = rows
          this.ordersTotal = total
        })
        .catch(err => alert(err))
      },
      closeModal (modalId) {
        this.modal[modalId] = false
      }
    }
  }
</script>

<style scoped>
/* Main stats up of screen */
#main-stats {
  margin-left: -20px;
  margin-right: -20px;
  background-color: #fdfdfd;
  border-bottom: 1px solid #efeef3; }
  #main-stats .stats-row {
    box-shadow: inset -1px 0px 5px 2px #f9f9f9; }
  #main-stats .stat {
    text-align: right;
    padding: 60px 0px 65px 0px;
    border-right: 1px solid #e8e9ee;
    position: relative;
    box-shadow: 1px 0px 0px 0px white; }
    #main-stats .stat.last {
      border-right: 0px; }
    #main-stats .stat .data {
      color: #29323a;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 16px;
      padding-right: 50px; }
      #main-stats .stat .data .number {
        color: #32a0ee;
        font-size: 25px;}
      #main-stats .stat .data >p {
        margin-bottom: 20px;
      }
    #main-stats .stat .date {
      color: #b4b8bb;
      font-weight: lighter;
      font-family: 'Lato', 'Open Sans';
      font-style: italic;
      font-size: 13px;
      position: absolute;
      right: 50px; }

/* Stats chart */
#statsChart {
  width: 97%;
  height: 250px;
  margin-top: 35px; }

/* specific chart styles */
.legendLabel {
  font-size: 12px;
  font-family: "Open Sans", Arial;
  color: #9da3a9; }

/* UI elements section */
#pad-wrapper .ui-elements h4 {
  margin-bottom: 35px; }
#pad-wrapper .ui-elements .btn-flat {
  text-transform: uppercase; }
  #pad-wrapper .ui-elements .btn-flat.icon {
    text-transform: none; }
    #pad-wrapper .ui-elements .btn-flat.icon i {
      margin-right: 3px; }
#pad-wrapper .ui-elements .ui-sliders {
  margin-top: 10px;
  margin-bottom: 50px; }
  #pad-wrapper .ui-elements .ui-sliders .ui-slider {
    width: 95%; }
    #pad-wrapper .ui-elements .ui-sliders .ui-slider.slider-sample2, #pad-wrapper .ui-elements .ui-sliders .ui-slider.slider-sample3 {
      margin-top: 20px; }
#pad-wrapper .ui-elements .ui-group {
  margin-top: 35px; }
  #pad-wrapper .ui-elements .ui-group > * {
    margin-right: 5px;
    margin-bottom: 5px; }
#pad-wrapper .ui-elements .knobs {
  overflow: auto; }
#pad-wrapper .ui-elements .knob-wrapper {
  float: left; }
  #pad-wrapper .ui-elements .knob-wrapper .knob {
    box-shadow: none; }
  #pad-wrapper .ui-elements .knob-wrapper .info {
    position: relative;
    top: -20px; }
    #pad-wrapper .ui-elements .knob-wrapper .info .param {
      color: #9da3a9;
      text-align: center; }
      #pad-wrapper .ui-elements .knob-wrapper .info .param .line {
        background-color: #c4cdd8;
        height: 3px;
        width: 25px;
        display: inline-block;
        margin-right: 10px; }
        #pad-wrapper .ui-elements .knob-wrapper .info .param .line.blue {
          background-color: #30a1ec; }

/* table sample below */
.table-products {
  width: 100%; }
  .table-products .filter-block {
    margin-bottom: 34px; }
    .table-products .filter-block .ui-select {
      margin-right: 20px;
      top: 1px;
      height: 24px;
      width: 150px; }
    .table-products .filter-block .search {
      margin: 0 60px 0 0; }
    .table-products .filter-block .new-product {
      padding: 4px 14px; }
  .table-products .table tr.first td {
    border-top: 0 none; }
  .table-products .table td.description {
    vertical-align: middle;
    color: #516372; }
  .table-products .table td a {
    text-decoration: underline;
    margin-top: 6px;
    display: inline-block; }
  .table-products .table th input[type="checkbox"] {
    margin-top: 4px; }
  .table-products .table input[type="checkbox"] {
    float: left;
    margin-top: 11px;
    margin-right: 23px; }
  .table-products .table .img {
    height: 31px;
    float: left;
    background: white;
    width: 31px;
    border: 1px solid #dfe4eb;
    text-align: center;
    cursor: pointer;
    margin-right: 23px; }
    .table-products .table .img img {
      margin-top: 4px; }
  .table-products .table ul.actions {
    margin: 5px 0 0 0;
    padding: 0;
    float: right; }
    .table-products .table ul.actions li {
      display: inline;
      border-right: 1px solid #d0dde9;
      padding: 5px 6px 0px 3px; }
      .table-products .table ul.actions li.last {
        border: 0 none; }
    .table-products .table ul.actions i {
      cursor: pointer;
      opacity: 0.6;
      transition: opacity .1s linear;
      -moz-transition: opacity .1s linear;
      -webkit-transition: opacity .1s linear;
      -o-transition: opacity .1s linear; }
      .table-products .table ul.actions i:hover {
        opacity: 1; }
  .table-products .label {
    position: relative; }
.search-box label {
  display: inline-block;
  margin: 0 2%;
  vertical-align: middle;
}
.search-box input {
  margin-bottom: 0;
  margin-right: 3%;
}
.search-line { width: 79%;}
.search-line >span:not(:last-of-type) { margin-right: 1%;}
 .search-line >span input, .datepicker-input {
   height: 15px;
   line-height: 15px;
   width: 120px;
   vertical-align: middle;
   margin-bottom: 6px;
   margin-top: 6px;
   min-width: 90px;
   box-sizing: content-box;
 }
 .search-line >span input, .search-line >span .ui-select, .datepicker-input{
  margin-left: 3px !important;
  margin-right: 5px;
  min-width: 150px;
 }
 .order-table thead th {
  box-sizing: content-box;
  min-width: 5em;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
.order-table td{
  color: #333 !important;
}
.navbar-inverse .nav > li.uname {
  padding: 13px 15px 8px;
  color: rgb(214, 214, 214);
  outline: 0;
  height: 25px;
}
.search-buttons .btn-glow {
  width: 80px;
  height: 13px;
  line-height: 13px;
  margin-top: 4px;
}
#pad-wrapper {
  margin-top: 20px;
}

/* responsive */
@media (max-width: 767px) {
  #main-stats {
    margin-left: 0px;
    margin-right: 0px; }

  #pad-wrapper .ui-elements .knobs {
    text-align: center; }
    #pad-wrapper .ui-elements .knobs .knob-wrapper {
      float: inherit; }
  #pad-wrapper .ui-elements .showcase {
    text-align: center; }
  #pad-wrapper .table-products .table .img {
    display: none; }
  #pad-wrapper .table-products .table input[type="checkbox"] {
    margin-right: 10px; }
  #pad-wrapper .table-products .table .label {
    display: none; } }
@media (max-width: 979px) {
  #main-stats .stat .data {
    padding-right: 17px; }

  #pad-wrapper .knob-wrapper .info {
    display: none; }

  .pointer {
    top: 5%; } }
@media (min-width: 980px) {
  #pad-wrapper .ui-elements .knob-wrapper + .knob-wrapper {
    margin-left: 5px; } }
@media (min-width: 1200px) {
  #pad-wrapper .ui-elements .showcase {
    width: 53%; }
  #pad-wrapper .ui-elements .knob-wrapper + .knob-wrapper {
    margin-left: 35px; } }
</style>
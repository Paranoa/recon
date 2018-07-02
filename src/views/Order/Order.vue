<template>
  <div class="content">
    <div class="container-fluid">
      <div id="pad-wrapper">
        <div class="table-wrapper products-table section">
          <div class="table-wrapper orders-table section">
            <div class="row-fluid head" style="margin: 15px;">
              <div class="span12"><h4>订单查询</h4></div>
            </div>
            <form class="order_list_frm">
              <div class="row-fluid filter-block">
                <div class="pull-left search-line">
                  <span>搜索：<input type="text" class='name' v-model="query.name" placeholder="姓名/手机号/申请编号" maxlength="25"></span>
                    <span>门店名称：
                      <div class="ui-select">
                        <select name="store_code" class="store_code" v-model="query.store_code">
                          <option value="0">全部</option>
                          <option v-for="store of stores" :key="store.key" :value="status.key">
                            {{ store.val }}
                          </option>
                        </select>
                      </div>
                    </span>
                    <span>状态： 
                      <div class="ui-select">
                        <select name="app_status" class="app_status" v-model="query.app_status">
                          <option value="0">全部</option>
                          <option v-for="status of GEEX_SHOW_STATUS_MEAN" :key="status.key" :value="status.key">
                            {{ status.val }}
                          </option>
                        </select>
                      </div>
                    </span>
                </div>
              </div>
              <div class="row-fluid filter-block">
                  <div class="pull-left search-line">
                      <span>
                          时间：<input type="text" name="search_start" v-model="query.search_start" class="input-large datepicker search_start" maxlength="20"> 
                      至：<input type="text" name="search_end" v-model="query.search_end" class="input-large datepicker search_end" maxlength="20"></span>
                      <span>
                          <label style="display: inline">
                            <input style="width: 10px; min-width:0" type="radio" value="1" v-model="type">申请时间
                          </label>
                          <label style="display: inline">
                            <input style="width: 10px; min-width:0" type="radio" value="2" v-model="type">放款时间
                          </label>
                      </span>
                  </div>
                  <div class="pull-right search-buttons">
                      <div class="btn-glow search_btn" style="margin-right: 10px;"><i class="icon-search"></i>查询</div>
                      <div class="btn-glow out_btn"><i class="icon-download-alt"></i>导出</div>
                  </div>
              </div>
            </form>
            <div class="row-fluid">
              <table class="table table-hover order-table">
                <thead>
                  <tr>
                    <th class="span1"><span class="line"></span>申请时间</th>
                    <th class="span1"><span class="line"></span>客户姓名</th>
                    <th class="span1"><span class="line"></span>客户手机</th>
                    <th class="span1"><span class="line"></span>申请金额</th>
                    <th class="span1"><span class="line"></span>放款金额</th>
                    <th class="span1"><span class="line"></span>放款户名</th>
                    <th class="span1"><span class="line"></span>申请期数</th>
                    <th class="span1"><span class="line"></span>分期类型</th>
                    <th class="span1"><span class="line"></span>审批日期</th>
                    <th class="span1"><span class="line"></span>放款日期</th>
                    <th class="span1"><span class="line"></span>销售姓名</th>
                    <th v-if="ONLINE_MERCHANT.includes(account.merchant_code)" class="span1"><span class="line"></span>商户单号</th>
                    <th v-if="account.merchant_code === 'hlh01'" class="span1"><span class="line"></span>销售座机</th>
                    <th class="span1"><span class="line"></span>产品类型</th>
                    <th class="span1"><span class="line"></span>状态</th>
                    <th class="span1"><span class="line"></span>门店</th>
                    <th class="span1">申请编号</th>
                    <th class="span1">订单类型</th>
                    <th class="span1"><span class="line"></span>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="first" v-for="order of orders" :key="order.C_APP_ID" :value="order.C_APP_ID">
                    <td>{{ order.D_APPLICATION }}</td>
                    <td>{{ order.C_NAME_CN }}</td>
                    <td>{{ order.C_MBL_TEL }}</td>
                    <td>{{ order.N_AMT_APPLIED | fix2 }}</td>
                    <td class="{ red: order.N_APP_STATUS === 130 }">{{ order.N_AMT_DRAWDOWN | fix2 }}</td>
                    <td v-if="[130, 160].includes(+order.N_APP_STATUS)">
                      <template v-if="order.C_FUND_ID === 'NYB01'">
                        {{ order.C_NAME_CN }}
                      </template>
                      <template v-else>
                        {{ LOAN_SHOW_FUND_MEAN[order.C_FUND_ID] }}
                      </template>
                    </td>
                    <td>{{ order.N_TENOR_APPLIED }}</td>
                    <td>{{ order.pdt }}</td>
                    <td>{{ order.D_DECISION.substring(0, 10) }}></td>
                    <td>{{ order.D_DRAWDOWN.substring(0, 10) }}</td>
                    <td>{{ order.C_SALES_ID }}</td>
                    <td v-if="ONLINE_MERCHANT.includes(account.merchant_code)">{{ order.ORDER_ID }}</td>
                    <td v-if="account.merchant_code === 'hlh01'">{{ order.C_SALES_TEL }}</td>
                    <td>
                      <template v-if="order.N_DDG_FLAG === '1'">单单过</template>
                    </td>
                    <td>
                      <span class="label" :class="GEEX_STATUS_CLASS_MAP[order.N_APP_STATUS]">
                        <template v-if="order.N_APP_STATUS === '130' && order.D_SEND_FUND_TIME">
                          已通知银行放款
                        </template>
                        <template v-else>
                          {{ GEEX_ALL_STATUS_MEAN[order.N_APP_STATUS] }}
                        </template>
                      </span>
                    </td>
                    <td>{{ order.STORE_NAME }}</td>
                    <td>{{ order.C_APP_ID }}</td>
                    <td>{{ order.C_APP_TYPE | apptype }}</td>
                    <td>
                      <template v-if="order.N_APP_STATUS === '160'">
                        <div v-if="['0','2','3','4','5','8','21','23'].includes(order.N_LOAN_AFTER_STATUS)" class="btn-glow bt_tryrefund" @click="myRefundModal(order)">退贷预约</div>
                        <div v-else-if="['2','23'].includes(order.N_LOAN_AFTER_STATUS)" class="btn-glow bt_cancelrefund" @click="myCancelRefundModal(order)">查看/取消预约</div>
                        <div class="btn-glow bt_refund" @click="myModal(order)">上传凭证</div>
                        <span v-if="order.N_LOAN_AFTER_STATUS" class="label">{{ LOAN_AFTER_SHOW_STATUS_MEAN[order.N_LOAN_AFTER_STATUS] || '' }}</span>
                        <div v-if="order.SHOW_APPLY_BUTTON" class="btn-glow btn btn-lg bt_applyLoan myApplyLoanModalButton">{{ SHOW_APPLY_BUTTON_NAME }}</div>
                      </template>
                      <template v-else-if="order.N_APP_STATUS === '103'">
                        <div class="btn-glow bt_tryddg" @click="myDDGModal(order)">审核通过</div>
                        <div class="btn-glow bt_refuseddg">审核拒绝</div>
                      </template>
                      <input type="hidden" class="return_mark" v-model="order.mark">
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
        <paginate :page-count="20" :page-range="5" :prev-text="'上一页'" :next-text="'下一页'" :click-handler="change"></paginate>
      </div>
    </div>
  </div>
</template>

<script>
  import Paginate from 'vuejs-paginate'

  export default {
    name: 'order',
    data () {
      return {
        account: {},
        query: {},
        stores: [],
        orders: [],
        GEEX_SHOW_STATUS_MEAN: [],
        ONLINE_MERCHANT: [],
        type: '2',
      }
    },
    components: {
      Paginate
    },
    methods: {
      change (param) {
        console.log(param)
      }
    }
  }
</script>

<style>
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
  .table-products .pagination {
    float: right;
    margin-top: 35px; }
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
 .search-line >span input {
   height: 15px;
   line-height: 15px;
   width: 120px;
   vertical-align: middle;
   margin-bottom: 6px;
   margin-top: 6px;
   min-width: 90px;
 }
 .search-line >span input, .search-line >span .ui-select{
  margin-left: 3px !important;
  margin-right: 5px;
  width: 11%;
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
.pagination-aside {
  padding: 0 46px;
}
 .pagination-aside >span{
  float: left;
  line-height: 48px;
 }
 .pagination-aside > em{
  margin: 0 2px;
  color: #0088cc;
 }
 .pagination-aside > a{
  margin: 0 3px;
  cursor: pointer;
 }
 .pagination-aside .pagination{ 
  display: inline-block; 
  vertical-align: middle;
 }
 .pagination-aside .pagination ul > li >a{
     font-size: 12px;
     color: #4f4f4f;
 }
 .pagination ul {
     vertical-align: middle;
     margin-left: 10px;
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
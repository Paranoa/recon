<template>
  <div id="DdgOrderCloseInfo">
    <BaseModal title="结算信息" :width="width" @close="close">
      <template slot="body">
        <div class="content-body">
          <!-- 查询区域 -->
          <div class="flex">
            <div class="flex">
              <div class="flex heightCenter">
                <span style="font-size:16px;color:#212121;">门店名称</span>
                <select class="select" style="margin-left:10px;" v-model="query.code">
                  <option value="">全部</option>
                  <option v-for="store of belowStores" :key="store.c_STORE_CODE" :value="store.c_STORE_CODE">
                    {{ store.c_NAME }}
                  </option>
                </select>
              </div>
              <div class="flex heightCenter" style="margin-left:60px;">
                <span style="font-size:16px;color:#212121;">时间</span>
                <Datepicker style="margin-left:10px;" input-class="datepicker-input" v-model="query.startDate" />
                <span style="font-size:16px;color:#212121;margin:0px 15px;">至</span>
                <Datepicker input-class="datepicker-input" v-model="query.endDate" />
              </div>
            </div>
            <div class="flex flex1 rightAlignment">
              <div class="button queryBtn" @click="getCashRecord(1)">
                查询
              </div>
              <div class="button exportBtn" style="margin-left:30px;" @click="exportXls">
                导出
              </div>
            </div>
          </div>
          <!-- 表格区域 -->
          <div class="tableRegion">
            <div class="flex1">
              <el-table :data="records" height="100%" :header-cell-style="{'background':'#FAFAFA'}" border>
                <el-table-column min-width="90" header-align="center" align="center" prop="storeName" label="门店"></el-table-column>
                <el-table-column min-width="120" header-align="center" align="center" prop="paymentNo" label="结算流水号"></el-table-column>
                <el-table-column min-width="150" header-align="center" align="center" label="结算日期">
                  <template slot-scope="scope">
                    {{ scope.row.payDate | simpleDate }}
                  </template>
                </el-table-column>
                <el-table-column class="icon" min-width="150" header-align="center" align="center" label="结算金额" :render-header="renderHeader">
                  <template slot-scope="scope">
                    <span @click="showDetail = true, paymentNo = scope.row.paymentNo" style="color:#1AB3FF;cursor: pointer;">{{ scope.row.payAmount | fix2 }}</span>
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
            </div>
            <div style="height:100px;" class="flex heightCenter">
              <el-pagination style="margin:0px auto;" background layout="prev, pager, next" :total="ordersTotal"  @current-change="getCashRecord"></el-pagination>
            </div>
          </div>
        </div>
      </template>
    </BaseModal>
    <aside style="z-index:11111;" class="backdrop" v-show="showDetail"></aside>
    <BillingDetail style="z-index:12111;top:13%;" title="结算信息详情" width="1300px" v-if="showDetail" :modalId="paymentNo" @close="showDetail = false"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BaseModal from '@/components/BaseModal.vue'
  import Datepicker from '@/components/Datepicker.vue'
  import Paginate from '@/components/Paginate.vue'
  import api from '@/api'
  import util from '@/util'
  import BillingDetail from './DdgOrderCloseInfoDetail.vue'

  const ROWS_COUNT = 10
  
  export default {
    props: ['width', 'modalId'],
    data () {
      return {
        query: {
          page: 1,
          code: '',
          startDate: '',
          endDate: ''
        },
        ordersTotal: 0,
        records: [],
        showDetail: false,
        paymentNo: '',
      }
    },
    computed: {
      ...mapGetters(['belowStores', 'merchantCode', 'storeCode', 'isShop'])
    },
    components: {
      BaseModal,
      Paginate,
      Datepicker,
      BillingDetail,
    },
    methods: {
      close () {
        this.$emit('close')
      },
      getCashRecord (page = 1) {
        this.query['page'] = page
        api.ddgBillingInfo({
          page: this.query.page,
          rows: ROWS_COUNT,
          startDate: this.query.startDate,
          endDate: this.query.endDate,
          merchantCode: this.merchantCode,
          storeCode: this.isShop ? this.storeCode : this.query.code,
        })
        .then(res => {
          this.records = res.rows;
          this.ordersTotal = res.total
          // this.records = [{"storeName":"shyj","paymentNo":123,"payDate":"2018-01-01","payAmount":2000,"payCorpus":1000,"charge":1000,"payRisk":1000,"payRepayAllFee":1000}];
          // this.ordersTotal = 1000;
        })
      },
      exportXls () {
        api.ddgExportBillingInfo({
          page: 1,
          rows: 9999,
          startDate: this.query.startDate,
          endDate: this.query.endDate,
          merchantCode: this.$store.getters.merchantCode,
          storeCode: this.query.code === '0'? '' : this.query.code,
        })
        .then(res => {
          if (res && res.size) {
            util.downloadXls(res, '结算信息导出' + new Date().getTime() +'.xls')
            this.$ui.alert('导出成功')
          } else {
            this.$ui.alert('导出失败:' + JSON.stringify(res))              
          }
        })
        .catch(err => this.$ui.alert(err))
      },
      renderHeader(h, { column }) {
        return h("div",{attrs:{style:"height: 23px;line-height: normal;"}}, [
          h("span", column.label),
          h("i", {
            attrs: {
              class: "ico-help",
              title: "点击具体金额可查看结算订单明细"
            }
          })
        ])
      }
    },
    mounted () {
      this.getCashRecord()
    }
  }
</script>

<style>
  #DdgOrderCloseInfo .content-body{
    padding: 30px 35px;
    height: 550px;
    display: flex;
    flex-direction: column;
  }
  #DdgOrderCloseInfo strong{
    font-size: 16px;
  }
  #ddgOrder #DdgOrderCloseInfo .tableRegion{
    padding: 0px;
  }
  #DdgOrderCloseInfo .ico-help {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(../../assets/help.png);
    background-size: 100% 100%;
    vertical-align: middle;
    margin: -5px 5px 0;
    cursor: pointer;
  }
  #DdgOrderCloseInfo .el-table th>.cell{
    height: 23px;
  }
</style>
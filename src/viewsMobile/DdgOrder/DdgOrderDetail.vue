<template>
  <div class="detail-win">
    <header class="info-title">
      <i class="ico ico-back" @click="close"></i>
      订单详情
    </header>
    <ul class="info-box">
      <li>
        <span class="info-label">客户姓名</span>
        <span class="info-text">{{ order.C_NAME_CN }}</span>
      </li>
      <li>
        <span class="info-label">客户手机</span>
        <span class="info-text">{{ order.C_MBL_TEL }}</span>
      </li>
      <li>
        <span class="info-label">申请时间</span>
        <span class="info-text">{{ order.D_APPLICATION }}</span>
      </li>
    </ul>
    <ul class="info-box">
      <li>
        <span class="info-label">贷款金额</span>
        <span class="info-text">{{ order.N_AMT_APPLIED | fix2 }}</span>
      </li>
      <li>
        <span class="info-label">申请期数</span>
        <span class="info-text">{{ order.N_TENOR_APPLIED }}</span>
      </li>
      <li>
        <span class="info-label">分期类型</span>
        <span class="info-text">{{ order.pdt }}</span>
      </li>
    </ul>
    <ul class="info-box">
      <li>
        <span class="info-label">订单状态</span>
        <span class="info-text">
          <template v-if="order.N_APP_STATUS === '130' && order.D_SEND_FUND_TIME">
            已通知银行放款
          </template>
          <template v-else>
            {{ order.N_APP_STATUS | statusMean }}
          </template>
        </span>
      </li>
      <li>
        <span class="info-label">门店名称</span>
        <span class="info-text">{{ order.STORE_NAME }}</span>
      </li>
      <li>
        <span class="info-label">销售姓名</span>
        <span class="info-text">{{ order.C_SALES_ID }}</span>
      </li>
    </ul>
    <div class="txtcenter mgt20 mgb20" v-if="order.N_APP_STATUS === 103">
      <div class="ui-btn ui-btn-white" @click="showRefuseDdg = true, applyDdgId = order.C_APP_ID">审核拒绝</div>
      <div class="ui-btn ui-btn-blue" @click="showApplyDdg = true, applyDdgId = order.C_APP_ID">审核通过</div>
    </div>
    <RefuseDdg v-if="showRefuseDdg" width="85%" 
      @close="showRefuseDdg = false"
      @confirm="showRefuseDdg = false; spReject()"/>

    <ApplyDdg v-if="showApplyDdg" width="85%" :modalId="applyDdgId"
      @close="showApplyDdg = false"
      @success="showApplyDdg = false; $emit('close'); $emit('refresh')"/>
  </div>
</template>

<script>
  import api from '@/api'
  import ApplyDdg from './DdgOrderApplyDdg.vue'
  import RefuseDdg from './DdgOrderRefuseDdg.vue'

  export default {
    props: {
      order: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        showRefuseDdg: false,
        showApplyDdg: false,
        applyDdgId: ''
      }
    },
    components: {
      ApplyDdg,
      RefuseDdg
    },
    methods: {
      close () {
        this.$emit('close')
      },
      spReject () {
        api.ddgRefuse({
          appId: this.applyDdgId
        })
        .then(() => { 
          alert('拒绝成功')
          this.$emit('close')
          this.$emit('refresh')
        })
        .catch(err => alert(err))
      }
    } 
  }  
</script>

<style scoped>
  .ico { display: inline-block; width: 20px; height: 20px; vertical-align: middle; margin-right: 10px; background-repeat: no-repeat; background-size: 10px; background-position: center }
  .ico-back { background-image: url(../../assets/ico/ico-arr-gray-left.png); position: absolute; left: 15px; top: 12px; } 
  .info-title { line-height: 44px; text-align: center; font-size: 17px; border-bottom: 1px solid #d7d7d7 }
  .detail-win { position: fixed; width: 100%; height: 100%; left: 0; top: 0; z-index: 10; background: #f5f5f5; overflow: auto }
  ul.info-box { background: #fff; list-style: none; margin-left: 0; margin-bottom: 10px; padding: 0 10px }
  ul.info-box li { line-height: 20px; padding: 12px 0; }
  ul.info-box span.info-label { font-size: 15px; color: #444444; display: inline-block; min-width: 6em }
  ul.info-box span.info-text { font-size: 14px; color: #585858; margin-left: 20px }
  .ui-btn { display: inline-block; line-height: 40px; text-align: center; font-size: 17px; border-radius: 50px; border: 1px solid }
  .ui-btn-white, .ui-btn-blue { width: 160px; margin: 0 10px  }
  .ui-btn-white { color: #1AB3FF; border-color: #1AB3FF; background: #fff; }
  .ui-btn-blue { color: #fff; border-color: #1AB3FF; background: #1AB3FF; }

  @media (max-width: 370px) {
    .ui-btn-white, .ui-btn-blue { width: 130px; margin: 0 10px  }
  }
</style>
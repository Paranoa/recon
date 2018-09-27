<template>
  <div id="menuLeft">
      <ul>
        <router-link v-if="[1, 3, 4].includes(+role)" :to="{name:'homeIndex'}" active-class="active" tag="li">
            <img src="../assets/ico/home.png" style="margin-right:10px;" />
            <span>首页</span>
        </router-link>
        <router-link v-if="[1, 3, 4].includes(+role)" :to="{name:'cardOrder'}" active-class="active" tag="li">
            <img src="../assets/ico/shuaka.png" style="margin-right:10px;" />
            <span>刷卡订单</span>
        </router-link>
        <router-link v-if="[1, 3, 4].includes(+role)" :to="{name:'order'}" active-class="active" tag="li">
            <img src="../assets/ico/wuka.png" style="margin-right:10px;" />
            <span>无卡订单</span>
        </router-link>
        <router-link v-if="[3, 4].includes(+role)" :to="{name:'ddgOrder'}" active-class="active" tag="li">
            <img src="../assets/ico/dandan.png" style="margin-right:10px;" />
            <span>单单过订单</span>
        </router-link>
        <router-link v-if="[92].includes(+role)" :to="{name:'tkorder'}" active-class="active" tag="li">
            <img src="../assets/ico/dandan.png" style="margin-right:10px;" />
            <span>退款处理</span>
        </router-link>
      </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['role'])
  },
  methods: {
    
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.routeName = to.name
    })
  },
  beforeRouteUpdate(to, from, next) {
    next()
  }
}
</script>
<style>
    #menuLeft{
        width: 100%;
        height: 100%;
        background-color: #192C4A;
    }
    #menuLeft li{
        color: #fff;
        font-size: 17px;
        height: 60px;
        display: flex;
        align-items: center;
        padding-left: 20px;
        margin: 0px;
        letter-spacing:2px;
        cursor: pointer;
    }
    #menuLeft li.active{
        background-color: #0083FC;
    }
</style>

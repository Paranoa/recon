<template>
  <header id="headerLayout">
    <div id="pcHeader">
      <!-- 左侧log -->
      <div class="left">
        <img class="hand" style="margin-left:20px;" src="../assets/logo_wechat1.png" />
      </div>
      <!-- 右侧菜单 -->
      <div class="right">
        <div v-if="false" class="hand" style="margin-right:30px;">
          消息中心
          <el-badge class="mark" v-if="messageNum!=0" :value="messageNum" />
        </div>
        <div class="hand" style="margin-right:45px;" @click="resetPwd">
          修改密码
        </div>
        <div class="hand" @click="logout">
          <img style="margin-right:5px;" src="../assets/ico/ico-logout.png" />
          <span>退出</span>
        </div>
      </div>
    </div>
    <aside class="backdrop" v-show="showResetPwd"></aside>
    <resetpwd title="修改密码" width="600px" v-if="showResetPwd" @close="showResetPwd = false"/>
  </header>
</template>
<script>
import { mapGetters } from 'vuex'
import resetpwd from '../views/Resetpwd/Resetpwd.vue'
export default {
  name: 'headerLayout',
  data () {
    return {
      messageNum: '13',
      showResetPwd:false,
    }
  },
  computed: {
    ...mapGetters(['cName'])
  },
  components: {
    resetpwd,
  },
  methods: {
    resetPwd () {
      this.showResetPwd = true;
    },
    logout () {
      this.$ui.confirm('确定要退出吗？', (confirm) => {
        this.$store.dispatch('Logout')
        .then(() => {
          confirm.close()
          this.$router.push('/')
        })
        .catch(err => this.$ui.alert(err))
      })
    }
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
#pcHeader{
  display: flex;
  height: 60px;
  align-items: center;
  background: #1A2D4A;
}
#pcHeader .left{
  width: 300px;
}
#pcHeader .right{
  display: flex;
  flex: 1;
  justify-content:flex-end;
  color: #fff;
  font-size: 15px;
  margin-right: 25px;
}
#pcHeader .right .el-badge__content{
  display: initial;
  width: 14px;
  height: 14px;
  line-height: 14px;
  border:none;
  background-color: #FF4646;
}
</style>


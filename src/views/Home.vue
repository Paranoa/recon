<template>
  <div id="home">
    <headerlayout></headerlayout>
    <div class="flex flex1">
      <div class="leftMenu">
        <menuleft></menuleft>
      </div>
      <div class="rightContent">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import headerlayout from '@/layout/header_layout'
import menuleft from '@/layout/menu_left_layout'

export default {
  name: 'home',
  data () {
    return {

    }
  },
  components: {
    menuleft,
    headerlayout,
  },
  methods: {
    resetPwd () {
      this.$router.push('/home/resetpwd')
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
  #home{
    display: flex;
    flex-direction:column;
    min-width: 1366px;
  }
  #home .leftMenu{
    width: 180px;
    min-height: calc(100vh - 60px);
  }
  #home .rightContent{
    display: flex;
    width: calc(100% - 180px);
    height: calc(100vh - 60px);
  }
</style>

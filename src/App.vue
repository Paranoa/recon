<template>
  <div id="app">
    <router-view/>
    <VLoadMask v-if="showLoading" />
  </div>
</template>

<script>
  import 'bootstrap/dist/js/bootstrap.min.js'
  import VLoadMask from '@/components/VLoadMask.vue'

  export default {
    name: 'App',
    computed: {
      showLoading () {
        return this.$store.state.showLoading
      }
    },
    components: {
      VLoadMask
    }
  }
</script>

<style>
  .fl { float: left !important }
  .fr { float: right !important }
  .fbld { font-weight: bold; }
  .txtcenter { text-align: center !important }
  .backdrop { background: rgba(0,0,0,.5); position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10000; }
  .modal-dialog { z-index: 11000; position: fixed; top: 10%; left: 0; right: 0; }
  .modal-dialog .modal-content { margin: auto; background: #fff; border-radius: 5px;}
</style>
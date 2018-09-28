<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import 'bootstrap/dist/js/bootstrap.min.js'
  import 'url-search-params-polyfill'
  import 'es6-object-assign/dist//object-assign-auto.min.js' // object.assign polyfill

  export default {
    name: 'App',
    mounted:function(){
      let _this = this;
      //监听分辨率变化判断终端类型
      _this.$store.commit('common/setTerminal',$(window).width()>767?'pc':'mobile'); 
      $(window).resize(function () {
        _this.$store.commit('common/setTerminal',$(window).width()>767?'pc':'mobile'); 
      });
    }
  }
</script>

<style>
  .fl { float: left !important }
  .fr { float: right !important }
  .fbld { font-weight: bold; }
  .rel { position: relative; }
  .txtcenter { text-align: center !important }
  .txtright { text-align: right !important }
  .txtrt { text-align: right !important }
  .inb { display: inline-block; }
  .backdrop { background: rgba(0,0,0,.5); position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10000; }
  .modal-dialog { z-index: 11000; position: fixed; top: 10%; left: 0; right: 0; }
  .modal-dialog .modal-content { margin: auto; background: #fff; border-radius: 5px;}
  .fix:after { content: ''; display: table; clear: both }
  .fix-apple-iframe { -webkit-overflow-scrolling:touch; overflow:auto; }
  .ofauto { overflow: auto }

  .mgt5 { margin-top: 5px }
  .mgt10 { margin-top: 10px }
  .mgt20 { margin-top: 20px }
  .mgb20 { margin-bottom: 20px }
  .wd50p { width: 50% }
  .wd25p { width: 25% }
</style>
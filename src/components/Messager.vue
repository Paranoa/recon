<template>
  <div class="ui-msg-container">
    <div class="ui-msg-box" :style="boxStyle">
      <header class="ui-msg-title">
        <i class="ico ico-notice"></i>{{ title }}<i class="ico ico-close" @click="cancel"></i>
      </header>
      <div class="ui-msg-text">
        <div>
          {{ message }}
          <slot></slot>
        </div>
      </div>
      <footer class="btn-groups">
        <template v-if="type === 'alert'">
          <a class="btn btn-blue" @click="confirm">{{ confirmBtnTxt }}</a>
        </template>
        <template v-else-if="type === 'confirm'">
          <a class="btn btn-white" @click="cancel">{{ cancelBtnTxt }}</a>
          <a class="btn btn-blue" @click="confirm">{{ confirmBtnTxt }}</a>
        </template>
      </footer>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'alert'
      },
      boxStyle: {
        type: Object,
        default: function () {
          return {
            width: '380px'
          } 
        }
      },
      title: {
        type: String,
        default: '温馨提示'
      },
      message: {
        type: String,
        default: ''
      },
      cancelBtnTxt: {
        type: String,
        default: '取消'
      },
      confirmBtnTxt: {
        type: String,
        default: '确认'
      }
    },
    methods: {
      cancel () {
        this.$emit('cancel')
      },
      confirm () {
        this.$emit('confirm')
      }
    }
  }
</script>

<style scoped>
  .ui-msg-container { position: fixed; left: 0; right: 0; top: 50%; margin-top: -200px; z-index: 12000; }
  .ui-msg-box { margin: auto; background: #fff; border-radius: 6px; overflow: hidden; }
  .ui-msg-title { background: #192C4A; color: #fff; font-size: 18px; text-align: center; line-height: 20px; padding: 15px ; }
  .ui-msg-text { padding: 0px 20px; height: 110px; line-height: 110px; text-align: center; overflow: auto; margin: 0; vertical-align: middle;}
  .ui-msg-text >div { display: inline-block; line-height: 1.5; font-size: 17px; color: #212121; vertical-align: middle;}
  .ico { display: inline-block; width: 20px; height: 20px; vertical-align: middle; background-size: 100% 100%; margin: -4px 5px 0;}
  .ico-notice { background-image: url(../assets/ico/ico-light.png); }
  .ico-close { background-image: url(../assets/ico/ico-close-white.png); float: right; margin-top: 0; cursor: pointer; }
  .btn { cursor: pointer; font-size: 17px; letter-spacing: 0; text-align: center; border-radius: 100px; margin: 0 8px; padding: 4px 37px; }
  .btn:hover { opacity: .8 }
  .btn-white { background: #FAFAFA; color: #777; border: 1px solid #A0A0A0; box-shadow: 0 1px 3px 0 rgba(210,210,210,0.92);}
  .btn-blue { background: #1A9BFE; color: #fff; box-shadow: 0 1px 3px 0 rgba(68,165,249,0.92); }
  .btn-groups { text-align: center; padding-top: 5px; padding-bottom: 20px; }
</style>
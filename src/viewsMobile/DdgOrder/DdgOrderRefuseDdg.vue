<template>
  <div>
    <BaseModal title="申请单单过" :width="width" @close="$emit('close')">
      <template slot="body">
        <div class="main-box txtcenter">
          <span class="inb main-text">确定要拒绝这笔订单吗？</span>
        </div>
      </template>
      <template slot="footer">
        <div class="fl wd50p btn-white" @click="$emit('close')">取消</div>
        <div class="fl wd50p btn-blue" @click="$emit('confirm')">确定</div>
      </template>
    </BaseModal>
    <aside class="backdrop" @click="close"></aside>
  </div>
</template>

<script>
  import BaseModal from '@/components/BaseModal.vue'

  export default {
    props: ['width', 'modalId'],
    components: {
      BaseModal
    }
  }
</script>

<style scoped>
  .main-box { font-size: 16px; min-height: 80px; line-height: 80px; }
  .main-text { line-height: 1.2 }
  .btn-white, .btn-blue { text-align: center; line-height: 40px; font-size: 17px }
  .btn-white { color: #585858; background: #fff  }
  .btn-blue { color: #fff; background: #1BB3FD }
  .iframe-box { position: fixed; top: 50px; left: 5%; width: 90%; height: 550px; z-index: 20000; border-radius: 10px; overflow: hidden; }
  .iframe-box iframe { width: 100%; height: 100%; }
</style>
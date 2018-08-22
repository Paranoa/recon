<template>
  <div class="modal-dialog">
    <div class="modal-content" :style="{ width: width }">
      <div class="modal-header">
        <button type="button" class="close" @click="close">×</button>
        <h4 class="modal-title">{{ title }}</h4>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
/***
* 模态框基组件
* @prop: 
* width {String} : 对应css width属性值
* title {String} : 模态框标题
*/
export default {
  props: ['width', 'title'],
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .modal-body { max-height: none }
  @media (max-width: 500px) {
    .modal-title { font-size: 17px }
    .modal-header { color: #212121; text-align: center; border-bottom: 1px solid #E7E7E7 }
    .modal-footer { padding: 0; background: none; border-top: 1px solid #E7E7E7; overflow: hidden; }
  }
</style>
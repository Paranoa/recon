<template>
  <div class="modal-dialog">
    <div class="modal-content" :style="{ width: width }">
      <div class="modal-header">
        <h4 class="modal-title">{{ title }}</h4>
        <div class="closeBnt" @click="close">
          ×
        </div>
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
  .modal-body { max-height: none;padding: 0px; }
  .modal-content{
    border-radius: 6px;
  }
  .modal-header{
     background-color: #192C4A;
     display: flex;
     justify-content:space-between;
     border-radius: 6px 6px 0px 0px;
  }
  .modal-title{
    color: #fff;
  }
  .modal-dialog .closeBnt{
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 100px;
    font-size: 24px;
    text-align: center;
    cursor: pointer;
  }
  @media (max-width: 500px) {
    .modal-title { font-size: 17px }
    .modal-header { color: #212121; text-align: center; border-bottom: 1px solid #E7E7E7; }
    .modal-footer { padding: 0; background: none; border-top: 1px solid #E7E7E7; overflow: hidden; }
  }
</style>
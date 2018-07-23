<template>
  <BaseModal :title="title" :width="width" @close="close">
    <template slot="body">
      <div>
        <div style="margin:10px auto; width: 400px;height: 50px">
          <div>
            <span style="color: red">请选择提现金额（整数）:</span>
            <input type="number" v-model="cashAmount">
          </div>
        </div>
      </div>
    </template>
    <template slot="footer">
      <button type="button" class="btn btn-primary" @click="confirm">确认</button>
      <button type="button" class="btn btn-default" @click="close">关闭</button>
    </template>
  </BaseModal>
</template>

<script>
  import BaseModal from '@/components/BaseModal'

  export default {
    props: ['title', 'width', 'modalId'],
    data () {
      return {
        cashAmount: 100
      }
    },
    computed: {
      formValidate () {
        return /^[1-9](\d+)?$/.test(this.cashAmount)
      }
    },
    components: {
      BaseModal
    },
    methods: {
      confirm () {
        if (this.formValidate) {
          console.log(this.modalId + ' ' + this.cashAmount)
          this.$emit('inputed', this.cashAmount)
        } else {
          alert('提现金额1元起提，且金额为整数')
        }
      },
      close () {
        this.$emit('close')
      }
    }
  }
</script>
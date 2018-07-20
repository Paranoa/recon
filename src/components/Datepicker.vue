<template>
  <Datepicker format="yyyy-MM-dd" :input-class="inputClass" :language="zh" v-model="dateModel" @input="input" />
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import { zh } from 'vuejs-datepicker/dist/locale'
  import util from '@/util'

  export default {
    props: ['value', 'inputClass'],
    data () {
      return {
        dateModel: this.value,
        zh
      }
    },
    components: {
      Datepicker
    },
    methods: {
      input () {
        this.$emit('input', util.dateToString(this.dateModel))
      }
    }
  }
</script>
<style>
  .vdp-datepicker { display: inline-block; color: #555; }
  .vdp-datepicker__calendar { width: 220px; border-radius: 5px }
  .vdp-datepicker__calendar .cell { border-radius: 2px; line-height: 30px; height: 30px }
  .vdp-datepicker__calendar .cell.selected { color: #fff }
</style>
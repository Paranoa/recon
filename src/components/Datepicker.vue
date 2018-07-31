<template>
  <Datepicker format="yyyy-MM-dd" :input-class="inputClass" :language="zh" v-model="dateModel" :disabled-dates="disabledDates" @input="input" />
</template>

<script>
/***
* 日期选择组件
* @prop: 
* value(v-model): 绑定数据
* inputClass: 输入框class
* disabledDates: 禁用日期
*
* @evnet:
* input: 输出yyyy-MM-dd格式的String
*
* view format固定为yyyy-MM-dd
*/
import Datepicker from 'vuejs-datepicker'
import { zh } from 'vuejs-datepicker/dist/locale'
import util from '@/util'

export default {
  props: ['value', 'inputClass', 'disabledDates'],
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
      this.$emit('input', util.dateToString(this.dateModel), '-')
    }
  }
}
</script>
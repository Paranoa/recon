<template>
  <Datepicker format="yyyy-MM-dd" :id="id" :input-class="inputClass" :language="zh" v-model="dateModel" :disabled-dates="disabledDates" @input="input" @opened="opened"/>
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
  props: ['value', 'id', 'inputClass', 'disabledDates'],
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
    },
    opened () {
      this.$emit('opened')
    }
  }
}
</script>
<style>
  .vdp-datepicker input { box-sizing: content-box }
  .vdp-datepicker { display: inline-block; color: #555; }
  .vdp-datepicker__calendar { width: 220px; border-radius: 5px }
  .vdp-datepicker__calendar .cell { border-radius: 2px; line-height: 30px; height: 30px }
  .vdp-datepicker__calendar .cell.selected { color: #fff }
  .vdp-datepicker__calendar header .prev:after {
    border-right: 10px solid #666;
    margin-left: -5px;
  }
  .vdp-datepicker__calendar header .next:after {
    border-left: 10px solid #666;
    margin-left: 5px;
  }
</style>
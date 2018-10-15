<template>
  <div id="Datepicker">
    <Datepicker format="yyyy-MM-dd" :id="id" :input-class="inputClass" :language="zh" v-model="dateModel" :disabled-dates="disabledDates" @input="input" @opened="opened" style="background-image:url('../assets/ico/rili.png')"/>
    <img style="margin-left:-30px;" src="../assets/ico/rili.png" />
  </div>
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
  div.vdp-datepicker input { box-sizing: content-box;width: 166px; }
  div.vdp-datepicker { display: inline-block; color: #555; }
  div.vdp-datepicker__calendar { width: 220px; border-radius: 5px }
  div.vdp-datepicker__calendar .cell { border-radius: 2px; line-height: 30px; height: 30px }
  div.vdp-datepicker__calendar .cell.selected { color: #fff }
  div.vdp-datepicker__calendar header .prev:after {
    border-right: 10px solid #1A9BFE;
    margin-left: -5px;
  }
  div.vdp-datepicker__calendar header .next:after {
    border-left: 10px solid #1A9BFE;
    margin-left: 5px;
  }
  .cell{
    font-size: 14px;
    font-weight:normal;
  }
  .day__month_btn.up{
    font-size: 16px;
    font-weight: bold;
  }
  .day-header{
    background-color: #192C4A;
    color: #fff;
    border-radius: 0px !important;
  }
  .day-header:hover{
    background-color: #192C4A !important;
  }
  .vdp-datepicker__calendar .cell.selected{
    background-image: linear-gradient(-180deg, #51C2FF 2%, #1A9BFE 97%);
    box-shadow: 0 1px 3px 0 rgba(37,162,233,0.47);
    border-radius: 100px;
  }
  .vdp-datepicker__calendar .cell.selected:hover{
    background-image: linear-gradient(-180deg, #51C2FF 2%, #1A9BFE 97%);
  }
  div.vdp-datepicker input{
    margin: 0px;
  }
  #Datepicker input[readonly]{
    background: rgba(0,0,0,0);
    color: #5f5f5f;
    cursor: pointer;
  }
</style>
<template>
  <Paginate v-model="page" :page-count="pageCount" :page-range="pageRange" :prev-text="'上一页'" :next-text="'下一页'" :click-handler="change" @resetPage="resetPage"/>
</template>

<script>
/***
* 页码显示组件
* @prop: 
* total {Number} : 数据总数
* rowsCount {Number} : 每页条数(默认10)
* pageRange {Number} : 不包括首页 末页 包括省略号的页码按钮总数(不应小于3)
*
* @event 
* change: 页码变更时触发
*/
import Paginate from 'vuejs-paginate'

export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    rowsCount: {
      type: Number,
      default: 10
    },
    pageRange: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      page: 1
    }
  },
  computed: {
    pageCount () {
      return (Math.ceil(this.total / this.rowsCount) || 1)
    }
  },
  components: {
    Paginate
  },
  methods: {
    change (page) {
      this.$emit('change', page)
    },
    resetPage () {
      this.page = 1
    }
  }
}
</script>
<style>
</style>
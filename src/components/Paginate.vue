<template>
  <Paginate :page-count="pageCount" :page-range="pageRange" :prev-text="'上一页'" :next-text="'下一页'" :click-handler="change"/>
</template>

<script>
  import Paginate from 'vuejs-paginate'

  export default {
    props: {
      pageCount: {
        type: Number,
        default: 1
      },
      pageRange: {
        type: Number,
        default: 5
      }
    },
    components: {
      Paginate
    },
    methods: {
      change (page) {
        this.$emit('change', page)
      }
    }
  }
</script>
<style>
</style>
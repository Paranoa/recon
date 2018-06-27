<template>
  <div>
    <div class="arrow"></div>
    <div class="arrow_border"></div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'HomePoint'
  }
</script>

<style scoped>
  .arrow, .arrow_border {
    border-color: transparent #fff transparent transparent;
    border-width: 11px;
    border-style: solid;
    font-size: 0;
    left: 50%;
    line-height: 0;
    margin: 0 auto;
    position: absolute;
    top: 0;
    width: 0;
    z-index: 1002;
    left: 0;
    margin-left: 45%;
  }

  .arrow_border {
    border-color: transparent rgb(192, 210, 221) transparent transparent;
    border-width: 11px;
    margin-left: -1px;
    border-style: solid;
    z-index: 1001;
    top: 0px;
  }
</style>
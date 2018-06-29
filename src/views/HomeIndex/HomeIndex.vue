<template>
  <div class="content">
    <div class="container-fluid">
      <form name='index_frm' class="index_frm" method="GET">
        <input type='hidden' name='action' class='action' value='index'/>
        <input type='hidden' name='do' class='do' value='main'/>
        <!-- upper main stats -->
        <div id="main-stats">
          <div class="row-fluid stats-row">
            <div class="span3 stat">
              <div class="data">
                <p>总订单数</p>
                <span class="number" id="num1">{{num1}}</span>
              </div>
            </div>
            <div class="span3 stat">
              <div class="data">
                <p>已通过订单数</p>
                <span class="number" id="num2">{{num2}}</span>
              </div>
            </div>
            <div class="span3 stat">
              <div class="data">
                <p> 总贷款金额</p>
                <span class="number">¥</span><span class="number" id="num3">{{num3}}</span>
              </div>
            </div>
            <div class="span3 stat last">
              <div class="data">
                <p>已通过贷款金额</p>
                <span class="number">¥</span><span class="number" id="num4">{{num4}}</span>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 20px">
          <div class="alert alert-success search-box">
            <div class="field-box">
              <label>开始时间:</label>
              <input type="text"  name='search_start' class="input-large datepicker search_start" maxlength="20" autocomplete="off">
              <label>结束时间:</label>
              <input type="text" name='search_end' class="input-large datepicker search_end" maxlength="20" autocomplete="off">
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'

export default({
    name: "homeIndex",
    data: function () {
        return {
            num1: "",
            num2: "",
            num3: "",
            num4: "",
            search_start: "",
            search_end: ""
        }
    },
    mounted: function () {
        var _this = this;

        $(".search_start").val("2018-05-29");
        $(".search_end").val("2018-06-28");

        loadSubmit();

        function loadSubmit () {
            api.get('../mock/test.json').
            then(res => {
                _this.num1 = res.num1;
                _this.num2 = res.num2;
                _this.num3 = res.num3;
                _this.num4 = res.num4;
                refresh();
            })
        }

        function refresh () {
            new CountUp("num1", 0, parseInt(_this.num1 || 0), 0, 2).start();
            new CountUp("num2", 0, parseInt(_this.num2 || 0), 0, 2).start();
            new CountUp("num3", 0, parseInt(_this.num3 || 0), 0, 2).start();
            new CountUp("num4", 0, parseInt(_this.num4 || 0), 0, 2).start();
        }

        $('.datepicker').datepicker().on('changeDate', function (ev) {
            $(this).datepicker('hide');

            _this.search_start = $(".search_start").val();
            _this.search_end = $(".search_end").val();

            loadSubmit()
        });
    }
})
</script>

<style scoped>
  /*.datepicker{cursor: pointer;background: #fff;color: #555555;}*/
</style>
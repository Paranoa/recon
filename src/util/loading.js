import Loading from '@/components/VLoadMask.vue'
import Vue from 'vue'

// 全屏的loading层 是一个单例
var fullScreenLoading

export default {
  service: function () {
    var LoadingConstructor = Vue.extend(Loading)

    LoadingConstructor.prototype.close = function () {
      fullScreenLoading = undefined
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      this.$destroy();
    }

    var div = document.createElement('div')
    document.getElementById('app').append(div)

    if (!fullScreenLoading) {
      fullScreenLoading = new LoadingConstructor({
        el: div
      })
    }

    return fullScreenLoading
  }
};

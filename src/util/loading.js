import Loading from '@/components/VLoadMask.vue'
import Vue from 'vue'

export default {
  service: function () {
    var LoadingConstructor = Vue.extend(Loading)
    LoadingConstructor.prototype.close = function () {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      this.$destroy();
    }

    var div = document.createElement('div')
    document.getElementById('app').append(div)

    return new LoadingConstructor({
      el: div
    })
  }
};

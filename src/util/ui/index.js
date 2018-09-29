import Vue from 'vue'
import Loading from '@/components/VLoadMask.vue'
import Mask from '@/components/VBackDropMask.vue'
import Messager from '@/components/Messager.vue'

// 全屏的loading层 是一个单例
var fullScreenLoading
var backDropMask

var loading = {
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
    document.getElementById('app').appendChild(div)

    if (!fullScreenLoading) {
      fullScreenLoading = new LoadingConstructor({
        el: div
      })
    }

    return fullScreenLoading
  }
}

var mask = {
  service: function () {
    var maskConstructor = Vue.extend(Mask)
    if (!backDropMask) {
      maskConstructor.prototype.close = function () {
        backDropMask = undefined
        if (this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el);
        }
        this.$destroy();
      }

      backDropMask = apendComponent(maskConstructor)
    }

    return backDropMask
  }
}

var confirm = function (props, confirm, cancel) {
  if (typeof props === 'string') {
    props = {
      message: props
    }
  }

  var backDropMask = mask.service()

  var messagerConstructor = Vue.extend(Messager)

  messagerConstructor.prototype.close = function () {
    if (document.querySelectorAll('.ui-msg-container').length === 1) {
      backDropMask.close()
    }

    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.$destroy()
  }

  var instance =  apendComponent(messagerConstructor, {
    propsData: {
      type: 'confirm',
      ...props
    },
    methods: {
      confirm: confirm || (() => { instance.close() }),
      cancel: cancel || (() => { instance.close() })
    }
  })

  return instance
}

var alert = function (props, confirm, cancel) {
  if (typeof props === 'string') {
    props = {
      message: props
    }
  }

  var backDropMask = mask.service()

  var messagerConstructor = Vue.extend(Messager)

  messagerConstructor.prototype.close = function () {
    if (document.querySelectorAll('.ui-msg-container').length === 1) {
      backDropMask.close()
    }

    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.$destroy()
  }

  var instance = apendComponent(messagerConstructor, {
    propsData: {
      ...props
    },
    methods: {
      confirm: confirm || (() => { instance.close() }),
      cancel: cancel || (() => { instance.close() })
    }
  })

  return instance
}

function apendComponent (constructor, options) {
  var div = document.createElement('div')
  document.getElementById('app').appendChild(div)

  var instance = new constructor({
    el: div,
    ...options
  })

  return instance
}

export default { 
  loading,
  mask,
  confirm,
  alert
}
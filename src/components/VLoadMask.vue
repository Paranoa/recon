<template>
  <transition name="fade">
    <div class="ui-loader">
      <div class="ui-spinner">
        <div class="ui-spinner-container container1">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="ui-spinner-container container2">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="ui-spinner-container container3">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'VLoadMask'
  }
</script>

<style scoped>
  .ui-loader { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 20000; background: rgba(255,255,255,.6); }
  .ui-loader .ui-spinner { position: absolute; left: 0; top: 0; right: 0; bottom: 0; margin: auto; }

  .fade-enter, .fade-leave-active { opacity: 0 }
  .fade-enter-active, .fade-leave-active { transition: opacity .3s; }

  .ui-spinner {
    margin: 100px auto;
    width: 20px;
    height: 20px;
    position: relative;
  }
   
  .ui-spinner .container1 > div, .ui-spinner .container2 > div, .ui-spinner .container3 > div {
    width: 6px;
    height: 6px;
    background-color: #333;
   
    border-radius: 100%;
    position: absolute;
    -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
    animation: bouncedelay 1.2s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
   
  .ui-spinner .ui-spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
   
  .ui-spinner .container2 {
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
  }
   
  .ui-spinner .container3 {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }
   
  .ui-spinner .circle1 { top: 0; left: 0; }
  .ui-spinner .circle2 { top: 0; right: 0; }
  .ui-spinner .circle3 { right: 0; bottom: 0; }
  .ui-spinner .circle4 { left: 0; bottom: 0; }
   
  .ui-spinner .container2 .circle1 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
   
  .ui-spinner .container3 .circle1 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
   
  .ui-spinner .container1 .circle2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
   
  .ui-spinner .container2 .circle2 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
   
  .ui-spinner .container3 .circle2 {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }
   
  .ui-spinner .container1 .circle3 {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }
   
  .ui-spinner .container2 .circle3 {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
   
  .ui-spinner .container3 .circle3 {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }
   
  .ui-spinner .container1 .circle4 {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }
   
  .ui-spinner .container2 .circle4 {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }
   
  .ui-spinner .container3 .circle4 {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }
   
  @-webkit-keyframes bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
  }
   
  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 40% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
</style>
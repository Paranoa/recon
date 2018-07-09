<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import 'bootstrap/dist/js/bootstrap.min.js'

  export default {
    name: 'App'
  }
</script>

<style>
  /*reset*/
  body, h1, h2, h3, h4, h5, p, dl, dd, ul, ol, form, input, textarea, th, td, select { margin: 0; padding: 0;}
  button { font: 16px/1.5 "Microsoft Yahei", "Simsun";}
  i, em, b { font-style: normal; font-weight: normal; color: #333;}
  li { list-style: none;}
  a { text-decoration: none;}
  a:hover { text-decoration: none; }
  img, fieldset { border: none; vertical-align: top;}
  table { border-collapse: collapse;}
  input, textarea, select { outline: none; color: #333;}
  textarea { resize: none; overflow: auto; vertical-align: top;}
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block;}
  h1,h2,h3,h4,h5 { font-weight: normal;}
  button { background: #fff; outline: none; border: none; font-size: inherit; color: inherit; }

  .fl { float: left !important }
  .fr { float: right !important }
  .fbld { font-weight: bold; }
  
  .backdrop { background: rgba(0,0,0,.5); position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10000; }
  .modal-dialog { z-index: 11000; position: fixed; top: 10%; left: 0; right: 0; }
  .modal-dialog .modal-content { margin: auto; background: #fff; border-radius: 5px;}
</style>
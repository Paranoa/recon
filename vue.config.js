const webpack = require('webpack')  
// The object will be merged into the final webpack config using webpack-merge

module.exports = {
  baseUrl: process.env.VUE_APP_NAME,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
      })
    ]
  },
  devServer: {
    // proxy: 'https://beta.geexfinance.com/geex-merchant-recon/'
    proxy: 'http://192.168.8.110:8081/geex-merchant-recon-provider/'
    // proxy: 'http://192.168.8.59:8080/'
  }
}

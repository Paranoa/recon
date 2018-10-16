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
    // proxy:{
    //   "/geex-merchant-recon-provider":{
    //       target:"https://beta.geexfinance.com/recon-web"
    //   }
    // }
  }
}

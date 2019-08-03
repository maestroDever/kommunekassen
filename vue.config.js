const webpack = require('webpack')
let assetsDir = 'assets'

module.exports = {
  assetsDir: assetsDir,

  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
    output: {
      filename: assetsDir + '/kommunekassen-[name].js',
      chunkFilename: assetsDir + '/kommunekassen-[name].js'
    }
  },
  chainWebpack: config => {
    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css')
      extractCSSPlugin &&
        extractCSSPlugin.tap(() => [
          {
            filename: assetsDir + '/kommunekassen-[name].css',
            chunkFilename: assetsDir + '/kommunekassen-[name].css'
          }
        ])
    }
    config.optimization.delete('splitChunks')

    // config.plugins
    //   .delete('html')
    //   .delete('prefetch')
    //   .delete('preload')
  }
}

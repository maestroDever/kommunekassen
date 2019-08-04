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

    const fontsRule = config.module.rule('fonts')

    fontsRule.uses.clear()

    config.module
      .rule('fonts')
      .test(/\.(ttf|otf|eot|woff|woff2|svg)$/)
      .use('base64-inline-loader')
      .loader('base64-inline-loader')
      .options({
        name: './src/assets/icons/font/[name].[ext]'
      })
      .end()
  }
}

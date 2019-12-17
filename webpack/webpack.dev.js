const merge = require('webpack-merge');
const path = require('path')
const MyPlugin = require('./plugin/myPlugin')
const common = require('./webpack.common.js');

module.exports = function () {
  return merge(common(), {
    mode: 'development',
    output: {
      filename: '[name].[hash:6].js',
      chunkFilename: '[name].[hash:6].js',
      path: path.resolve(__dirname, 'dist'),
      pathinfo: false,

    },
    devtool: 'source-map',
    devServer: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      contentBase: [path.resolve('src/public')],
      hot: true,
      noInfo: true,
      clientLogLevel: 'warn',
      stats: 'none',
      // stats: 'minimal',
      overlay: true,
      useLocalIp: true,
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.(js|vue)$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            // emitError: true,
            emitWarning: true,
            failOnError: true,
            // formatter: 'codeframe',
            // quiet:true
          }
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  // mode: 'local',
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  context: path.resolve('src'),
                  // hashPrefix: 'my-custom-hash',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-preset-env')(),
                ]
              }
            },
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new MyPlugin(),
    ]
  })
}
const merge = require('webpack-merge');
const path = require('path')
const MyPlugin = require('./plugin/myPlugin')
const common = require('./webpack.common.js');
const {
  entries,
  publicPath,
  proxy,
  dllEntry,
  ...webpackConfig
} = require(path.resolve('webpack.config.js'))

module.exports = function () {
  return merge(
    common(), {
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
        // clientLogLevel: 'warn',
        stats: 'none',
        // stats: 'minimal',
        overlay: true,
        useLocalIp: true,
        proxy
      },
      module: {
        rules: [{
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
            test: /\.css$/,
            include: /node_modules/,
            use: [
              'vue-style-loader',
              'css-loader',
            ]
          },
          {
            test: /\.(css|sass|scss)$/,
            exclude: /node_modules/,
            oneOf: [{
                resourceQuery: /module/, //单独处理css modules
                use: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      modules: {
                        // mode: 'local',
                        // auto: true,
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
                        // require('postcss-import')(),
                        require('postcss-preset-env')(),
                      ]
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sassOptions: {
                        includePaths: [path.resolve('src/style')]
                      }
                    }
                  }
                ],
              },
              {
                use: [
                  'vue-style-loader',
                  'css-loader',
                  {
                    loader: 'postcss-loader',
                    options: {
                      ident: 'postcss',
                      plugins: [
                        // require('postcss-import')(),
                        require('postcss-preset-env')(),
                      ]
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sassOptions: {
                        includePaths: [path.resolve('src/style')]
                      }
                    }
                  }
                ],
              }
            ]
          },
        ],
      },
      plugins: [
        new MyPlugin(),
      ]
    },
    webpackConfig
  )
}
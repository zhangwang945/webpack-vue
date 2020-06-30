const merge = require("webpack-merge");
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const os = require('os')
const CompressionPlugin = require('compression-webpack-plugin');
const { items, dllEntry, ...webpackConfig } = require(path.resolve('webpack.config.js'))

const common = require("./webpack.common.js");
const minChunksNum = Math.ceil((items.length + 1) / 2)
module.exports = function () {
  return merge(
    common(),
    {
      mode: "production",
      output: {
        filename: 'js/[name].[contenthash:6].js',
        chunkFilename: 'js/[name].[contenthash:6].js',
        path: path.resolve('dist'),
        pathinfo: false
      },
      stats: 'none',
      devtool: "source-map",
      profile: true,
      optimization: {
        namedChunks: true,
        moduleIds: 'hashed',
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],//css优化
        splitChunks: {
          name: false,
          maxInitialRequests: 5,
          chunks: 'async',
          cacheGroups: {
            commons: {
              name: 'commons',
              test: /[\\/]node_modules[\\/]/,
              minChunks: minChunksNum > 1 ? minChunksNum : 2,//多入口引入的第三方包打包到commons
              chunks: 'all',
              enforce: true,
              priority: -10
            }
          },
        },
        runtimeChunk: {
          name: entrypoint => `runtime~${entrypoint.name}`
        },
      },

      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.js$/,
            exclude: file => (
              /node_modules/.test(file) &&
              !/\.vue\.js/.test(file)
            ),
            use: [
              {
                loader: 'cache-loader'
              },
              {
                loader: 'thread-loader',
                options: {
                  workers: os.cpus().length
                }
              },
              {
                loader: 'babel-loader',
              }
            ]
          },
          {
            test: /\.(css|sass|scss)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              }, {
                loader: 'css-loader',
                options: {
                  modules: {
                    // mode: 'local',
                    localIdentName: '[name]__[local]--[hash:base64:5]',
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
              "sass-loader",
            ],
          },
          {
            test: /\.css$/,
            include: /node_modules/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              }, 'css-loader'
            ]
          }
        ]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllReferencePlugin({
          manifest: require(path.resolve("dll/dist/dll-manifest.json")) // eslint-disable-line
        }),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "css/[name].[contenthash:6].css",
          chunkFilename: "css/[name].[contenthash:6].css"
        }),
        new AddAssetHtmlPlugin({
          filepath: path.resolve('dll/dist/dll.*.js'),
          outputPath: 'js',
          publicPath: 'js'
        }),
        new CopyPlugin([{
          from: 'src/public/',
          to: './public'
        }]),
        new ManifestPlugin(),
        new CompressionPlugin({
          test: /\.(js|css)(\?.*)?$/i,
          filename: '[path].gz[query]',
          // threshold: 10240,
          minRatio: 0.9,
        }),
        // new webpack.debug.ProfilingPlugin(
        //   {outputPath: 'profiling/profileEvents.json'}
        // )
      ]
    },
    webpackConfig
  )
}

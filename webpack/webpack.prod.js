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

const common = require("./webpack.common.js");

module.exports = function () {
  return merge(common(), {
    mode: "production",
    output: {
      filename: 'js/[name].[contenthash:6].js',
      chunkFilename: 'js/[name].[contenthash:6].js',
      path: path.resolve('dist'),
    },
    stats: {
      entrypoints: false,
      chunks: false,
      children: false,
      modules: false
    },
    // stats:'verbose',
    devtool: "source-map",
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],//css优化
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 5,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            enforce: true,
            priority: 10
          },
        },
      },
      // moduleIds: 'hashed',
      runtimeChunk: 'single',//提取runtime，多文件入口时共用
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
          use: [
            MiniCssExtractPlugin.loader,
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
            "sass-loader",

          ],
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DllReferencePlugin({
        manifest: require(path.resolve("src/dll/dist/dll-manifest.json")) // eslint-disable-line
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "css/[name].[contenthash:6].css",
        chunkFilename: "css/[name].[contenthash:6].css"
      }),
      new AddAssetHtmlPlugin({
        filepath: path.resolve('src/dll/dist/dll.*.js'),
        outputPath: 'js',
        publicPath: 'js'
      }),
      new CopyPlugin([{
        from: 'src/public/',
        to: './'
      }]),
      new ManifestPlugin(),
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
        filename: '[path].gz[query]',
        threshold: 10240,
        minRatio: 0.9,
      })
    ]
  })
}

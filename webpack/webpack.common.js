const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
let { entries, publicPath, ...webpackConfig } = require(path.resolve('webpack.config.js'))

const isPro = process.env.NODE_ENV === 'production'

if (!isPro) publicPath = '/'
// 入口
const entry = entries.reduce(
    (entry, item) => {
        entry[item.entryName] = item.entryPath
        return entry
    }, {}
)
// htmlWebpack
const htmlPluginInstances = entries.reduce(
    (arr, item) => {
        arr.push(
            new HtmlWebpackPlugin({
                filename: `${item.fileName || item.entryName + '.html'}`,
                title: item.title,
                template: item.template,
                chunks: ['vendors', `commons`, `runtime~${item.entryName}`, item.entryName]
            })
        )
        return arr
    }, []
)
module.exports = function () {
    return {
        context: path.resolve(),
        entry,
        resolve: {
            extensions: ['.js', '.vue'],
            alias: {
                module: path.resolve('src/module/'),
                assets: path.resolve('src/assets')
            }
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|video)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: '[name][contenthash:6].[ext]',
                                outputPath: 'assets',
                                publicPath:`${publicPath}assets`,
                                limit: 8000,
                                esModule: false
                            },
                        },
                    ],
                },
            ]
        },
        plugins: [
            ...htmlPluginInstances,
            new VueLoaderPlugin(),
        ]
    }
}
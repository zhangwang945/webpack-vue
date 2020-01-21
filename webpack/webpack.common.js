const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { items, ...webpackConfig } = require(path.resolve('webpack.config.js'))

// 入口
const entry = items.reduce(
    (entry, item) => {
        entry[item.entryName] = item.entryPath
        return entry
    }, {}
)
// htmlWebpack
const htmlPluginInstances = items.reduce(
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
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: '[name][contenthash:6].[ext]',
                                outputPath: 'assets',
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
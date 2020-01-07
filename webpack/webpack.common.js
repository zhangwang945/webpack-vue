const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = function () {
    return {
        context: path.resolve(),
        entry: path.resolve('src/index.js'),
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
                    test: /\.(png|jpg|gif)$/i,
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
            new HtmlWebpackPlugin({
                filename: 'index.html',
                title: 'Caching',
                template: 'src/index.html'
            }),
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            })
        ]
    }
}
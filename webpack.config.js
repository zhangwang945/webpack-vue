const webpack = require('webpack')
const path = require('path')

module.exports = {
    publicPath: '/', //远程根目录的路径
    proxy: {
        '/api': 'http://cftx.hcqh.net'
    },
    dllEntry: {
        vuebase: ["vue", "vuex", "vue-router", 'element-ui']
    },
    entries: [{
            entryName: 'index',
            entryPath: path.resolve('src/index.js'),
            title: 'Demo',
            template: 'src/index.html',
        },
        {
            entryName: 'index2',
            entryPath: path.resolve('src/index2.js'),
            title: 'index2',
            template: 'src/index.html',
        }
    ],
    output: {},
    resolve: {
        alias: {
            module:path.resolve('src/module')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}
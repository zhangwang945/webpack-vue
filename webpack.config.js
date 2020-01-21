const webpack = require('webpack')
const path = require('path')

module.exports = {
    dllEntry: {
        vuebase: ["vue", "vuex", "vue-router"]
    },
    items: [
        {
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}
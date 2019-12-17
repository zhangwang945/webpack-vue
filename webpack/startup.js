const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const webpackDevConfig = require('./webpack.dev')
const webpackProdConfig = require('./webpack.prod')
const webpackDllConfig = require('./webpack.dll')
const colors = require('colors/safe');
const detectPort = require('./tool/detectPort')

module.exports = function (action, option) {
    if (action === 'start') {
        process.env.NODE_ENV = 'development'
        const config = webpackDevConfig()
        const compiler = webpack(config)
        const devServerOption = config.devServer
        let port = option.port || devServerOption.port

        detectPort(port)
            .then(port => {
                process.env.port = devServerOption.port = port
                const server = new webpackDevServer(compiler, devServerOption)
                server.listen(port, devServerOption.host || '0.0.0.0', () => {
                });
            })

    } else if (action === 'build') {
        process.env.NODE_ENV = 'production'
        const config = webpackProdConfig()
        const compiler = webpack(config)
        compiler.run((err, stats) => {
            if (err) {

            } else {
                console.log(colors.green(stats.toString(config.stats)));
            }
        })

    } else if (action === 'dll') {
        const config = webpackDllConfig()
        const compiler = webpack(config)
        compiler.run((err, stats) => {
            if (err) {

            } else {
                console.log(colors.green(stats.toString(config.stats)));
            }
        })
    }

}
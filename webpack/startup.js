const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const webpackDevConfig = require('./webpack.dev')
const webpackProdConfig = require('./webpack.prod')
const webpackDllConfig = require('./webpack.dll')
const chalk = require('chalk');
const detectPort = require('./tool/detectPort')
const formatStats = require('./tool/formatStats')
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
                console.log(chalk.green.bold(`Compiled successfully in 2588ms\n`));
                console.log(`${chalk.cyan.bold('Assets Root Directory: ')}${config.output.path}\n`);

                formatStats(stats)
                if (stats.hasErrors()) {
                    console.log(chalk.red.bold('\ncompile failed!\n'));
                    stats.compilation.errors.forEach(err => {
                        console.error(`${err.message}`)
                    });

                } else if (stats.hasWarnings()) {
                    console.log(chalk.yellow.bold('\ncompiled with warning!\n'));
                    stats.compilation.warnings.forEach(warning => {
                        console.warn(chalk.yellow(`${warning.message}\n`))
                    });
                }
            }
        })

    } else if (action === 'dll') {
        const config = webpackDllConfig()
        const compiler = webpack(config)
        compiler.run((err, stats) => {
            if (err) {

            } else {
                console.log(chalk.green(stats.toString(config.stats)));
            }
        })
    }

}
const colors = require('colors/safe');
const address = require('address');
const ip = address.ip()

// 提取报错或警告信息
const errorMsgReg = RegExp(String.fromCharCode(27) + /\[0m[\s\S]*/.source + String.fromCharCode(27) + /\[0m/.source)
class MyPlugin {
    apply(compiler) {

        compiler.hooks.compile.tap('myPlugin', () => {
            console.clear()
            console.log(colors.blue('compiling...'));
        });

        compiler.hooks.afterEmit.tapAsync('myPlugin', (compilation, call) => {
            call()
        });
        compiler.hooks.done.tapAsync('myPlugin', (
            stats, callback
        ) => {
            console.clear()
            if (stats.hasErrors()) {
                console.log(colors.red('\ncompile failed!\n'));
                stats.compilation.errors.forEach(err => {
                    console.error(`${err.module.resource}\n${err.message}`)
                });

            } else if (stats.hasWarnings()) {
                console.log(colors.green(`Project is running at http://${ip}:${process.env.port}`));
                console.log(colors.yellow('\ncompiled with warning!\n'));
                stats.compilation.warnings.forEach(warning => {
                    console.warn(`${warning.module.resource}\n${warning.message}`)
                });

            } else {
                console.log(colors.green(`Project is running at http://${ip}:${process.env.port}`));
                console.log(colors.green('compile successful!\n'));
            }
            callback()
        });
    }
}

module.exports = MyPlugin;
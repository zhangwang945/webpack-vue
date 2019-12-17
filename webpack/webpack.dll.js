var path = require("path");
var webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function () {
    return {
        mode: "production",
        entry: {
            lodash: ["lodash", "jquery"],//第三方库名称
        },
        output: {
            path: path.resolve("src/dll/dist"),
            filename: "dll.[hash:6].js",
            library: "[name][hash]"
        },
        stats: {
            entrypoints: false,
            chunks: false,
            children: false,
            modules: false
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DllPlugin({
                path: path.resolve("src/dll/dist/dll-manifest.json"),
                name: "[name][hash]"
            })
        ]
    }
}
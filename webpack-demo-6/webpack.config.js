const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

module.exports = {
    // mode: "development || "production",
    entry: {
        main: "./example"
    },
    optimization: {
        runtimeChunk: true
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './template.html'
        }),
        new ScriptExtHtmlWebpackPlugin({
            inline: /runtime~.+\.js$/  //正则匹配runtime文件名
        })
    ]
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require("eslint-webpack-plugin");

console.log('NODE_ENV', process.env.NODE_ENV);

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: './src/index.js',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host: 'localhost',
        port: 9000,
        hot: true
    },
    plugins: [new ESLintPlugin({extensions: [".js", ".jsx", ".ts", ".tsx"]}), new HtmlWebpackPlugin({
        title: 'webpack-demo-4',
        filename: "index.html",
    }),],
    resolve: {
        alias: {
            "@": path.join(__dirname, "src/"),
        },
    },
    optimization: {
        runtimeChunk: 'single',  // 修改config代码缓存不会失效
        splitChunks: {
            cacheGroups: {
                vendor: {
                    minSize: 0, /* 如果不写 0，由于 React 文件尺寸太小，会直接跳过 */  // 默认30kb (before min+gz)
                    test: /[\\/]node_modules[\\/]/, // 为了匹配 /node_modules/ 或 \node_modules\
                    name: 'vendors', // 文件名
                    chunks: 'all',  // all 表示同步加载和异步加载，async 表示异步加载，initial 表示同步加载
                    // 这三行的整体意思就是把两种加载方式的来自 node_modules 目录的文件打包为 vendors.xxx.js
                    // 其中 vendors 是第三方的意思
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.styl(us)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2 * 10 ** 6
                        }
                    },
                ]
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader?cacheDirectory=true",
                    options: {
                        presets: [
                            ["@babel/preset-env"],
                            ["@babel/preset-react", {runtime: "classic"}],
                            ["@babel/preset-typescript"],
                        ],
                    },
                },
            },
        ]
    }
}
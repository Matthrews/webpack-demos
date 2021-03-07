const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

console.log('NODE_ENV', process.env.NODE_ENV);

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: './src/index.js',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host: 'localhost',
        port: 9000,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-demo-1',
            filename: "index.html",
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                // Lossless optimization with custom option
                // Feel free to experiment with options for better result for you
                plugins: [
                    "pngquant"
                    // ['gifsicle', { interlaced: true }],
                    // ['jpegtran', { progressive: true }],
                    // ['optipng', { optimizationLevel: 5 }],  // 0-7 默认为3，意味着要进行16次实验取最佳
                    // [
                    //     'svgo',
                    //     {
                    //         plugins: [
                    //             {
                    //                 removeViewBox: false,
                    //             },
                    //         ],
                    //     },
                    // ],
                ],
            },
        }),
    ],
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
        ]
    }
}
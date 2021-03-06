var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'webpack-demo-1', filename: 'index.html' }),
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
                            limit: 8912,
                        }
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[path][name].[ext]',

                            // // 函数式配置
                            // name(resourcePath, resourceQuery) {
                            //     // `resourcePath` - `/absolute/path/to/file.js`
                            //     // `resourceQuery` - `?foo=bar`
                            //     console.log('file-loader output name', resourcePath, resourceQuery);

                            //     if (process.env.NODE_ENV === 'development') {
                            //         return '[path][name].[ext]';
                            //     }

                            //     return '[contenthash].[ext]';
                            // },
                            publicPath: 'some/path/',
                            postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`,
                        }
                    }
                ]
            }
        ]
    }
}
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	mode: "production",
	devtool: "source-map",
	entry: './src/index.js',
	output: {
		filename: 'bundle-[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		post: 9000,
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
		]
	}
}

const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production' || false;

const banner = `openapp.js v${pkg.version}
https://github.com/luojinghui/launch-app

Licensed MIT © Luo Jinghui`;

module.exports = {
	mode: 'development',
	// devtool: 'inline-source-map',
	target: 'web',
	entry: {
		index: ['./src/index.ts']
		// demo: ['./examples/index.ts']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'lib'),
		libraryTarget: 'umd'
	},
	plugins: [
		new CleanWebpackPlugin(),
    new webpack.BannerPlugin({ banner })
		// new HtmlWebpackPlugin({
		// 	filename: 'demo.html',
		// 	template: './examples/index.html',
		// 	title: 'Demo Title'
		// 	// chunksSortMode: none
		// })
	],
	optimization: {
		minimize: isProduction,
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			})
		],
		runtimeChunk: false
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				include: path.resolve(__dirname, 'src'),
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/env']
						}
					},
					'ts-loader'
				]
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader'
				}
			},
			{
				test: /\.(css|less)$/,
				use: ['css-loader', 'less-loader']
			}
		]
	}
};

const path = require('path');
const webpack = require('webpack');

const res = p => path.resolve(__dirname, p);

const entry = res('../server/render.js');
const output = res('../dist/server');
const src = res('../src');

module.exports = {
	name: 'server',
	target: 'node',
	devtool: 'source-map',
	entry: [entry],
	output: {
		path: output,
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'css-loader/locals',
						options: {
							modules: true,
							localIdentName: '[name]__[local]--[hash:base64:5]',
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.css'],
		modules: [src, 'node_modules'],
	},
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
	],
};

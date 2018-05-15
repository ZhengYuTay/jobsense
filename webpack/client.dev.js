const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const root = process.cwd();
const src = path.join(root, 'src');
const server = path.join(root, 'server');

module.exports = {
	name: 'client',
	target: 'web',
	module: {
		rules: [
			{
				test: /^(?!.*\.test\.js$).*\.js$/,
				include: [src, server],
				exclude: [/node_modules/, /__snapshots__/, /\.test\.js$/],
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ExtractCssChunks.extract({
					use: [
						{
							loader: 'css-loader',
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
				}),
			},
		],
	},
	devtool: 'eval',
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
		'react-hot-loader/patch',
		path.resolve(__dirname, '../src/index.js'),
	],
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../dist/client'),
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.css'],
		modules: [src, 'node_modules'],
	},
	plugins: [
		new webpack.ContextReplacementPlugin( // used to exclude those file to be bundled
			/^pages$/,
			/^((?!test\.js$|test$|\.snap$|\.css$).)*$/
		),
		new ExtractCssChunks(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
			filename: '[name].js',
			minChunks: Infinity,
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			},
		}),
	],
};

const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const root = process.cwd();
const src = path.join(root, 'src');

module.exports = {
	name: 'client',
	target: 'web',
	devtool: 'source-map',
	entry: [path.resolve(__dirname, '../src/index.js')],
	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, '../dist/client'),
		publicPath: '/static/',
	},
	module: {
		rules: [
			{
				test: /^(?!.*\.test\.js$).*\.js$/,
				exclude: /node_modules/,
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
								localIdentName:
									'[name]__[local]--[hash:base64:5]',
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
			filename: '[name].[chunkhash].js',
			minChunks: Infinity,
		}),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false,
			},
			mangle: {
				screw_ie8: true,
			},
			output: {
				screw_ie8: true,
				comments: false,
			},
			sourceMap: true,
		}),
		new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
	],
};

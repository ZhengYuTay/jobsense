const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const PROD = process.env.NODE_ENV === 'production';
const clientConfig = require(PROD
	? '../webpack/client.prod'
	: '../webpack/client.dev');
const serverConfig = require(PROD
	? '../webpack/server.prod'
	: '../webpack/server.dev');
const publicPath = clientConfig.output.publicPath;

const outputPath = clientConfig.output.path;
const app = express();

app.listen(3000);
console.log('Listening @ http://localhost:3000');

const done = () => {
	console.log('BUILD COMPLETE -- Listening @ http://localhost:3000');
};

if (!PROD) {
	const options = { publicPath, stats: 'errors-only' };
	const compiler = webpack([clientConfig, serverConfig]);
	const clientCompiler = compiler.compilers[0];
	app.use(webpackDevMiddleware(compiler, options));
	app.use(webpackHotMiddleware(clientCompiler));
	app.use(webpackHotServerMiddleware(compiler));

	compiler.plugin('done', done);
} else {
	webpack([clientConfig, serverConfig]).run((err, stats) => {
		const clientStats = stats.toJson().children[0];
		const serverRender = require('../dist/server/main.js').default;

		app.use(publicPath, express.static(outputPath));
		app.use(serverRender({ clientStats }));

		done();
	});
}

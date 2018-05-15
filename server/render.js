import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import { Provider } from 'react-redux';
import flushChunks from 'webpack-flush-chunks';
import App from '../src/routes/Routes';
import configureStore from '../src/configureStore';
import { StaticRouter } from 'react-router';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';

export default ({ clientStats }) => (req, res) => {
	const store = configureStore();
	const initialState = JSON.stringify(store.getState());
	const context = {};

	const app = ReactDOM.renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={context}>
				<Route component={App} />
			</StaticRouter>
		</Provider>
	);
	const helmet = Helmet.renderStatic();
	const chunkNames = flushChunkNames();

	const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

	res.send(
		`<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
					<title>react universal from scratch</title>
					<link href="https://fonts.googleapis.com/css?family=Muli:300,400,600" rel="stylesheet" type="text/css">
					${helmet.title.toString()}
					${helmet.meta.toString()}
					${helmet.link.toString()}
          ${styles}
        </head>
        <body>
          <script>
            window.__INITIAL_STATE__ = ${initialState}
          </script>
          <div id="root">${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
	);
};

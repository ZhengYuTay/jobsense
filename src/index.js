import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import Routes from './routes/Routes';
import configureStore from './configureStore';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore(window.__INITIAL_STATE__);

const render = App =>
	ReactDOM.hydrate(
		<Provider store={store}>
			<BrowserRouter>
				<AppContainer>
					<Route component={App} />
				</AppContainer>
			</BrowserRouter>
		</Provider>,
		document.getElementById('root')
	);

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./routes/Routes.js', () => {
		const Routes = require('./routes/Routes').default;
		render(Routes);
	});
}

render(Routes);

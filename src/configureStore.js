import { createStore, applyMiddleware, compose } from 'redux';
import createReducer from './reducers/index';

const configureStore = initialState => {
	const composedMiddlewares = applyMiddleware(...[]);
	const composeEnhancers =
		(typeof window !== 'undefined' &&
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
		compose;

	const store = createStore(
		createReducer(),
		initialState,
		composeEnhancers(composedMiddlewares)
	);

	store.injectReducers = asyncReducers =>
		store.replaceReducer(createReducer(asyncReducers));
	if (module.hot) {
		module.hot.accept('./reducers', () =>
			store.replaceReducer(require('./reducers').default)
		);
	}

	return store;
};

export default configureStore;

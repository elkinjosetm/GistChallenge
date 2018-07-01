import { createLogger } from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { includes } from 'lodash';
import { middleware as navigatorMiddleware } from '@navigators';
import { debugSettings, reduxPersist, loggingBlacklist, app } from '@config';
import { thunks } from '@redux/app';
import { reducer as globals } from '@redux/globals';
import reducers from './reducers';

/**
 * Function to patchReducer and apply
 * globals actions reducer
 *
 * @param {Function} appReducer
 */
const patchReducer = appReducer => (state, action) => (appReducer(globals(state, action), action));

export default () => {
	const USE_LOGGING = debugSettings.inspectorLogging;
	const middlewares = [];
	const enhancers = [];
	const initApp = dispatch => () => dispatch(thunks.init());

	// Apply thunks middleware
	middlewares.push(thunk);

	// Apply navigator middleware
	middlewares.push(navigatorMiddleware);

	// Apply logger middleware
	if (USE_LOGGING) {
		const logger = createLogger({
			predicate : (getState, { type }) => USE_LOGGING && !includes(loggingBlacklist, type),
			collapsed : true,
		});

		middlewares.push(logger);
	}

	// Apply all middlewares
	enhancers.push(applyMiddleware(...middlewares));

	const appropriateCompose = debugSettings.useReduxDevTools ? composeWithDevTools({
		name     : app.displayName,
		realtime : true,
	}) : compose;

	// Create app reducer
	const appReducer = persistCombineReducers(reduxPersist, reducers);

	// Create Store
	const store = createStore(patchReducer(appReducer), appropriateCompose(...enhancers));

	// Create Persistor
	const persistor = persistStore(store, null, initApp(store.dispatch));

	return { store, persistor };
};

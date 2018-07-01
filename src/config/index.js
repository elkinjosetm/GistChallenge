import { YellowBox } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { PERSIST, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const app = {
	name        : 'GistChallenge',
	bundleName  : 'com.elkintorres.gistchallenge',
	displayName : 'Gist Challenge',
};

export const api = {
	baseUrl : '',
	timeout : 60000,
};

export const debugSettings = {
	inspectorLogging : __DEV__,
	useReduxDevTools : __DEV__,
};

export const reduxPersist = {
	storage,
	key       : '1.0.0.1',
	blacklist : [ 'nav', 'app' ],
};

export const hostSettings = {
	ip : 'localhost',
};

export const loggingBlacklist = [
	REHYDRATE,
	PERSIST,
	NavigationActions.NAVIGATE,
	NavigationActions.BACK,
	NavigationActions.SET_PARAMS,
];

export default {
	app,
	api,
	debugSettings,
	reduxPersist,
	hostSettings,
	loggingBlacklist,
};

/**
 * IMPORTANT:
 *
 * We need to ignore the following
 * warning messages, because they
 * are coming apparently from the
 * React-Native library itself, and
 * until the library gets updated
 * it'll be throwing this warnings.
 */
if (__DEV__) {
	YellowBox.ignoreWarnings([
		'Module RCTImageLoader',
		'Warning: isMounted',
	]);
}

import { createActions, createReducer } from 'reduxsauce';
import Strings from '@i18n';

export { default as thunks } from './thunks';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
	isInitiated       : false,
	loading           : false,
	loadingLabel      : Strings.loading,
	inAppNotification : null,
};

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions({
	init              : null,
	setLoading        : [ 'loading', 'loadingLabel' ],
	showNotification  : [ 'inAppNotification' ],
	clearNotification : null,
}, { prefix : '@app/' });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
	[Types.INIT] : state => ({
		...state,
		isInitiated : true,
	}),

	[Types.SET_LOADING] : (state, { loading, loadingLabel = INITIAL_STATE.loadingLabel }) => ({
		...state,
		loading,
		loadingLabel,
	}),

	[Types.SHOW_NOTIFICATION] : (state, { inAppNotification }) => ({
		...state,
		inAppNotification,
	}),

	[Types.CLEAR_NOTIFICATION] : state => ({
		...state,
		inAppNotification : INITIAL_STATE.inAppNotification,
	}),
});

export default Creators;

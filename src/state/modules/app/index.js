import { createActions, createReducer } from 'reduxsauce';

export { default as thunks } from './thunks';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
	isInitiated  : false,
	loading      : false,
	loadingLabel : 'Loading...',
};

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions({
	init       : null,
	setLoading : [ 'loading', 'loadingLabel' ],
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
});

export default Creators;

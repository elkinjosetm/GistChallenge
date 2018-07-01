import { createActions, createReducer } from 'reduxsauce';

export { default as thunks } from './thunks';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
	isInitiated : false,
	loading     : false,
};

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions({
	init       : null,
	setLoading : [ 'loading' ],
}, { prefix : '@app/' });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
	[Types.INIT] : state => ({
		...state,
		isInitiated : true,
	}),

	[Types.SET_LOADING] : (state, { loading }) => ({
		...state,
		loading,
	}),
});

export default Creators;

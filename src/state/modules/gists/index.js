import { createActions, createReducer } from 'reduxsauce';
import { cloneDeep, set } from 'lodash';

export { default as thunks } from './thunks';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
	form : {
		username : '',
	},
	validations : {
		username : false,
	},
	data : {
		list     : [],
		details  : {},
		comments : [],
	},
	loading : {
		refreshControl : false,
		infiniteScroll : false,
	},
};

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions({
	receiveData : [ 'property', 'value' ],
	setLoading  : [ 'property', 'value' ],
}, { prefix : '@gists/' });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
	[Types.RECEIVE_DATA] : (state, { property, value }) => {
		const newState = cloneDeep(state);

		set(newState, [ 'data', property ], value);

		return newState;
	},

	[Types.SET_LOADING] : (state, { property, value }) => {
		const newState = cloneDeep(state);

		set(newState, [ 'loading', property ], value);

		return newState;
	},
});

export default Creators;

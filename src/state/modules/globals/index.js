import { createActions, createReducer } from 'reduxsauce';
import { set, cloneDeep, isUndefined, forEach, has } from 'lodash';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {};

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions({
	changeState       : [ 'module', 'property', 'value' ],
	changeMultiStates : [ 'paths' ],
}, { prefix : '@globals/' });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
	[Types.CHANGE_STATE] : (state, { module, property, value }) => (
		changeState({
			state,
			module,
			property,
			value,
		})
	),

	[Types.CHANGE_MULTI_STATES] : (state, { paths }) => {
		let newState = cloneDeep(state);

		forEach(paths, ({ module, property, value }) => {
			newState = changeState({
				module,
				property,
				value,
				state : newState,
			});
		});

		return newState;
	},
});

const changeState = ({ state, module, property, value }) => {
	const newState = cloneDeep(state);

	// Only update the state if it's the same Module
	if (
		!isUndefined(module) &&
		has(newState, module)
	)
		set(newState[module], property, value); // Update value

	return newState;
};

export default Creators;

import Actions from './';

/* ------------- Thunks actions ------------- */
export const init = () => (dispatch => {
	// Start Loading animation
	dispatch(Actions.init());
});

export default {
	init,
};

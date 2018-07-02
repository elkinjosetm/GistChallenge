
/* ------------- Thunks actions ------------- */
export const loadGists = () => ((dispatch, getState) => {
	const {
		form : { username },
	} = getState().gists;

	console.log(username);
});

export default {
	loadGists,
};

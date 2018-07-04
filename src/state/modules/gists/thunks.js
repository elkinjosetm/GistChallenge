import { GistService } from '@services';
import AppActions from '@redux/app';

/* ------------- Thunks actions ------------- */
export const loadGists = () => ((dispatch, getState) => {
	const {
		form : { username },
	} = getState().gists;

	dispatch(AppActions.setLoading(true));

	GistService.getByUsername(username)
		.then((({ data }) => {
			console.log(data);

			dispatch(AppActions.setLoading(false));
		}))
		.catch(console.log.bind(null, 'error'));
});

export default {
	loadGists,
};

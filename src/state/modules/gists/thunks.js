import { NavigationActions } from 'react-navigation';
import { GistService } from '@services';
import GlobalsActions from '@redux/globals';
import AppActions from '@redux/app';
import { apiErrorHandler } from '@utils';
import Actions from './';

/* ------------- Thunks actions ------------- */
export const loadGists = ({
	loaderModule = 'gists',
	loaderProperty = [ 'loading', 'refreshControl' ],
	navigateToList = false,
} = {}) => ((dispatch, getState) => {
	const { form : { username } } = getState().gists;

	// Start loading animation
	dispatch(GlobalsActions.changeState(loaderModule, loaderProperty, true));

	GistService.getByUsername(username)
		.then(({ data }) => {
			// Receive gist data
			dispatch(Actions.receiveData('list', data));

			// Navigate to Gist List
			if (navigateToList)
				dispatch(NavigationActions.navigate({ routeName : 'List' }));

			// Stop loading animation
			dispatch(GlobalsActions.changeState(loaderModule, loaderProperty, false));
		})
		.catch(apiErrorHandler({
			dispatch,
			module   : loaderModule,
			property : loaderProperty,
		}));
});

export const getGistById = gistId => (dispatch => {
	// Start loading animation
	dispatch(AppActions.setLoading(true));

	GistService.getById(gistId)
		.then(({ data }) => {
			// Receive gist data
			dispatch(Actions.receiveData('details', data));

			// Stop loading animation
			dispatch(AppActions.setLoading(false));
		})
		.catch(apiErrorHandler({
			dispatch,
		}));
});

export default {
	loadGists,
	getGistById,
};

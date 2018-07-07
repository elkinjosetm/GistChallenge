import { NavigationActions } from 'react-navigation';
import { map } from 'lodash';
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
		.then(({ data : rawData }) => {
			const data = { ...rawData };

			/**
			 * Since the files in the response
			 * is an object where every file is
			 * a separate key, we convert it to
			 * be an array of object, so we can
			 * use easily throughout the app.
			 *
			 * Also, since a file doesn't have
			 * and id in the response, we use
			 * the position index as KEY so it
			 * can be used for the list render
			 */
			const filesArray = map(data.files, (file, index) => ({
				...file,
				key : index,
			}));

			// Add filesArray to the details object
			data.filesArray = filesArray;

			// Receive gist data
			dispatch(Actions.receiveData('details', data));

			// Navigate to Details page and set the page title
			dispatch(NavigationActions.navigate({
				routeName : 'Details',
				params    : {
					title : data.description,
				},
			}));

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

import { NavigationActions } from 'react-navigation';
import { map, findIndex, get } from 'lodash';
import { v4 as uuid } from 'uuid';
import { GistService } from '@services';
import GlobalsActions from '@redux/globals';
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

export const getGistById = (gistId, {
	loaderModule = 'gists',
	loaderProperty = [ 'loading', 'refreshControl' ],
	navigateToPage = false,
} = {}) => ((dispatch, getState) => {
	// Start loading animation
	dispatch(GlobalsActions.changeState(loaderModule, loaderProperty, true));

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
			 * and id in the response, we
			 * generate a random id so it can
			 * be used for the list render as
			 * key
			 */
			const filesArray = map(data.files, file => ({
				...file,
				id : uuid(),
			}));

			// Add filesArray to the details object
			data.filesArray = filesArray;

			// Receive gist data
			dispatch(Actions.receiveData('details', data));

			return GistService.gotCommentsById(gistId);
		})
		.then(({ data }) => {
			const { description : title } = getState().gists.data.details;

			// Receive gist data
			dispatch(Actions.receiveData('comments', data));

			/**
			 * Navigate to Details page and set
			 * the page title only if it's required
			 */
			if (navigateToPage) {
				dispatch(NavigationActions.navigate({
					routeName : 'Details',
					params    : { title },
				}));
			}

			// Stop loading animation
			dispatch(GlobalsActions.changeState(loaderModule, loaderProperty, false));
		})
		.catch(apiErrorHandler({
			dispatch,
			module   : loaderModule,
			property : loaderProperty,
		}));
});

export const loadNearestGist = direction => ((dispatch, getState) => {
	const {
		list,
		details : { id : currentGistId },
	} = getState().gists.data;
	const currentIndex = findIndex(list, [ 'id', currentGistId ]);
	const requestedIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
	const requestedGistId = get(list, [ requestedIndex, 'id' ]);

	// Clear current gist data
	dispatch(Actions.clearDetails());

	// Request the next gist in the list
	dispatch(getGistById(requestedGistId, {
		loaderModule   : 'app',
		loaderProperty : 'loading',
	}));
});

export default {
	loadGists,
	getGistById,
	loadNearestGist,
};

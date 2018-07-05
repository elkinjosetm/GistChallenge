import { get } from 'lodash';
import GlobalsActions from '@redux/globals';

export const apiErrorHandler = ({
	dispatch,
	module = 'app',
	property = 'loading',
	defaultMessage = 'Something went wrong, might be a connection issue.',
}) => error => {
	let message = defaultMessage;

	// Stop loading animation
	dispatch(GlobalsActions.changeState(module, property, false));

	/**
	 * Get error message from API
	 * response, or use the
	 * defaultMessage instead
	 */
	message = get(error, [ 'response', 'data', 'message' ], defaultMessage);

	// Notify user
	console.log(message);
};

export default {
	apiErrorHandler,
};

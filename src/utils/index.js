import { ToastStyles } from 'react-native-toaster';
import { get, isFunction } from 'lodash';
import GlobalsActions from '@redux/globals';
import AppActions from '@redux/app';
import Strings from '@i18n';

/**
 * Function to handle in a generic
 * way any failed API response.
 *
 * It has the option to update the
 * state so we can stop an ongoing
 * loading animation.
 *
 * And at the end, it'll show the user
 * the message coming from the API,
 * or just show a generic message
 */
export const apiErrorHandler = ({
	dispatch,
	module = 'app',
	property = 'loading',
	defaultMessage = Strings.defaultErrorMessage,
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
	dispatch(notify({
		message,
		type : ToastStyles.error,
	}));
};

/**
 * Function to trigger an in-app
 * notification
 */
export const notify = ({
	type,
	onShow,
	onPress,
	message : text,
	onHide : onHideAddon,
	duration = 3000,
}) => (dispatch => {
	const styles = type || ToastStyles.info;
	const onHide = () => {
		dispatch(AppActions.clearNotification());

		if (isFunction(onHideAddon))
			onHideAddon();
	};

	// Send notification
	dispatch(AppActions.showNotification({
		text,
		styles,
		duration,
		onShow,
		onHide,
		onPress,
	}));
});

export default {
	apiErrorHandler,
	notify,
};

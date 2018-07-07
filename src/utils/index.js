import { ToastStyles } from 'react-native-toaster';
import { get, isFunction } from 'lodash';
import GlobalsActions from '@redux/globals';
import AppActions from '@redux/app';

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
	dispatch(notify({
		message,
		type : ToastStyles.error,
	}));
};

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

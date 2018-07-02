import { RootNavigator } from '@navigators';

// Start the Main screen
const firstAction = RootNavigator.router.getActionForPathAndParams('Main');
const initialNavState = RootNavigator.router.getStateForAction(firstAction);

export const reducer = (state = initialNavState, action) => {
	const nextState = RootNavigator.router.getStateForAction(action, state);

	// Simply return the original `state` if `nextState` is null or undefined.
	return nextState || state;
};

export default reducer;

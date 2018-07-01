import { RootNavigator } from '@navigators';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = RootNavigator.router.getActionForPathAndParams('Main');
const initialNavState = RootNavigator.router.getStateForAction(firstAction);

export const reducer = (state = initialNavState, action) => {
	const nextState = RootNavigator.router.getStateForAction(action, state);

	// Simply return the original `state` if `nextState` is null or undefined.
	return nextState || state;
};

export default reducer;

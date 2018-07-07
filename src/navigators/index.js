import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { rootConfig, mainStackConfig } from '@navigators/navigatorConfig';

// Screens
import LoginScreen from '@screens/LoginScreen';
import HomeScreen from '@screens/HomeScreen';
import ListScreen from '@screens/ListScreen';
import DetailsScreen from '@screens/DetailsScreen';

const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);

/**
 * Every screen that we want
 * to show with regular stack
 * behavior, needs to be defined
 * here
 */
const MainStack = createStackNavigator({
	Home    : { screen : HomeScreen },
	List    : { screen : ListScreen },
	Details : { screen : DetailsScreen },
}, mainStackConfig);

/**
 * Every screen that we
 * want to show as modal
 * needs to be defined in
 * this navigator
 */
const RootNavigator = createStackNavigator({
	Main  : { screen : MainStack },
	Login : { screen : LoginScreen },
}, rootConfig);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = ({ nav : state }) => ({ state });

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };

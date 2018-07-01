import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import navigatorConfig from '@navigators/navigatorConfig';

// Screens
import LoginScreen from '@screens/LoginScreen';
import MainScreen from '@screens/MainScreen';

const middleware = createReactNavigationReduxMiddleware('root', state => state.nav);

const RootNavigator = createStackNavigator({
	Login : { screen : LoginScreen },
	Main  : { screen : MainScreen },
}, navigatorConfig);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
	state : state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };

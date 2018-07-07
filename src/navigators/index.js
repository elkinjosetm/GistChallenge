import React, { PureComponent } from 'react';
import { BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { rootConfig } from '@navigators/navigatorConfig';

// Screens
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
const RootNavigator = createStackNavigator({
	Main    : { screen : HomeScreen },
	List    : { screen : ListScreen },
	Details : { screen : DetailsScreen },
}, rootConfig);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

class AppWithNavigationStateAndBackHandler extends PureComponent {
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
	}

	onBackPress = () => {
		const { dispatch, state } = this.props;
		if (state.index === 0)
			return false;

		dispatch(NavigationActions.back());
		return true;
	};

	render() {
		return (
			<AppWithNavigationState { ...this.props } />
		);
	}
}

const mapStateToProps = ({ nav : state }) => ({ state });

const AppNavigator = connect(mapStateToProps)(AppWithNavigationStateAndBackHandler);

export { RootNavigator, AppNavigator, middleware };

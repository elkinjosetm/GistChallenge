import React, { Component } from 'react';
import { View } from 'react-native';
import Toaster from 'react-native-toaster';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { AppNavigator } from '@navigators';
import { Loading } from '@components';
import styles from './styles';

class RootContainer extends Component {
	shouldComponentUpdate = ({ loading, loadingLabel, inAppNotification }) => {
		const lastProps = this.props;

		return (
			!isEqual(loading, lastProps.loading) ||
			!isEqual(loadingLabel, lastProps.loadingLabel) ||
			!isEqual(inAppNotification, lastProps.inAppNotification)
		);
	}

	render() {
		const {
			loading,
			loadingLabel,
			inAppNotification,
		} = this.props;

		return (
			<View style={ styles.container }>
				<AppNavigator />
				<Loading
					active={ loading }
					label={ loadingLabel }
				/>
				<Toaster message={ inAppNotification } />
			</View>
		);
	}
}

const mapStateToProps = ({
	app : {
		loading,
		loadingLabel,
		inAppNotification,
	},
}) => ({
	loading,
	loadingLabel,
	inAppNotification,
});

export default connect(mapStateToProps)(RootContainer);

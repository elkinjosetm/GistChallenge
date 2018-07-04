import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { AppNavigator } from '@navigators';
import { Loading } from '@components';
import styles from './styles';

class RootContainer extends Component {
	shouldComponentUpdate = ({ loading, loadingLabel }) => {
		const lastProps = this.props;

		return (
			!isEqual(loading, lastProps.loading) ||
			!isEqual(loadingLabel, lastProps.loadingLabel)
		);
	}

	render() {
		const {
			loading,
			loadingLabel,
		} = this.props;

		return (
			<View style={ styles.container }>
				<AppNavigator />
				<Loading
					active={ loading }
					label={ loadingLabel }
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ app : { loading, loadingLabel } }) => ({
	loading,
	loadingLabel,
});

export default connect(mapStateToProps)(RootContainer);

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { AppNavigator } from '@navigators';
import styles from './styles';

class RootContainer extends Component {
	shouldComponentUpdate = () => (false)

	render() {
		return (
			<View style={ styles.container }>
				<AppNavigator />
			</View>
		);
	}
}

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(RootContainer);

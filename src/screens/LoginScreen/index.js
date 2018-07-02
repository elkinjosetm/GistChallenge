import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header } from '@components';

class LoginScreenContainer extends Component {
	shouldComponentUpdate = () => (false)

	render() {
		return (
			<View>
				<Header
					title="Login"
					headerLeftTitle="Close"
					onPressHeaderLeft={ () => this.props.navigation.goBack() }
				/>
				<Text>Login</Text>
			</View>
		);
	}
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenContainer);

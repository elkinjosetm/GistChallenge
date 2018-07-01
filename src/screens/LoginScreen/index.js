import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class LoginScreenContainer extends Component {
	static navigationOptions = {
		title : 'Login',
	};

	shouldComponentUpdate = () => (false)

	render() {
		return (
			<View>
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

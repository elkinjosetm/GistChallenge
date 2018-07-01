import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

class MainScreenContainer extends Component {
	shouldComponentUpdate = () => (false)

	goToLogin = () => {
		console.log('goToLogin');
	}

	render() {
		return (
			<View>
				<Text>Hello World</Text>
				<Button
					title="Login"
					onPress={ this.goToLogin }
				/>
			</View>
		);
	}
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenContainer);

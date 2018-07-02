import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

class HomeScreenContainer extends Component {
	static navigationOptions = {
		title : 'Home',
	};

	shouldComponentUpdate = () => (false)

	goTo = routName => () => this.props.navigation.navigate(routName)

	render() {
		return (
			<View>
				<Text>Hello World</Text>
				<Button
					title="Login"
					onPress={ this.goTo('Login') }
				/>
				<Button
					title="List"
					onPress={ this.goTo('List') }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer);

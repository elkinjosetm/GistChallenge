import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class ListScreenContainer extends Component {
	static navigationOptions = {
		title : 'Gists',
	};

	shouldComponentUpdate = () => (false)

	render() {
		return (
			<View>
				<Text>List page</Text>
			</View>
		);
	}
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListScreenContainer);

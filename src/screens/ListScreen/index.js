import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Strings from '@I18n';

class ListScreenContainer extends Component {
	static navigationOptions = {
		title : Strings.screens.list.title,
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

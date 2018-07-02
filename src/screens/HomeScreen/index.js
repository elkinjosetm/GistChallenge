import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, TextInput } from '@components';
import Strings from '@I18n';
import styles from './styles';

class HomeScreenContainer extends Component {
	static navigationOptions = {
		title : Strings.screens.home.title,
	};

	shouldComponentUpdate = () => (false)

	search = () => {
		console.log('search');
	}

	render() {
		const screenStrings = Strings.screens.home;

		return (
			<View style={ styles.container }>
				<View style={ styles.innerWrapper }>
					<Text style={ styles.description }>
						What user are you looking for?
					</Text>
					<TextInput
						placeholder={ screenStrings.gistUsername }
						style={ styles.textInput }
						onChange={ console.log }
					/>
					<Button
						color="primary"
						title={ screenStrings.search }
						onPress={ this.search }
					/>
				</View>
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

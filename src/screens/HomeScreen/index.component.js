import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { Button, TextInput, KeyboardAwareScrollView } from '@components';
import Strings from '@I18n';
import styles from './styles';

class HomeScreenComponent extends Component {
	componentDidMount = () => {
		/**
		 * Automatically focus
		 * username field
		 */
		this.usernameRef.focus();
	}

	shouldComponentUpdate = ({ form, validations }) => {
		const lastProps = this.props;

		return (
			!isEqual(form, lastProps.form) ||
			!isEqual(validations, lastProps.validations)
		);
	}

	onChange = property => value => this.props.onChange(property, value)

	render() {
		const {
			onSearch,
			validations,
			form : {
				username,
			},
		} = this.props;

		const screenStrings = Strings.screens.home;

		return (
			<KeyboardAwareScrollView>
				<View style={ styles.innerWrapper }>
					<Text style={ styles.description }>
						What user are you looking for?
					</Text>
					<TextInput
						ref={ ref => { this.usernameRef = ref; } }
						value={ username }
						hasError={ validations.username }
						placeholder={ screenStrings.gistUsername }
						style={ styles.textInput }
						onChange={ this.onChange('username') }
						onSubmitEditing={ onSearch }
					/>
					<Button
						color="primary"
						title={ screenStrings.search }
						onPress={ onSearch }
					/>
				</View>
			</KeyboardAwareScrollView>
		);
	}
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenComponent);

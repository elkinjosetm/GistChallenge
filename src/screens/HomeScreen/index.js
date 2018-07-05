import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { isEqual, isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import GlobalsActions from '@redux/globals';
import { thunks } from '@redux/gists';
import Strings from '@I18n';
import InnerComponent from './index.component';
import styles from './styles';

class HomeScreenContainer extends Component {
	static navigationOptions = {
		title : Strings.screens.home.title,
	};

	shouldComponentUpdate = ({ form, validations }) => {
		const lastProps = this.props;

		return (
			!isEqual(form, lastProps.form) ||
			!isEqual(validations, lastProps.validations)
		);
	}

	onSearch = () => {
		if (!this.validateForm())
			return;

		this.props.dispatch(thunks.loadGists({
			loaderModule   : 'app',
			loaderProperty : 'loading',
			navigateToList : true,
		}));
	}

	validateForm = () => {
		const {
			changeState,
			form : {
				username : rawUsername,
			}
		} = this.props;
		let valid = true;

		const username = !isEmpty(rawUsername);

		valid = valid ? username : valid;

		// Update validations
		changeState('gists', [ 'validations', 'username' ], !username);

		return valid;
	}

	onChange = (property, value) => this.props.changeMultiStates([
		{ module : 'gists', property : [ 'form', property ], value },
		{ module : 'gists', property : [ 'validations', property ], value : false },
	])

	render() {
		const {
			form,
			validations,
		} = this.props;

		return (
			<View style={ styles.container }>
				<InnerComponent
					form={ form }
					validations={ validations }
					onSearch={ this.onSearch }
					onChange={ this.onChange }
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ gists : {
	form,
	validations,
} }) => ({
	form,
	validations,
});

const mapDispatchToProps = dispatch => ({
	dispatch,
	changeState       : bindActionCreators(GlobalsActions, dispatch).changeState,
	changeMultiStates : bindActionCreators(GlobalsActions, dispatch).changeMultiStates,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer);

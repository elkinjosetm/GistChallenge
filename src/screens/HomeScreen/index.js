import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { bindActionCreators } from 'redux';
import GlobalsActions from '@redux/globals';
import Strings from '@I18n';
import InnerComponent from './index.component';
import styles from './styles';

class HomeScreenContainer extends Component {
	static navigationOptions = {
		title : Strings.screens.home.title,
	};

	shouldComponentUpdate = ({ username }) => {
		const lastProps = this.props;

		return (
			!isEqual(username, lastProps.username)
		);
	}

	onSearch = () => {
		console.log('search');
	}

	onChange = (property, value) => this.props.changeState('gists', property, value)

	render() {
		const {
			username,
		} = this.props;

		return (
			<View style={ styles.container }>
				<InnerComponent
					username={ username }
					onSearch={ this.onSearch }
					onChange={ this.onChange }
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ gists : { username } }) => ({
	username,
});

const mapDispatchToProps = dispatch => ({
	dispatch,
	changeState : bindActionCreators(GlobalsActions, dispatch).changeState,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer);

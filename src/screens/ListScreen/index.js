import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { thunks } from '@redux/gists';
import Strings from '@i18n';
import InnerComponent from './index.component';
import styles from './styles';

class ListScreenContainer extends Component {
	static navigationOptions = {
		title : Strings.screens.list.title,
	};

	shouldComponentUpdate = ({
		data,
		loading,
	}) => {
		const lastProps = this.props;

		return (
			!isEqual(data, lastProps.data) ||
			!isEqual(loading, lastProps.loading)
		);
	}

	onRefresh = () => this.props.dispatch(thunks.loadGists())

	onPressGist = gistId => () => this.props.dispatch(thunks.getGistById(gistId, {
		loaderModule   : 'app',
		loaderProperty : 'loading',
		navigateToPage : true
	}))

	render() {
		const {
			data,
			loading,
		} = this.props;

		return (
			<View style={ styles.container }>
				<InnerComponent
					data={ data }
					loading={ loading }
					onRefresh={ this.onRefresh }
					onPressGist={ this.onPressGist }
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ gists : {
	data : { list : data },
	loading,
} }) => ({
	data,
	loading,
});

const mapDispatchToProps = dispatch => ({
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListScreenContainer);

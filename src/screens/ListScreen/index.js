import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { thunks } from '@redux/gists';
import Strings from '@I18n';
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
				/>
			</View>
		);
	}
}

const mapStateToProps = ({ gists : {
	data : { list : data },
	loading : { refreshControl : loading },
} }) => ({
	data,
	loading,
});

const mapDispatchToProps = dispatch => ({
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListScreenContainer);

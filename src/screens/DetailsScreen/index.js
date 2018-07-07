import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { thunks } from '@redux/gists';
import InnerComponent from './index.component';
import styles from './styles';

class DetailsScreenContainer extends Component {
	static navigationOptions = ({ navigation }) => ({
		title : navigation.state.params.title,
	});

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

	onRefresh = () => {
		const {
			data : { id },
			dispatch,
		} = this.props;

		dispatch(thunks.getGistById(id));
	}

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
	data : { details : data },
	loading : { refreshControl : loading },
} }) => ({
	data,
	loading,
});

const mapDispatchToProps = dispatch => ({
	dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreenContainer);

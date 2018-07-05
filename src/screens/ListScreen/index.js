import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { isEqual, cloneDeep, set } from 'lodash';
import { thunks } from '@redux/gists';
import Strings from '@I18n';
import { GistItem } from '@components';

class ListScreenContainer extends Component {
	static navigationOptions = {
		title : Strings.screens.list.title,
	};

	constructor(props) {
		super(props);

		this.state = {
			dataLength : props.data.length,
		};
	}

	static getDerivedStateFromProps = ({ data }, prevState) => {
		const newState = cloneDeep(prevState);

		if (!isEqual(newState.dataLength, data.length))
			set(newState, [ 'dataLength', data.length ]);

		return newState;
	}

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

	keyExtractor = ({ id }) => (id)

	renderItem = ({ item, index }) => (
		<GistItem
			data={ item }
			isLast={ index === this.state.dataLength - 1 }
		/>
	)

	onRefresh = () => this.props.dispatch(thunks.loadGists())

	render() {
		const {
			data,
			loading,
		} = this.props;

		return (
			<FlatList
				refreshing={ loading }
				data={ data }
				renderItem={ this.renderItem }
				keyExtractor={ this.keyExtractor }
				onRefresh={ this.onRefresh }
			/>
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

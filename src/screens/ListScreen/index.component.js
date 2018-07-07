import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { isEqual } from 'lodash';
import { GistPreview } from '@components';

class ListScreenComponent extends Component {
	shouldComponentUpdate = ({ data, loading }) => {
		const lastProps = this.props;

		return (
			!isEqual(data, lastProps.data) ||
			!isEqual(loading, lastProps.loading)
		);
	}

	keyExtractor = ({ id }) => (id)

	renderItem = ({ item, index }) => (
		<GistPreview
			isFirst={ index === 0 }
			data={ item }
		/>
	)

	render() {
		const {
			data,
			loading,
			onRefresh,
		} = this.props;

		return (
			<FlatList
				refreshing={ loading.refreshControl }
				data={ data }
				onRefresh={ onRefresh }
				keyExtractor={ this.keyExtractor }
				renderItem={ this.renderItem }
			/>
		);
	}
}

export default ListScreenComponent;

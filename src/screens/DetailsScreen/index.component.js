import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { isEqual } from 'lodash';
import { FilePreview } from '@components';

class DetailsScreenComponent extends Component {
	shouldComponentUpdate = ({ data, loading }) => {
		const lastProps = this.props;

		return (
			!isEqual(data, lastProps.data) ||
			!isEqual(loading, lastProps.loading)
		);
	}

	renderItem = ({ item }) => (
		<FilePreview
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
				refreshing={ loading }
				data={ data.filesArray }
				onRefresh={ onRefresh }
				renderItem={ this.renderItem }
			/>
		);
	}
}

export default DetailsScreenComponent;

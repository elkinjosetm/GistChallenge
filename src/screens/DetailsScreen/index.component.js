import React, { Component } from 'react';
import { SectionList } from 'react-native';
import { isEqual } from 'lodash';
import { FilePreview, SectionHeader, CommentPreview } from '@components';

class DetailsScreenComponent extends Component {
	shouldComponentUpdate = ({ sections, loading }) => {
		const lastProps = this.props;

		return (
			!isEqual(sections, lastProps.sections) ||
			!isEqual(loading, lastProps.loading)
		);
	}

	keyExtractor = ({ id }) => (id)

	renderItem = ({ item, index, section : { type } }) => {
		if (type === 'comments') {
			return (
				<CommentPreview
					data={ item }
					cardProps={ { removeTopSpacing : index === 0 } }
				/>
			);
		}

		return (
			<FilePreview
				data={ item }
				cardProps={ { removeTopSpacing : index === 0 } }
			/>
		);
	}

	renderSectionHeader = ({ section }) => (
		<SectionHeader
			text={ section.title }
		/>
	)

	render() {
		const {
			sections,
			loading,
			onRefresh,
		} = this.props;

		return (
			<SectionList
				refreshing={ loading }
				sections={ sections }
				onRefresh={ onRefresh }
				renderItem={ this.renderItem }
				renderSectionHeader={ this.renderSectionHeader }
				keyExtractor={ this.keyExtractor }
			/>
		);
	}
}

export default DetailsScreenComponent;

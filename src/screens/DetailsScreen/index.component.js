import React, { Component } from 'react';
import { SectionList, View } from 'react-native';
import { isEqual } from 'lodash';
import Strings from '@i18n';
import { FilePreview, SectionHeader, CommentPreview, Button } from '@components';
import styles from './styles';

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
			isPrevAvailable,
			isNextAvailable,
			onNavigate,
			onRefresh,
		} = this.props;
		const screenStrings = Strings.screens.details;

		return (
			<View style={ styles.container }>
				<SectionList
					style={ styles.list }
					refreshing={ loading }
					sections={ sections }
					onRefresh={ onRefresh }
					renderItem={ this.renderItem }
					renderSectionHeader={ this.renderSectionHeader }
					keyExtractor={ this.keyExtractor }
				/>
				<View style={ styles.footer }>
					<View style={ styles.buttonWrapper }>
						<If condition={ isPrevAvailable }>
							<Button
								title={ screenStrings.prevGist }
								onPress={ onNavigate('prev') }
								color="white"
							/>
						</If>
					</View>
					<View style={ styles.buttonWrapper }>
						<If condition={ isNextAvailable }>
							<Button
								title={ screenStrings.nextGist }
								onPress={ onNavigate('next') }
								color="white"
							/>
						</If>
					</View>
				</View>
			</View>
		);
	}
}

export default DetailsScreenComponent;

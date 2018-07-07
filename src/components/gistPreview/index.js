/* eslint camelcase : [off] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { isEqual, keys } from 'lodash';
import moment from 'moment';
import Strings from '@i18n';
import { __DATE_FORMAT__ } from '@constants';
import { Card, Icon } from '@components';
import styles from './styles';

class GistPreview extends Component {
	static propType = {
		cardProps : PropTypes.object,
		data      : PropTypes.shape({
			description : PropTypes.string,
		}).isRequired,
	};

	shouldComponentUpdate = ({
		cardProps,
		data,
	}) => {
		const lastProps = this.props;

		return (
			!isEqual(cardProps, lastProps.cardProps) ||
			!isEqual(data, lastProps.data)
		);
	}

	render() {
		const {
			cardProps,
			data : {
				description,
				created_at,
				files,
				comments,
			},
		} = this.props;
		const screenStrings = Strings.gistPreview;
		const fileLength = keys(files).length;
		let filesString = Strings.formatString(screenStrings.files, fileLength);
		let commentsString = Strings.formatString(screenStrings.comments, comments);

		if (fileLength === 1)
			filesString = screenStrings.singleFile;

		if (comments === 1)
			commentsString = screenStrings.singleComment;

		return (
			<Card { ...cardProps }>
				<View style={ styles.content }>
					<Text style={ [ styles.text, styles.title ] }>
						{ description }
					</Text>
					<Text style={ [ styles.text, styles.date ] }>
						{ moment(created_at).format(__DATE_FORMAT__) }
					</Text>
				</View>
				<View style={ styles.separator } />
				<View style={ styles.content }>
					<View style={ [ styles.content, styles.iconWrapper ] }>
						<Icon
							name="file-code-o"
						/>
						<Text style={ [ styles.text, styles.iconText ] }>
							{ filesString }
						</Text>
					</View>
					<View style={ [ styles.content, styles.iconWrapper ] }>
						<Icon
							name="comment-o"
						/>
						<Text style={ [ styles.text, styles.iconText ] }>
							{ commentsString }
						</Text>
					</View>
				</View>
			</Card>
		);
	}
}

export default GistPreview;

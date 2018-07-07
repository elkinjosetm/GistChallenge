/* eslint camelcase : [off] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { isEqual } from 'lodash';
import moment from 'moment';
import { __DATE_FORMAT__ } from '@constants';
import { Card } from '@components';
import styles from './styles';

class CommentPreview extends Component {
	static propType = {
		cardProps : PropTypes.object,
		data      : PropTypes.object.isRequired,
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
				created_at,
				body,
				user : { login : user },
			},
		} = this.props;

		return (
			<Card { ...cardProps }>
				<View style={ styles.content }>
					<Text style={ [ styles.text, styles.title ] }>
						{ user }
					</Text>
					<Text style={ [ styles.text, styles.date ] }>
						{ moment(created_at).format(__DATE_FORMAT__) }
					</Text>
				</View>
				<View style={ styles.separator } />
				<View style={ styles.content }>
					<Text style={ styles.text }>
						{ body }
					</Text>
				</View>
			</Card>
		);
	}
}

export default CommentPreview;

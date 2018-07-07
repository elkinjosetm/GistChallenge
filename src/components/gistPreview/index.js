/* eslint camelcase : [off] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';
import { isEqual } from 'lodash';
import moment from 'moment';
import { __DATE_FORMAT__ } from '@constants';
import styles from './styles';

class GistPreview extends Component {
	static propType = {
		isFirst : PropTypes.bool,
		data    : PropTypes.shape({
			description : PropTypes.string,
		}).isRequired,
	};

	static defaultProps = {
		isFirst : false,
	};

	shouldComponentUpdate = ({
		isFirst,
		data,
	}) => {
		const lastProps = this.props;

		return (
			!isEqual(isFirst, lastProps.isFirst) ||
			!isEqual(data, lastProps.data)
		);
	}

	render() {
		const {
			isFirst,
			data : {
				description,
				created_at,
			},
		} = this.props;

		return (
			<TouchableOpacity
				style={ [ styles.itemWrapper, isFirst ? styles.firstItem : undefined ] }
			>
				<View style={ styles.itemInnerContent }>
					<View style={ styles.header }>
						<Text style={ [ styles.text, styles.title ] }>
							{ description }
						</Text>
						<Text style={ [ styles.text, styles.date ] }>
							{ moment(created_at).format(__DATE_FORMAT__) }
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

export default GistPreview;

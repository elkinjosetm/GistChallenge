import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { isEqual } from 'lodash';
import { Card } from '@components';
import styles from './styles';

class FilePreview extends Component {
	static propType = {
		cardProps : PropTypes.object,
		data      : PropTypes.shape({
			filename : PropTypes.string,
			content  : PropTypes.string,
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
				filename,
				content,
			},
		} = this.props;

		return (
			<Card { ...cardProps }>
				<View style={ styles.content }>
					<Text style={ [ styles.text, styles.title ] }>
						{ filename }
					</Text>
				</View>
				<View style={ styles.separator } />
				<View style={ styles.content }>
					<Text style={ styles.text }>
						{ content }
					</Text>
				</View>
			</Card>
		);
	}
}

export default FilePreview;

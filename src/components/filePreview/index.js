import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { isEqual } from 'lodash';
import styles from './styles';

class FilePreview extends Component {
	static propType = {
		data : PropTypes.shape({
			filename : PropTypes.string,
			content  : PropTypes.string,
		}).isRequired,
	};

	shouldComponentUpdate = ({
		data,
	}) => {
		const lastProps = this.props;

		return (
			!isEqual(data, lastProps.data)
		);
	}

	render() {
		const {
			data : {
				filename,
				content,
			},
		} = this.props;

		return (
			<View style={ styles.container }>
				<View style={ styles.content }>
					<Text style={ [ styles.text, styles.title ] }>
						{ filename }
					</Text>
				</View>
				<View style={ [ styles.content, styles.fileContent ] }>
					<Text style={ styles.text }>
						{ content }
					</Text>
				</View>
			</View>
		);
	}
}

export default FilePreview;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { isEqual } from 'lodash';
import styles from './styles';

class GistPreview extends Component {
	static propType = {
		data : PropTypes.shape({
			description : PropTypes.string,
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
				description,
			},
		} = this.props;

		return (
			<View style={ styles.itemWrapper }>
				<Text style={ styles.text }>
					{ description }
				</Text>
			</View>
		);
	}
}

export default GistPreview;

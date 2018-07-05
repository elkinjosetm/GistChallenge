import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { isEqual } from 'lodash';
import styles from './styles';

class GistItem extends Component {
	static propType = {
		data : PropTypes.shape({
			description : PropTypes.string,
		}).isRequired,
		isLast : PropTypes.bool,
	};

	static defaultProps = {
		isLast : false,
	};

	shouldComponentUpdate = ({
		data,
		isLast,
	}) => {
		const lastProps = this.props;

		return (
			!isEqual(data, lastProps.data) ||
			!isEqual(isLast, lastProps.isLast)
		);
	}

	render() {
		const {
			isLast,
			data : {
				description,
			},
		} = this.props;

		return (
			<View
				style={ [
					styles.itemWrapper,
					!isLast ? styles.itemSeparation : undefined
				] }
			>
				<Text style={ styles.text }>
					{ description }
				</Text>
			</View>
		);
	}
}

export default GistItem;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { isEqual } from 'lodash';
import styles from './styles';

class Button extends Component {
	static propType = {
		title         : PropTypes.string.isRequired,
		activeOpacity : PropTypes.number,
		onPress       : PropTypes.func,
		size          : PropTypes.oneOf([
			'default',
			'sm',
			'lg',
			'xlg',
		]),
		color : PropTypes.oneOf([
			'default',
			'primary',
			'secondary',
			'tertiary',
			'white',
		]),
		style : PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.object,
			PropTypes.array,
		]),
		textStyle : PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.object,
			PropTypes.array,
		]),
	};

	static defaultProps = {
		activeOpacity : 0.8,
		size          : 'default',
		color         : 'default',
	};

	shouldComponentUpdate = ({
		title,
		activeOpacity,
		size,
		color,
		style,
		textStyle,
	}) => {
		const lastProps = this.props;

		return (
			!isEqual(title, lastProps.title) ||
			!isEqual(activeOpacity, lastProps.activeOpacity) ||
			!isEqual(size, lastProps.size) ||
			!isEqual(color, lastProps.color) ||
			!isEqual(style, lastProps.style) ||
			!isEqual(textStyle, lastProps.textStyle)
		);
	}

	render() {
		const {
			title,
			activeOpacity,
			onPress,
			size,
			color,
			style : buttonExtraStyle,
			textStyle : textExtraStyle,
		} = this.props;
		const style = [
			styles.button,
			styles[`${size}SizeButton`],
			styles[`${color}ColorButton`],
			buttonExtraStyle,
		];
		const textStyle = [
			styles.text,
			styles[`${size}SizeText`],
			styles[`${color}ColorText`],
			textExtraStyle,
		];

		return (
			<TouchableOpacity
				activeOpacity={ activeOpacity }
				style={ style }
				onPress={ onPress }
			>
				<Text style={ textStyle }>
					{ title }
				</Text>
			</TouchableOpacity>
		);
	}
}

export default Button;

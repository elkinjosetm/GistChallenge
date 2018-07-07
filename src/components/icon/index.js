import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import RawIcon from 'react-native-vector-icons/FontAwesome';
import { Metrics } from '@theme';

export default class Icon extends Component {
	static propTypes = {
		name  : PropTypes.string.isRequired,
		size  : PropTypes.number,
		color : PropTypes.string,
	};

	static defaultProps = {
		size  : Metrics.icon,
		color : null,
	};

	shouldComponentUpdate = ({ name, size, color }) => {
		const lastProps = this.props;

		return (
			!isEqual(name, lastProps.name) ||
			!isEqual(size, lastProps.size) ||
			!isEqual(color, lastProps.color)
		);
	}

	render() {
		const {
			name,
			size,
			color,
		} = this.props;

		return (
			<RawIcon
				name={ name }
				size={ size }
				color={ color }
			/>
		);
	}
}

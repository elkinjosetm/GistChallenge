import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, Text } from 'react-native';
import { isEqual, isUndefined } from 'lodash';
import { Colors } from '@theme';
import styles from './styles';

class Loading extends Component {
	static propTypes = {
		active          : PropTypes.bool,
		label           : PropTypes.string,
		color           : PropTypes.string,
		backgroundColor : PropTypes.string,
	};

	static defaultProps = {
		active          : false,
		color           : Colors.white,
		backgroundColor : Colors.primary,
	};

	shouldComponentUpdate = ({
		active,
		label,
		color,
		backgroundColor,
	}) => {
		const lastProps = this.props;

		return (
			!isEqual(active, lastProps.active) ||
			!isEqual(label, lastProps.label) ||
			!isEqual(color, lastProps.color) ||
			!isEqual(backgroundColor, lastProps.backgroundColor)
		);
	}

	render() {
		const {
			active,
			label,
			color,
			backgroundColor,
		} = this.props;

		if (!active)
			return <View />;

		return (
			<View style={ styles.loadingWrapper }>
				<View style={ styles.loadingOverlay } />
				<View style={ [ styles.loadingBox, { backgroundColor } ] }>
					<ActivityIndicator color={ color } />
					<If condition={ !isUndefined(label) }>
						<Text style={ [ styles.loadingLabel, { color } ] }>
							{ label }
						</Text>
					</If>
				</View>
			</View>
		);
	}
}

export default Loading;

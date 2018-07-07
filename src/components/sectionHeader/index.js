import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';

class SectionHeader extends PureComponent {
	static propType = {
		text : PropTypes.string.isRequired,
	};

	render() {
		const {
			text,
		} = this.props;

		return (
			<View style={ styles.wrapper }>
				<View style={ styles.background }/>
				<Text style={ styles.text }>
					{ text }
				</Text>
			</View>
		);
	}
}

export default SectionHeader;

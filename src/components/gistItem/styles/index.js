import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '@theme';

export default StyleSheet.create({
	itemWrapper : {
		padding : 16,
	},

	itemSeparation : {
		borderBottomWidth : Metrics.borderWidth,
		borderBottomColor : Colors.black,
	},

	text : {
		fontSize   : Metrics.fontSize,
		lineHeight : Metrics.fontSize,
		color      : Colors.black,
	},
});

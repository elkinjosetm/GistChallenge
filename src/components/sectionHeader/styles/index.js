import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '@theme';

export default StyleSheet.create({
	wrapper : {
		paddingHorizontal : Metrics.screenSpacing,
		paddingTop        : Metrics.screenSpacing,
		paddingBottom     : (Metrics.screenSpacing / 2),
		marginBottom      : 5,
	},

	absolute : {
		position : 'absolute',
		top      : 0,
		left     : 0,
		bottom   : 0,
		right    : 0,
	},

	text : {
		color      : Colors.black,
		fontSize   : Metrics.fontSize,
		lineHeight : Metrics.fontSize,
		fontWeight : Metrics.fontWeightBold,
	},
});

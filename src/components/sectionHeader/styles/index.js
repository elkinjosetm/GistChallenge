import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '@theme';

export default StyleSheet.create({
	wrapper : {
		paddingHorizontal : Metrics.screenSpacing,
		paddingTop        : Metrics.screenSpacing,
		paddingBottom     : (Metrics.screenSpacing / 2),
		backgroundColor   : Colors.mainBackground,
	},

	text : {
		color      : Colors.black,
		fontSize   : Metrics.fontSize,
		lineHeight : Metrics.fontSize,
		fontWeight : Metrics.fontWeightBold,
	},
});

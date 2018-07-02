import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '@theme';

export default StyleSheet.create({
	textInput : {
		borderColor       : Colors.primary,
		borderWidth       : Metrics.borderWidth,
		borderRadius      : Metrics.borderRadius,
		fontSize          : Metrics.fontSize,
		paddingVertical   : 8,
		paddingHorizontal : 16,
	},
});

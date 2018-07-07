import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '@theme';

export default StyleSheet.create({
	textInput : {
		...ApplicationStyles.screen.shadow,
		backgroundColor   : Colors.white,
		borderColor       : Colors.primary,
		borderWidth       : Metrics.borderWidth,
		borderRadius      : Metrics.borderRadius,
		fontSize          : Metrics.fontSize,
		paddingHorizontal : Metrics.screenSpacing,
		paddingVertical   : (Metrics.screenSpacing / 2),
	},

	errorState : {
		borderColor : Colors.secondary,
	},
});

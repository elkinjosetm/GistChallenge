import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '@theme';

export default StyleSheet.create({
	button : {
		...ApplicationStyles.screen.shadow,
		alignItems        : 'center',
		paddingVertical   : 8,
		paddingHorizontal : 30,
		borderRadius      : Metrics.borderRadius,
		backgroundColor   : Colors.iron,
	},

	text : {
		textAlign  : 'center',
		fontSize   : Metrics.fontSize,
		lineHeight : Metrics.fontSize,
		color      : Colors.black,
	},

	smSizeButton  : { paddingVertical : 5, paddingHorizontal : 20 },
	lgSizeButton  : { paddingVertical : 8, paddingHorizontal : 40 },
	xlgSizeButton : { paddingVertical : 8, paddingHorizontal : 60 },

	primaryColorButton   : { backgroundColor : Colors.primary },
	secondaryColorButton : { backgroundColor : Colors.secondary },
	tertiaryColorButton  : { backgroundColor : Colors.tertiary },
	whiteColorButton     : { backgroundColor : Colors.white },

	smSizeText  : { fontSize : 13, lineHeight : 13 },
	lgSizeText  : { fontSize : 20, lineHeight : 20 },
	xlgSizeText : { fontSize : 25, lineHeight : 25 },

	primaryColorText   : { color : Colors.white },
	secondaryColorText : { color : Colors.white },
	tertiaryColorText  : { color : Colors.white },
	whiteColorText     : { color : Colors.black },
});

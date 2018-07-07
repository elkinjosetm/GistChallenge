import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '@theme';

export default StyleSheet.create({
	content : {
		flexDirection : 'row',
		alignItems    : 'center',
	},

	separator : {
		marginTop         : Metrics.screenSpacing / 2,
		marginBottom      : Metrics.screenSpacing / 2,
		borderBottomWidth : Metrics.borderWidth,
		borderBottomColor : Colors.pumice,
	},

	text : {
		fontSize   : Metrics.fontSize,
		lineHeight : Metrics.fontSize,
		color      : Colors.black,
	},

	title : {
		flex       : 1,
		fontWeight : Metrics.fontWeightBold,
	},

	date : {
		flex       : 0,
		color      : Colors.pumice,
		fontSize   : Metrics.fontSizeSmall,
		lineHeight : Metrics.fontSizeSmall,
		fontWeight : Metrics.fontWeightLight,
	},

	iconWrapper : {
		paddingRight : Metrics.screenSpacing,
	},

	iconText : {
		top        : 2,
		marginLeft : 5,
	},
});

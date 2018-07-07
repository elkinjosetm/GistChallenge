import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '@theme';

export default StyleSheet.create({
	container : {
		padding         : Metrics.screenSpacing,
		marginTop       : Metrics.screenSpacing / 2,
		marginBottom    : Metrics.screenSpacing / 2,
		backgroundColor : Colors.white,
	},

	content : {
		flexDirection : 'row',
		alignItems    : 'center',
	},

	fileContent : {
		paddingTop : Metrics.screenSpacing / 2,
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
});

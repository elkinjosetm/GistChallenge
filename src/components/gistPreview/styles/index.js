import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '@theme';

export default StyleSheet.create({
	itemWrapper : {
		paddingHorizontal : Metrics.screenSpacing,
		paddingTop        : (Metrics.screenSpacing / 2),
		paddingBottom     : (Metrics.screenSpacing / 2),
	},

	firstItem : {
		paddingTop : Metrics.screenSpacing,
	},

	itemInnerContent : {
		...ApplicationStyles.screen.shadow,
		borderRadius    : Metrics.borderRadius,
		backgroundColor : Colors.white,
		padding         : Metrics.screenSpacing,
	},

	header : {
		flexDirection : 'row',
		alignItems    : 'center',
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
});

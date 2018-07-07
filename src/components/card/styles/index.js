import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Metrics } from '@theme';

export default StyleSheet.create({
	wrapper : {
		paddingHorizontal : Metrics.screenSpacing,
		paddingTop        : (Metrics.screenSpacing / 2),
		paddingBottom     : (Metrics.screenSpacing / 2),
	},

	useFullTopSpacing : {
		paddingTop : Metrics.screenSpacing,
	},

	removeTopSpacing : {
		paddingTop : null,
	},

	innerContent : {
		borderRadius    : Metrics.borderRadius,
		backgroundColor : Colors.white,
		padding         : Metrics.screenSpacing,
	},

	shadow : {
		...ApplicationStyles.screen.shadow,
		borderRadius : Metrics.borderRadius,
	},
});

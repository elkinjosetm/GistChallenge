import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '@theme';

const centeredContent = {
	justifyContent : 'center',
	alignItems     : 'center',
};

const absoluteElement = {
	position : 'absolute',
	top      : 0,
	left     : 0,
	right    : 0,
	bottom   : 0,
};

export default StyleSheet.create({
	loadingWrapper : {
		...centeredContent,
		...absoluteElement,
	},

	loadingOverlay : {
		...absoluteElement,
		backgroundColor : Colors.white,
		opacity         : 0.4,
	},

	loadingBox : {
		...centeredContent,
		padding      : 16,
		borderRadius : Metrics.borderRadius,
	},

	loadingLabel : {
		fontSize   : 13,
		lineHeight : 13,
		marginTop  : 13,
	},
});

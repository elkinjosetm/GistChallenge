import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics } from '@theme';

export default StyleSheet.create({
	container : {
		...ApplicationStyles.screen.container,
	},

	innerWrapper : {
		padding : 60,
	},

	description : {
		fontSize     : Metrics.fontSize,
		lineHeight   : Metrics.fontSize,
		marginBottom : 16,
	},

	textInput : {
		marginBottom : 10,
	},
});

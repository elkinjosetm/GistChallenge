import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors } from '@theme';

export default StyleSheet.create({
	container : {
		...ApplicationStyles.screen.container,
	},

	list : {
		flex : 1,
	},

	footer : {
		flex              : 0,
		flexDirection     : 'row',
		backgroundColor   : Colors.primary,
		paddingHorizontal : Metrics.screenSpacing / 2,
	},

	buttonWrapper : {
		flex              : 1,
		paddingHorizontal : Metrics.screenSpacing / 2,
		paddingVertical   : Metrics.screenSpacing / 2,
	},
});

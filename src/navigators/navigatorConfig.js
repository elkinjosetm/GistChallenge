import { ApplicationStyles } from '@theme';

export const mainStackConfig = {
	headerTransitionPreset : 'uikit',
	cardStyle              : ApplicationStyles.navigation.card,
	navigationOptions      : {
		headerBackTitle  : null,
		headerStyle      : ApplicationStyles.navigation.header.wrapper,
		headerTitleStyle : ApplicationStyles.navigation.header.title,
		headerTintColor  : ApplicationStyles.navigation.header.buttonColor,
	},
};

export const rootConfig = {
	headerMode : 'none',
	mode       : 'modal',
	cardStyle  : ApplicationStyles.navigation.card,
};

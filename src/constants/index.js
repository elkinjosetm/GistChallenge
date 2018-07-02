import { Platform } from 'react-native';

export const __KEYBOARD_AWARE_SCROLL_VIEW_PROPS__ = {
	enableOnAndroid   : true,
	extraScrollHeight : 15,
	extraHeight       : Platform.OS !== 'ios' ? 105 : undefined,
};

export default {
	__KEYBOARD_AWARE_SCROLL_VIEW_PROPS__,
};

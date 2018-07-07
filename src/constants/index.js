import { Platform } from 'react-native';

export const __KEYBOARD_AWARE_SCROLL_VIEW_PROPS__ = {
	enableOnAndroid   : true,
	extraScrollHeight : 15,
	extraHeight       : Platform.OS !== 'ios' ? 105 : undefined,
};

export const __DATE_FORMAT__ = 'MM/DD/YYYY';

export default {
	__KEYBOARD_AWARE_SCROLL_VIEW_PROPS__,
	__DATE_FORMAT__,
};

import React, { PureComponent } from 'react';
import { KeyboardAwareScrollView as RawKeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { __KEYBOARD_AWARE_SCROLL_VIEW_PROPS__ } from '@constants';

class KeyboardAwareScrollView extends PureComponent {
	render() {
		const {
			children,
			...props
		} = this.props;

		return (
			<RawKeyboardAwareScrollView
				{ ...__KEYBOARD_AWARE_SCROLL_VIEW_PROPS__ }
				{ ...props }
			>
				{ children }
			</RawKeyboardAwareScrollView>
		);
	}
}

export default KeyboardAwareScrollView;

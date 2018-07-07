import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput as RawTextInput } from 'react-native';
import { isEqual, cloneDeep, set, omit, isFunction, has } from 'lodash';
import styles from './styles';

class TextInput extends Component {
	static propType = {
		value           : PropTypes.string,
		hasError        : PropTypes.bool,
		onChange        : PropTypes.func,
		onSubmitEditing : PropTypes.func,
		style           : PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.object,
			PropTypes.array,
		]),
	};

	static defaultProps = {
		value    : '',
		hasError : false,
	};

	constructor(props) {
		super(props);

		this.debounceTimeout = null;
		this.debounceCallback = null;
		this.state = {
			value : props.value,
		};
	}

	static getDerivedStateFromProps = ({ value }, prevState) => {
		const newState = cloneDeep(prevState);

		if (!isEqual(newState.value, value))
			set(newState, [ 'value', value ]);

		return newState;
	}

	shouldComponentUpdate = ({ style, hasError }, { value }) => {
		const lastProps = this.props;
		const lastState = this.state;

		return (
			!isEqual(style, lastProps.style) ||
			!isEqual(hasError, lastProps.hasError) ||
			!isEqual(value, lastState.value)
		);
	}

	/**
	 * Function onChange
	 *
	 * When the textField change the value, we
	 * only update the value  locally so we can
	 * prevent the redux state to be updated just
	 * by typing real fast, which could cause the
	 * app to slow down because of the JS thread
	 * getting full quickly.
	 *
	 * So we need only execute the onChange handler
	 * after 300 ms
	 */
	onChange = value => {
		const { onChange } = this.props;

		this.setState({ value });

		/**
		 * Clear any possible
		 * debounce callback
		 * hanging there
		 */
		if (this.debounceTimeout !== null)
			clearTimeout(this.debounceTimeout);

		this.debounceCallback = () => {
			// Make sure onChange is a function
			if (isFunction(onChange))
				onChange(value);

			this.debounceCallback = null;
		};

		/**
		 * Setup the debounce function
		 * to prevent updating the redux
		 * state right away
		 */
		this.debounceTimeout = setTimeout(this.debounceCallback, 300);
	}

	focus = () => this.toggleFocus(true)

	blur = () => this.toggleFocus(false)

	toggleFocus = focus => {
		const ref = this.field;

		if (focus && has(ref, 'focus'))
			ref.focus();

		if (!focus && has(ref, 'blur'))
			ref.blur();
	}

	onSubmitEditing = () => {
		const { onSubmitEditing } = this.props;

		/**
		 * Manually execute the debounceCallback
		 * and clear the timeout right away
		 */
		if (this.debounceTimeout !== null) {
			clearTimeout(this.debounceTimeout);

			if (isFunction(this.debounceCallback))
				this.debounceCallback();
		}

		/**
		 * Execute onSubmitEditing function
		 * if it's defined, but only do so
		 * if when the JS thread is empty
		 */
		if (isFunction(onSubmitEditing))
			setTimeout(onSubmitEditing, 0);
	}

	render() {
		const {
			hasError,
			style : extraStyle,
			...props
		} = omit(this.props, [ 'value', 'onChange', 'onSubmitEditing' ]);
		const { value } = this.state;
		const style = [
			styles.textInput,
			hasError ? styles.errorState : undefined,
			extraStyle,
		];

		return (
			<RawTextInput
				{ ...props }
				style={ style }
				value={ value }
				ref={ ref => { this.field = ref; } }
				onChangeText={ this.onChange }
				onSubmitEditing={ this.onSubmitEditing }
			/>
		);
	}
}

export default TextInput;

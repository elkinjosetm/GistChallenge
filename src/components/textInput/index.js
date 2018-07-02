import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput as RawTextInput } from 'react-native';
import { isEqual, cloneDeep, set, omit, isFunction } from 'lodash';
import styles from './styles';

class TextInput extends Component {
	static propType = {
		value    : PropTypes.string,
		onChange : PropTypes.func,
		style    : PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.object,
			PropTypes.array,
		]),
	};

	static defaultProps = {
		value : '',
	};

	constructor(props) {
		super(props);

		this.debounce = null;
		this.debounceFn = null;
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

	shouldComponentUpdate = ({ style }, { value }) => {
		const lastState = this.state;

		return (
			!isEqual(value, lastState.value) ||
			!isEqual(style, lastState.style)
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

		this.setState({ value }, () => {
			/**
			 * Clear any possible
			 * debounce callback
			 * hanging there
			 */
			if (this.debounce !== null)
				clearTimeout(this.debounce);

			this.debounceFn = () => {
				// Make sure onChange is a function
				if (isFunction(onChange))
					onChange(value);

				this.debounceFn = null;
			};

			/**
			 * Setup the debounce function
			 * to prevent updating the redux
			 * state right away
			 */
			this.debounce = setTimeout(this.debounceFn, 300);
		});
	}

	render() {
		const {
			style : extraStyle,
			...props
		} = omit(this.props, [ 'value', 'onChange' ]);
		const { value } = this.state;
		const style = [
			styles.textInput,
			extraStyle,
		];

		return (
			<RawTextInput
				{ ...props }
				style={ style }
				value={ value }
				onChangeText={ this.onChange }
			/>
		);
	}
}

export default TextInput;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';
import { Header as RawHeader } from 'react-navigation';
import { ApplicationStyles } from '@theme';

class Header extends PureComponent {
	static propTypes = {
		title              : PropTypes.string,
		headerLeftTitle    : PropTypes.string,
		headerRightTitle   : PropTypes.string,
		onPressHeaderLeft  : PropTypes.func,
		onPressHeaderRight : PropTypes.func,
	};

	static defaultProps = {
		title      : '',
		navigation : { state : { index : 0 } }
	};

	getScene = () => {
		const {
			title,
			headerRightTitle,
			onPressHeaderRight,
			headerLeftTitle,
			onPressHeaderLeft,
		} = this.props;
		const options = {
			title,
			headerStyle      : ApplicationStyles.navigation.header.wrapper,
			headerTitleStyle : ApplicationStyles.navigation.header.title,
		};

		if (headerLeftTitle) {
			options.headerLeft = (
				<Button
					title={ headerLeftTitle }
					onPress={ onPressHeaderLeft }
					color={ ApplicationStyles.navigation.header.buttonColor }
				/>
			);
		}

		if (headerRightTitle) {
			options.headerRight = (
				<Button
					title={ headerRightTitle }
					onPress={ onPressHeaderRight }
					color={ ApplicationStyles.navigation.header.buttonColor }
				/>
			);
		}

		return {
			index      : 0,
			descriptor : { options },
		};
	}

	render() {
		const {
			navigation,
		} = this.props;
		const scene = this.getScene();
		const scenes = [
			{
				...scene,
				isActive : true,
			}
		];

		return (
			<RawHeader
				scene={ scene }
				scenes={ scenes }
				navigation={ navigation }
			/>
		);
	}
}

export default Header;

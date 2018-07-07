import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { isUndefined } from 'lodash';
import styles from './styles';

class Card extends PureComponent {
	static propType = {
		removeTopSpacing  : PropTypes.bool,
		useFullTopSpacing : PropTypes.bool,
		disabled          : PropTypes.bool,
		onPress           : PropTypes.func,
	};

	static defaultProps = {
		removeTopSpacing  : false,
		useFullTopSpacing : false,
		disabled          : false,
	};

	render() {
		const {
			useFullTopSpacing,
			removeTopSpacing,
			disabled,
			onPress,
			children,
		} = this.props;

		/**
		 * Only Add show to the innerBox,
		 * when the card is not Touchable.
		 *
		 * Because when it's touchable,
		 * the shadow, is added to the
		 * touchableComponent.
		 *
		 * We have to do this because on
		 * Android, since the innerContent
		 * is wrapper by a touchableComponent,
		 * the shadow is not visible
		 */
		const innerContent = (
			<View
				style={ [
					styles.innerContent,
					isUndefined(onPress) ? styles.shadow : undefined
				] }
			>
				{ children }
			</View>
		);

		return (
			<View
				style={ [
					styles.wrapper,
					useFullTopSpacing ? styles.useFullTopSpacing : undefined,
					removeTopSpacing ? styles.removeTopSpacing : undefined,
				] }
			>
				<Choose>
					<When condition={ isUndefined(onPress) }>
						{ innerContent }
					</When>
					<Otherwise>
						<TouchableOpacity
							style={ styles.shadow }
							onPress={ onPress }
							activeOpacity={ 0.8 }
							disabled={ disabled }
						>
							{ innerContent }
						</TouchableOpacity>
					</Otherwise>
				</Choose>
			</View>
		);
	}
}

export default Card;

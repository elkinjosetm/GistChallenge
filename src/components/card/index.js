import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { isUndefined } from 'lodash';
import styles from './styles';

class Card extends PureComponent {
	static propType = {
		first    : PropTypes.bool,
		disabled : PropTypes.bool,
		onPress  : PropTypes.func,
	};

	static defaultProps = {
		first    : false,
		disabled : false,
	};

	render() {
		const {
			first,
			disabled,
			onPress,
			children,
		} = this.props;

		const innerContent = (
			<View style={ styles.innerContent }>
				{ children }
			</View>
		);

		return (
			<View style={ [ styles.wrapper, first ? styles.first : undefined ] }>
				<Choose>
					<When condition={ isUndefined(onPress) }>
						{ innerContent }
					</When>
					<Otherwise>
						<TouchableOpacity
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

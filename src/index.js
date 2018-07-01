import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '@redux-core';
import { Colors } from '@theme';
import Root from '@screens/root';
import styles from '@screens/root/styles';

const { store, persistor } = configureStore();

export default class App extends Component {
	shouldComponentUpdate = () => (false)

	render() {
		return (
			<View style={ styles.container }>
				<StatusBar
					barStyle="light-content"
					backgroundColor={ Colors.primary }
					translucent={ false }
				/>
				<Provider store={ store }>
					<PersistGate persistor={ persistor }>
						<Root />
					</PersistGate>
				</Provider>
			</View>
		);
	}
}

import React from 'react'
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import ReduxStore from './src/redux/reduxstore';
import Routes from './src/routes';
import LoginScreen from './src/container/loginScreen'
import RegisterScreen from './src/container/registerScreen'

const App = () => {
    return (
        <Provider store={ReduxStore()}>
            <Routes />
        </Provider>
    )
}

AppRegistry.registerComponent('mtcticketing', () => App);

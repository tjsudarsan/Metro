import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import WelcomeScreen from '../container/welcomeScreen';
import LoginScreen from '../container/loginScreen';
import RegisterScreen from '../container/registerScreen';

const Routes = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene key="welcomeScreen" component={WelcomeScreen} hideNavBar={true} />
                <Scene key="loginScreen" component={LoginScreen} hideNavBar={true} />
                <Scene key="registerScreen" component={RegisterScreen} hideNavBar={true} />
            </Scene>
        </Router>
    )
}

export default Routes;
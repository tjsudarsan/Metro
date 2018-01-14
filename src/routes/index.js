import React from 'react';
import {connect} from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import WelcomeScreen from '../container/welcomeScreen';
import LoginScreen from '../container/loginScreen';
import RegisterScreen from '../container/registerScreen';
import DashboardScreen from '../container/dashboardScreen';

const Routes = () => {
    return (
        <Router>
            <Scene key="root">
                {true ?
                        <Scene key="dashboardScreen" component={DashboardScreen} hideNavBar={true} /> 
                    :
                        <Scene>
                        <Scene key="welcomeScreen" component={WelcomeScreen} hideNavBar={true} initial/>
                        <Scene key="loginScreen" component={LoginScreen} hideNavBar={true} />
                        <Scene key="registerScreen" component={RegisterScreen} hideNavBar={true} />
                        </Scene>
                }
            </Scene>
        </Router>
    )
}

export default connect()(Routes);
import React from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import WelcomeScreen from '../container/welcomeScreen';
import LoginScreen from '../container/loginScreen';
import RegisterScreen from '../container/registerScreen';
import DashboardScreen from '../container/dashboardScreen';
import ProfileScreen from '../container/profileScreen';
import WalletScreen from '../container/walletScreen';
import TicketsScreen from '../container/ticketsScreen';
import TrackBusScreen from '../container/trackBusScreen';
import TravelHistoryScreen from '../container/travelHistoryScreen';

class Routes extends React.Component {
    render(){
        return (
            <Router>
                <Scene key="root">
                    <Scene key="main" initial={this.props.userDetails.isLoggedIn}>
                        <Scene key="dashboardScreen" component={DashboardScreen} hideNavBar={true} initial />
                        <Scene key="ticketsScreen" component={TicketsScreen} hideNavBar={true} />
                        <Scene key="trackBusScreen" component={TrackBusScreen} hideNavBar={true} />
                        <Scene key="travelHistoryScreen" component={TravelHistoryScreen} hideNavBar={true} />
                        <Scene key="profileScreen" component={ProfileScreen} hideNavBar={true} />
                        <Scene key="walletScreen" component={WalletScreen} hideNavBar={true} />
                    </Scene>
                
                    <Scene key="auth" initial={!this.props.userDetails.isLoggedIn}>
                        <Scene key="welcomeScreen" component={WelcomeScreen} hideNavBar={true} initial />
                        <Scene key="loginScreen" component={LoginScreen} hideNavBar={true} />
                        <Scene key="registerScreen" component={RegisterScreen} hideNavBar={true} />
                    </Scene>
                </Scene>
            </Router>
        )
    }
}

const mapStateToProps = (state) => ({
    userDetails: state.userDetails
})

export default connect(mapStateToProps)(Routes);
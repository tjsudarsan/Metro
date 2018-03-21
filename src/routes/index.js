import React from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import { Router, Scene, Actions, Switch } from 'react-native-router-flux';
import WelcomeScreen from '../container/welcomeScreen';
import LoginScreen from '../container/loginScreen';
import RegisterScreen from '../container/registerScreen';
import DashboardScreen from '../container/dashboardScreen';
import ProfileScreen from '../container/profileScreen';
import WalletScreen from '../container/walletScreen';
import TicketsScreen from '../container/ticketsScreen';
import TrackBusScreen from '../container/trackBusScreen';
import TravelHistoryScreen from '../container/travelHistoryScreen';
import PINVerifyScreen from '../container/pinVerifyScreen';

import {updateTravelHistory} from '../services'
import {ticketsUpdate} from '../redux/actions'

class Routes extends React.Component {
    render(){
        return (
            <Router>
                {/* <Scene key="root">
                    <Scene key="profileScreen" component={ProfileScreen} hideNavBar={true} />
                </Scene> */}
                <Scene 
                    key="root"
                    onEnter={()=>this.props.userDetails.isLoggedIn ? Actions.main() : Actions.auth() }
                 >
                    <Scene key="main" initial>
                        <Scene key="dashboardScreen" onEnter={()=>this.props.userDetails.isLoggedIn ? {} : Actions.auth() } component={DashboardScreen} hideNavBar={true}  />
                        <Scene key="ticketsScreen" component={TicketsScreen} hideNavBar={true} />
                        <Scene key="pinVerifyScreen" component={PINVerifyScreen} hideNavBar={true} />
                        <Scene key="trackBusScreen" component={TrackBusScreen} hideNavBar={true} />
                        <Scene onEnter={()=>{
                            updateTravelHistory(this.props.userDetails.uid)
                                .then(res=>{
                                    if(res.status === true){
                                        this.props.dispatch(ticketsUpdate(res.travelHistory))
                                    }
                                })
                        }} key="travelHistoryScreen" component={TravelHistoryScreen} hideNavBar={true} />
                        <Scene key="profileScreen" component={ProfileScreen} hideNavBar={true} />
                        <Scene key="walletScreen" component={WalletScreen} hideNavBar={true} />
                    </Scene>
                
                    <Scene key="auth" initial>
                        <Scene key="welcomeScreen" component={WelcomeScreen} hideNavBar={true} initial />
                        <Scene key="loginScreen" onEnter={()=>this.props.userDetails.isLoggedIn ? Actions.main() : {} } component={LoginScreen} hideNavBar={true} />
                        <Scene key="registerScreen" onEnter={()=>this.props.userDetails.isLoggedIn ? Actions.main() : {} } component={RegisterScreen} hideNavBar={true} />
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
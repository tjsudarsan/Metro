import React from 'react';
import {View,Text, StyleSheet, Image} from 'react-native';
import Header from '../../components/Header';
import ticketIcon from '../../assests/images/tickets.png'
import trackingIcon from '../../assests/images/tracking.png'
import travelHistoryIcon from '../../assests/images/history.png'
import profileIcon from '../../assests/images/profile.png'
import walletIcon from '../../assests/images/wallet.png'

export default class DashboardScreen extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Header title={"Dashboard"} />
                <View style={styles.infoContainer}>
                    <View style={styles.infoLeftContainer}>
                        <Text style={styles.userNameStyle}>Sudarsan T J</Text>
                    </View>
                    <View style={styles.infoRightContainer}>
                        <Image source={walletIcon}  style={{height: 20, width: 20}}/>
                        <Text>₹ 100.00</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemLeft}>
                            <Image source={ticketIcon} style={styles.imageStyle}/> 
                        </View>
                        <View style={styles.itemRight}>
                            <Text style={styles.optionTitle}>Tickets</Text>
                            <Text>Buy e-Tickets</Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemLeft}>
                            <Image source={trackingIcon} style={styles.imageStyle}/> 
                        </View>
                        <View style={styles.itemRight}>
                            <Text style={styles.optionTitle}>Track Bus</Text>
                            <Text>View Real-time Location of the Buses Near to You</Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemLeft}>
                            <Image source={travelHistoryIcon} style={styles.imageStyle}/> 
                        </View>
                        <View style={styles.itemRight}>
                            <Text style={styles.optionTitle}>Travel History</Text>
                            <Text>View Your Ticket and Travel History</Text>
                        </View>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemLeft}>
                            <Image source={profileIcon} style={styles.imageStyle}/> 
                        </View>
                        <View style={styles.itemRight}>
                            <Text style={styles.optionTitle}>Profile</Text>
                            <Text>View and Edit Your Details</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userNameStyle: {
        fontSize: 20,
        color: 'black'
    },
    wallet: {
        fontSize: 15,
        color: '#b90000'
    },
    body: {
        flex: 1,
    },
    infoContainer: {
        height: '11%',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    infoLeftContainer:{
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 20
    },
    infoRightContainer: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black'
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '3%',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        paddingTop: 10,
        paddingBottom: 10 
    },
    itemLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemRight: {
        flex: 2
    },
    imageStyle :{
        height: 60,
        width: 60
    }
})
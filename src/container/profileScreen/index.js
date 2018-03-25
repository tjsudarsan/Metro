import React, {Fragment} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Header from '../../components/Header'
import PrimaryButton from '../../components/PrimaryButton'
import {logout} from '../../redux/actions'

class ProfileScreen extends React.Component {

    render(){
        return (
            <Fragment>
                <Header title="Profile" />
                <View style={styles.container}>
                    <Text style={styles.userDetails}>Full Name: <Text style={{color: 'black'}}>{this.props.userDetails.fullName}</Text></Text>
                    <Text style={styles.userDetails}>Date Of Birth: <Text style={{color: 'black'}}>{this.props.userDetails.dob}</Text></Text>
                    <Text style={styles.userDetails}>Phone Number: <Text style={{color: 'black'}}>{this.props.userDetails.phoneNumber}</Text></Text>
                    <Text style={styles.userDetails}>Wallet Balance: <Text style={{color: 'black'}}>₹ {this.props.userDetails.walletAmount}/-</Text></Text>
                    <PrimaryButton label={"Logout"} onPress={() => {
                        Actions.reset('auth');
                        this.props.dispatch(logout())
                    }} />
               </View>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: 'white'
        // justifyContent: 'center'
    },
    userDetails: {
        marginTop: 10,
        color: '#b90000',
        fontSize: 20,
        marginBottom: 25
    }
});

const mapStateToProps = (state) => ({
    userDetails : state.userDetails
})

export default connect(mapStateToProps)(ProfileScreen);
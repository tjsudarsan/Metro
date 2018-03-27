import React, {Fragment} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import walletIcon from '../../assests/images/wallet.png'
import TextField from '../../components/TextField'
import RazorpayCheckout from 'react-native-razorpay';
import MetroIcon from '../../assests/images/bus.png'
import {walletRecharge} from '../../services/index'
import {updateWalletAmount} from '../../redux/actions'

class WalletScreen extends React.Component {
    state = {
        loadWalletAmount: null,
        isLoading: false
    }

    handleLoadAmount(){
        var options = {
            description: 'eWallet Recharge',
            image: 'https://i.imgur.com/ftBOurM.png',
            currency: 'INR',
            key: 'rzp_test_j0HH5xVMc17k5Q',
            amount: (parseInt(this.state.loadWalletAmount)*100).toString(),
            name: 'Metro',
            prefill: {
                email: '',
                contact: '',
                name: ''
            },
            theme: {color: '#B90000'}
        }
        if(this.state.loadWalletAmount !== null){
            RazorpayCheckout.open(options).then((data) => {
                walletRecharge(this.props.userDetails.uid, parseInt(this.state.loadWalletAmount))
                    .then(res=>{
                        if(res.status === true){
                            this.props.dispatch(updateWalletAmount(res.walletAmount))                      
                        }else {
                            Alert.alert(
                                'Error!',
                                'Something Went Wrong',
                                [{text: 'Ok'}]
                            )
                        }
                    })
            }).catch((error) => {
                console.log(`Error: ${error.code} | ${error.description}`);
            });
        }
    }
    render(){
        return (
            <Fragment>
                <View style={styles.container}>
                    <Text style={styles.walletHeading}>eWallet</Text>
                    <Text style={styles.infotext}>Your eWallet balance is</Text>
                    {
                        this.state.isLoading ? 
                            <ActivityIndicator size={70} color="#b90000" />
                            :
                            <Text style={styles.walletamount}>₹ {this.props.userDetails.walletAmount}/-</Text>
                    }
                    <Text style={{marginTop: 50,marginBottom: 20, fontSize: 20, color: '#b90000'}}>Load Money</Text>
                    <TextField
                        placeholder="Enter Amount"
                        underlineColorAndroid="#b90000"
                        placeholderTextColor="grey"
                        onChangeText={(e)=>this.setState({loadWalletAmount: e})}
                        autoCapitalize="none"
                        keyboardType="numeric"
                        style={{fontSize: 18, color: '#b90000'}}
                    />
                    <TouchableOpacity onPress={()=>this.handleLoadAmount()} activeOpacity={0.8} style={styles.loadbtn}>
                        <Text style={styles.btntext}>Load</Text>
                    </TouchableOpacity>
                </View>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center'
    },
    walletHeading: {
        color: '#b90000',
        fontSize: 50,
        marginTop: 25
    },
    walletamount:{
        fontSize: 80,
        color: 'black',
        marginTop: 15,
    },
    infotext:{
        marginTop: 50
    },
    loadmoneycontainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
    },
    loadbtn: {
        backgroundColor: '#b90000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 5,
        margin: 10
    },
    btntext:{
        color: 'white',
        fontSize: 20
    }
});

const mapStateToProps = (state) => ({
    userDetails: state.userDetails
})

export default connect(mapStateToProps)(WalletScreen);
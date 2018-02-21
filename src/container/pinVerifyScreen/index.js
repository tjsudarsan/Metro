import React, { Fragment } from 'react'
import {View,Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Header from '../../components/Header';
import PrimaryButton from '../../components/PrimaryButton'
import {checkPIN, ticketGeneration} from '../../services'
import {updateTravelHistory, updateWalletAmount} from '../../redux/actions'

class PINVerifyScreen extends React.Component {
    state={
        pinNumber: '',
        isLoading: false
    }

    handleConfirm(){
        this.setState({isLoading: true})
        checkPIN(this.props.userDetails.uid, this.state.pinNumber)
            .then(res=>{
                if(res.status === true){
                    ticketGeneration(
                        this.props.userDetails.uid,
                        this.props.tempDetails.from,
                        this.props.tempDetails.to,
                        this.props.tempDetails.fare
                    ).then(res=>{
                        if(res.status === true){
                            Alert.alert(
                                'Success!',
                                'Ticket Generated Successfully',
                                [{text: 'OK'}]
                            )
                            this.props.dispatch(updateTravelHistory(res.ticket));
                            this.props.dispatch(updateWalletAmount(res.walletAmount));
                            Actions.travelHistoryScreen();
                        }else{
                            Alert.alert(
                                'Attention!',
                                res.error,
                                [{text: 'Ok'}]
                            )
                            Actions.dashboardScreen();
                        }
                    })
                }else{
                    Alert.alert(
                        'Attention!',
                        res.error,
                        [{text: 'Ok'}]
                    )
                    this.setState({pinNumber: '', isLoading: false});
                }
            })
    }

    render(){
        return (
            <Fragment>
                {this.state.isLoading ? 
                    <View style={{flex: 1, alignItems: 'center', justifyContent:'center',backgroundColor: 'white'}}>
                        <ActivityIndicator size={75} color="#b90000" />
                    </View>
                    :
                    <Fragment>
                        <Header title={"PIN Verification"} />
                        <View style={styles.container}>
                            <Text style={styles.info}>Enter your 4-digit PIN number to proceed the payment.</Text>
                            <TextInput
                                placeholder="Enter PIN"
                                placeholderTextColor="grey"
                                underlineColorAndroid="transparent"
                                secureTextEntry
                                keyboardType="numeric"
                                maxLength={4}
                                style={styles.input}
                                onChangeText={e=>this.setState({pinNumber: e})}
                                value={this.state.pinNumber}
                            />
                            <View style={{marginTop: 50}}>
                                <PrimaryButton
                                    onPress={this.handleConfirm.bind(this)}
                                    label="CONFIRM"
                                />
                            </View>
                        </View>
                    </Fragment>
                }
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    input:{
        width: 300,
        textAlign: 'center',
        fontSize: 20,
        borderWidth: 1,
        borderColor: '#b90000',
        borderRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 25
    },
    info: {
        width: 200,
        marginTop: 50,
        textAlign: 'center'
    }
})

const mapStateToProps = (state) => ({
    userDetails : state.userDetails,
    tempDetails: state.tempDetails
})

export default connect(mapStateToProps)(PINVerifyScreen);
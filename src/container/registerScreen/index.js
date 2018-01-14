import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PrimaryButton from '../../components/PrimaryButton';
import TextField from '../../components/TextField';
import {checkAadhaar,checkUserName,userRegister} from '../../services';
import welcomeScreenBg from '../../assests/images/welcomescreenbg.jpg';

export default class RegisterScreen extends React.Component {
    constructor(){
        super();
        this.state={
            isAadhaarExisting: false,
            isUserNameExisting: false,
            uid: '',
            userName: '',
            password: '',
            fullName: '',
            pinNumber: '',
            phoneNumber: '',
            disabled: false
        }
    }

    handleRegister(){
        console.log("pressed")
        if(this.state.isAadhaarExisting && !this.state.isUserNameExisting && this.state.uid.length === 12){
            if(this.state.uid !== '' && this.state.userName !== '' && this.state.password !== '' && this.state.fullName !== '' && this.state.pinNumber !== '' && this.state.phoneNumber !== ''){
                userRegister({
                    uid: this.state.uid,
                    userName: this.state.userName,
                    password: this.state.password,
                    fullName: this.state.fullName,
                    pinNumber: this.state.pinNumber,
                    phoneNumber: this.state.phoneNumber
                }).then(res => {
                    res.status ? 
                        Alert.alert(
                            'Registration Successful',
                            'Please Login to Continue',
                            [{text: 'Login', onPress: () => Actions.loginScreen()}],
                            { cancelable: false }
                        ) 
                        : 
                        Alert.alert(
                            'Something Went Wrong!',
                            res.error,
                            [{text: 'Ok'}]
                        )
                })
            }else{
                Alert.alert(
                    'Attention!',
                    'Please Enter All Details to Proceed',
                    [{text: 'Ok'}]
                );
            }
        }else{
            Alert.alert(
                'Attention!',
                'Invalid Aadhaar No or Username',
                [{text: 'Ok'}]
            )
        }
        
        
    }

    render(){
        return (
            <ImageBackground imageStyle={{resizeMode: 'cover'}} style={styles.backgroundImage} source={welcomeScreenBg}>
                <View style={styles.contentContainer}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Metro</Text>
                        <Text style={{color: 'white'}}>Buy e-Tickets and Track Buses</Text>                    
                        <Text style={{marginTop: '5%',fontSize: 30, color: 'white'}}>Register</Text>
                    </View>
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Enter Aadhaar Number"
                            underlineColorAndroid= "white"
                            placeholderTextColor= "white"
                            maxLength={12}
                            keyboardType="numeric"
                            onChangeText={(e)=>this.setState({uid: e})}
                            onEndEditing={(e) => {
                                checkAadhaar(parseInt(e.nativeEvent.text)).then(res=>this.setState({isAadhaarExisting: res.status}));                                              
                            }}
                        />
                    </View>
                    {this.state.uid === '' ? <Text></Text> : this.state.isAadhaarExisting ? <Text></Text> : <Text style={{color: '#b90000'}}>Invalid Aadhaar Number</Text>}
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Enter Full Name"
                            underlineColorAndroid="white"
                            placeholderTextColor="white"
                            onChangeText={(e)=>this.setState({fullName: e})}
                        />
                    </View>
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Enter Username"
                            underlineColorAndroid="white"
                            placeholderTextColor="white"
                            onChangeText={(e)=>this.setState({userName: e})}
                            onEndEditing={(e) => checkUserName(e.nativeEvent.text).then(res=>this.setState({isUserNameExisting: res.status}))}
                        />
                    </View>
                    {this.state.isUserNameExisting ? <Text style={{color: '#b90000'}}>Username Taken!</Text> : <Text></Text>}
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Enter Password"
                            underlineColorAndroid="white" 
                            placeholderTextColor="white"
                            secureTextEntry                            
                            onChangeText={(e)=>this.setState({password: e})}
                        />
                    </View>
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Set PIN"
                            keyboardType="numeric"
                            underlineColorAndroid="white" 
                            placeholderTextColor="white"
                            maxLength={4}
                            secureTextEntry
                            onChangeText={(e)=>this.setState({pinNumber: e})}
                        />
                    </View>
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Enter 10 digit Mobile No"
                            underlineColorAndroid="white" 
                            placeholderTextColor="white"
                            maxLength={10}
                            keyboardType="numeric"
                            onChangeText={(e)=>this.setState({phoneNumber: e})}
                        />
                    </View>
                    <View style={styles.registerButtonContainer}>
                        <PrimaryButton onPress={this.handleRegister.bind(this)} label={"Register"} />
                    </View>
                </View>
            </ImageBackground>
        );  
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1
    },
    contentContainer:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center'
    },
    logoContainer:{
        alignItems: 'center',
        marginTop: '2%'
    },
    logoText: {
        fontSize: 50,
        color: 'black',
        fontWeight: 'bold',
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    registerButtonContainer:{
        alignItems: 'center',
        marginTop: '5%'
    },
    textFieldContainer:{
        alignItems: 'center',
        marginTop: '1%'
    }
});
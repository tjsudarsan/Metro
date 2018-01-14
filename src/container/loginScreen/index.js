import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PrimaryButton from '../../components/PrimaryButton';
import TextField from '../../components/TextField'
import welcomeScreenBg from '../../assests/images/welcomescreenbg.jpg';

export default class LoginScreen extends React.Component {

    render(){
        const styles = StyleSheet.create({
                backgroundImage: {
                    flex: 1
                },
                contentContainer:{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.6)'
                },
                logoContainer:{
                    alignItems: 'center',
                    marginTop: '20%'
                },
                logoText: {
                    fontSize: 50,
                    color: 'black',
                    fontWeight: 'bold',
                    color: 'white',
                    borderBottomWidth: 1,
                    borderBottomColor: 'white'
                },
                loginButtonContainer:{
                    alignItems: 'center',
                    marginTop: '5%'
                },
                textFieldContainer:{
                    alignItems: 'center',
                    marginTop: '5%'
                },
                newUserText:{
                    textAlign: 'center',
                    marginTop: '5%',
                    color: 'white'
                }
            });

        return (
            <ImageBackground imageStyle={{resizeMode: 'cover'}} style={styles.backgroundImage} source={welcomeScreenBg}>
                <View style={styles.contentContainer}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Metro</Text> 
                        <Text style={{color: 'white'}}>Buy e-Tickets and Track Buses</Text>                   
                        <Text style={{marginTop: '5%',fontSize: 30, color: 'white'}}>Login</Text>
                    </View>
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Username"
                            underlineColorAndroid="white"
                            placeholderTextColor="white"
                        />
                    </View>
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Password"
                            underlineColorAndroid="white" 
                            placeholderTextColor="white"
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.loginButtonContainer}>
                        <PrimaryButton label={"Login"} />
                    </View>
                    <Text style={styles.newUserText}>New User? <Text onPress={() => Actions.registerScreen()} style={{fontWeight: 'bold',textDecorationLine: 'underline'}}>SignUp</Text></Text>
                </View>
            </ImageBackground>
        );  
    }
}

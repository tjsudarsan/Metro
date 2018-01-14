import React from 'react';
import { View, Text, StyleSheet, ImageBackground} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import TextField from '../../components/TextField'
import welcomeScreenBg from '../../assests/images/welcomescreenbg.jpg';

export default class RegisterScreen extends React.Component {

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
                            underlineColorAndroid="white"
                            placeholderTextColor="white"
                            maxLength={12}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Enter Full Name"
                            underlineColorAndroid="white"
                            placeholderTextColor="white"
                        />
                    </View>
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Enter Username"
                            underlineColorAndroid="white"
                            placeholderTextColor="white"
                        />
                    </View>
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Enter Password"
                            underlineColorAndroid="white" 
                            placeholderTextColor="white"
                            secureTextEntry
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
                        />
                    </View>
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Enter 10 digit Mobile No"
                            underlineColorAndroid="white" 
                            placeholderTextColor="white"
                            maxLength={10}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.registerButtonContainer}>
                        <PrimaryButton label={"Register"} />
                    </View>
                </View>
            </ImageBackground>
        );  
    }
}

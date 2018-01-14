import React from 'react';
import { View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PrimaryButton from '../../components/PrimaryButton';
import welcomeScreenBg from '../../assests/images/welcomescreenbg.jpg';

export default class WelcomeScreen extends React.Component {

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
                    marginTop: '15%'
                },
                registerButtonContainer:{
                    alignItems: 'center',
                },
                orContainer:{
                    alignItems: 'center',
                    marginTop: '5%',
                    marginBottom: '5%',
                },
                orText: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    borderWidth: 1.5,
                    borderRadius: 100,
                    borderColor: 'white',
                    padding: 8
                }
            });

        return (
            <ImageBackground style={styles.backgroundImage} source={welcomeScreenBg}>
                <View style={styles.contentContainer}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Metro</Text>                    
                        <Text style={{fontSize: 40, color: 'white'}}>Welcome!</Text>
                        <Text style={{color: 'white'}}>Buy e-Tickets and Track Buses</Text>
                    </View>
                    <View style={styles.loginButtonContainer}>
                        <PrimaryButton label={"Login"} onPress={() => Actions.loginScreen()} />
                    </View>
                    <View style={styles.orContainer}>
                        <Text style={styles.orText}>OR</Text>
                    </View>
                    <View style={styles.registerButtonContainer}>
                        <PrimaryButton label={"Register"} onPress={() => Actions.registerScreen()}/>
                    </View>
                </View>
            </ImageBackground>
        );  
    }
}

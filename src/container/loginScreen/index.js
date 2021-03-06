import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert,ScrollView, ActivityIndicator} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loadUserDetails} from '../../redux/actions'
import {userLogin} from '../../services'
import PrimaryButton from '../../components/PrimaryButton';
import TextField from '../../components/TextField'
import welcomeScreenBg from '../../assests/images/welcomescreenbg.jpg';

class LoginScreen extends React.Component {
    constructor(){
        super();

        this.state= {
            userName: '',
            password: '',
            isLoading: false
        }
    }

    handleLogin(){
        if(this.state.userName !== '' && this.state.password !== ''){
            this.setState({isLoading: true});
            userLogin({
                userName: this.state.userName,
                password: this.state.password
            }).then((res)=>{
                if(res.error){
                    Alert.alert(
                        'Login Unsuccessful',
                        res.error,
                        [{text: 'Ok'}],
                        {clickable: false}
                    )
                    this.setState({isLoading: false})
                }else{
                    this.props.dispatch(loadUserDetails({...res, isLoggedIn: true}));
                    Actions.main();
                }
            })
        }else{
            Alert.alert(
                'Attention',
                'Please Provide Username and Password',
                [{text: 'Ok'}],
                {clickable: false}
            )
        }
    }

    render(){
        return (
            <ImageBackground imageStyle={{resizeMode: 'cover'}} style={styles.backgroundImage} source={welcomeScreenBg}>
                <ScrollView keyboardShouldPersistTaps="always" style={styles.contentContainer}>
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
                            onChangeText={(e)=>this.setState({userName: e})}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.textFieldContainer}>
                        <TextField
                            placeholder="Password"
                            underlineColorAndroid="white" 
                            placeholderTextColor="white"
                            onChangeText={(e)=>this.setState({password: e})}
                            secureTextEntry
                        />
                    </View>
                    {this.state.isLoading ?
                        <ActivityIndicator size={50} color="white" />
                        :
                        <View style={styles.loginButtonContainer}>
                            <PrimaryButton onPress={this.handleLogin.bind(this)} label={"Login"} />
                        </View>
                    }
                    <Text style={styles.newUserText}>New User? <Text onPress={() => Actions.registerScreen()} style={{fontWeight: 'bold',textDecorationLine: 'underline'}}>SignUp</Text></Text>
                </ScrollView>
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


const mapStateToProps = (state) => ({
    userDetails : state.userDetails
})

export default connect(mapStateToProps)(LoginScreen);
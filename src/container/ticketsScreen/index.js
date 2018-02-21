import React, { Fragment } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {busStops} from '../../assests/busStops.json';
import {fareCalculation} from '../../services'
import {ticketingFareFromAndToTemp} from '../../redux/actions'

class TicketsScreen extends React.Component {
    state = {
        fromLocation: '',
        toLocation: '',
        isFareLoading: false,
        fare : null,
        fromList: [],
        toList: [],
        fromSelected: false,
        toSelected: false
    }

    handleFromChange(e){
        var fromList = busStops.filter(busStop => 
            busStop.trim().toLowerCase().includes(e.toLowerCase())
        ).map(busStop=>busStop);
        this.setState({
            fromList,
            fromLocation: e,
            toList: [],
            fromSelected: false,
            fare: null
        })
    }

    handleToChange(e){
        var toList = busStops.filter(busStop => 
            busStop.trim().toLowerCase().includes(e.toLowerCase())
        ).map(busStop=>busStop);
        this.setState({
            toList,
            toLocation: e,
            fromList: [],
            toSelected: false,
            fare: null
        })
    }

    handleFromSelect(from){
        this.setState({
            fromLocation: from,
            fromSelected: true,
            fromList: []
        });
        if(this.state.toLocation === from){
            Alert.alert(
                'Attention!',
                'From and To cannot be Same',
                [{text: 'Ok'}]
            );
            this.setState({
                fromLocation: '',
                toLocation: '',
                fromList: [],
                toList: []
            })
        }else if(this.state.toLocation !== '' && this.state.toLocation !== from){
            this.setState({isFareLoading: true})
            fareCalculation(from,this.state.toLocation)
                .then(res=>{
                    if(res.status === true){
                        this.setState({
                            isFareLoading: false,
                            fare: res.fare
                        })
                    }else {
                        Alert.alert(
                            'Error!',
                            res.error,
                            [{text: 'Ok'}]
                        )
                        this.setState({
                            isFareLoading: false
                        })
                    }
                })
        }
    }
    
    handleToSelect(to){
        this.setState({
            toLocation: to,
            toSelected: true,
            toList: []
        });
        if(this.state.fromLocation === to){
            Alert.alert(
                'Attention!',
                'From and To cannot be Same',
                [{text: 'Ok'}]
            );
            this.setState({
                fromLocation: '',
                toLocation: '',
                fromList: [],
                toList: []
            })
        }else if(this.state.fromLocation !== '' && this.state.fromLocation !== to){
            this.setState({isFareLoading: true})
            fareCalculation(this.state.fromLocation,to)
                .then(res=>{
                    if(res.status === true){
                        this.setState({
                            isFareLoading: false,
                            fare: res.fare
                        })
                    }else {
                        Alert.alert(
                            'Error!',
                            res.error,
                            [{text: 'Ok'}]
                        )
                        this.setState({
                            isFareLoading: false
                        })
                    }
                })
        }
    }

    handlePay(){
        this.props.dispatch(ticketingFareFromAndToTemp(this.state.fare,this.state.fromLocation,this.state.toLocation));
        Actions.pinVerifyScreen();
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Buy Ticket</Text>
                </View>
                {this.state.fromLocation !== '' && this.state.fromList.length !== 0 ? 
                    <ScrollView keyboardShouldPersistTaps="always" style={styles.fromList}>
                        {this.state.fromList.map((item,key)=>{
                            return (
                                <Text onPress={()=>this.handleFromSelect(item)} key={key} style={{paddingBottom: 10, paddingTop: 10}}>{item}</Text>
                            )
                        })}
                    </ScrollView>
                    :
                    null
                }
                {this.state.toLocation !== '' && this.state.toList.length !== 0 ? 
                    <ScrollView keyboardShouldPersistTaps="always" style={styles.toList}>
                        {this.state.toList.map((item,key)=>{
                            return (
                                <Text onPress={()=>this.handleToSelect(item)} key={key} style={{paddingBottom: 10, paddingTop: 10}}>{item}</Text>
                            )
                        })}
                    </ScrollView>
                    :
                    null
                }
                <View style={styles.fromToContainer}>
                    <View style={styles.location}>
                        <TextInput 
                            placeholder="Enter From"
                            placeholderTextColor="#b90000"
                            underlineColorAndroid="#b90000"
                            style={{width: 300,color: '#b90000'}}
                            onChangeText={e=>this.handleFromChange(e)}
                            value={this.state.fromLocation}
                        />
                    </View>
                    <View style={styles.location}>
                        <TextInput 
                            placeholder="Enter To"
                            placeholderTextColor="#b90000"
                            underlineColorAndroid="#b90000"
                            style={{width: 300,color: '#b90000'}}
                            onChangeText={e=>this.handleToChange(e)}
                            value={this.state.toLocation}
                        />
                    </View>
                </View>
                <View style={styles.fareDisplay}>
                    {this.state.isFareLoading ? 
                        <ActivityIndicator size={60} color="#b90000" />
                        :
                        <Fragment>
                            {this.state.fare !== null ? 
                                <Text style={styles.fare}>{`₹ ${this.state.fare}/-`}</Text>
                                :
                                <Text>Please select 'From' and 'To'</Text>
                            }
                        </Fragment>
                    }
                </View>
                {this.state.fare !== null ? 
                    <TouchableOpacity activeOpacity={0.8} style={styles.payBtn} onPress={()=>this.handlePay()}>
                        <Text style={{fontSize: 20, color: 'white'}}>Pay</Text>
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    header:{
        width: '100%',
        backgroundColor: '#b90000',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    headerText: {
        color: 'white',
        fontSize: 18
    },
    fromToContainer: {
        marginTop: 25
    },
    fareDisplay: {
        height: 200,
        justifyContent: 'center'
    },
    fare: {
        fontSize: 40,
        color: '#b90000',
        borderWidth: 1,
        borderColor: '#b90000',
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40
    },
    payBtn:{
        borderWidth: 1,
        borderColor: '#b90000',
        borderRadius: 5,
        backgroundColor: '#b90000',
        width:200,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fromList: {
        position: 'absolute',
        backgroundColor: 'white',
        elevation: 5,
        top:130,
        bottom:10,
        width: 300,
        paddingLeft: 10
    },
    toList:{
        position: 'absolute',
        backgroundColor: 'white',
        elevation: 5,
        top:175,
        bottom: 10,
        width: 300,
        paddingLeft: 10
    }
});

export default connect()(TicketsScreen);
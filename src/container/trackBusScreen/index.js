import React, { Fragment } from 'react';
import { View, Text, StyleSheet, BackHandler, TextInput, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import MapView from 'react-native-maps';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import moment from 'moment';
import database from '../../services/firebase';
import { listBuses } from '../../services';
import toIcon from '../../assests/images/toicon.png';
import fromIcon from '../../assests/images/fromicon.png';
import busIcon from '../../assests/images/bus.png';
import busStopData from '../../assests/busStops.json';

class TrackBusScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            lat: 0,
            lon: 0,
            userInput: {
                from: '',
                to: ''
            },
            selectedBusDetails: {
                busNo: null,
                distance: null,
                time: null,
                latitude: null,
                longitude: null
            },
            fromStops: [],
            toStops: [],
            fromSelected: false,
            toSelected: false,
            busList: [
                // {busNo: "S553K-1", distance: 137, time: 28000},
                // {busNo: "S525-1", distance: 13464, time: 1783000},
                // {busNo: "S554-1", distance: 18563, time: 2169000},
                // {busNo: "S553K-1", distance: 137, time: 28000},
                // {busNo: "S525-1", distance: 13464, time: 1783000},
                // {busNo: "S554-1", distance: 18563, time: 2169000}
            ],
            isLoading: false
        }
    }

    componentWillMount() {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "Location Services needs To be Enabled. This Apps Needs to Access the GPS Location Sensor",
            ok: "Yes",
            cancel: "No",
            enableHighAccuracy: true,
            showDialog: true,
            openLocationServices: true,
            preventOutSideTouch: true,
            preventBackClick: true
        }).then(() => {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                })
            })

        }).catch(err => {
            console.log(err.message);
        })
    }
    handleFromType(e) {
        var busStops = busStopData.busStops.filter(busStop =>
            busStop.trim().toLowerCase().includes(e.toLowerCase())
        ).map(busStop => busStop);
        var userInput = this.state.userInput;
        userInput.from = e;
        this.setState({ fromStops: busStops, toStops: [], fromSelected: false, userInput })
    }
    handleToType(e) {
        var busStops = busStopData.busStops.filter(busStop =>
            busStop.trim().toLowerCase().includes(e.toLowerCase())
        ).map(busStop => busStop);
        var userInput = this.state.userInput;
        userInput.to = e;
        this.setState({ fromStops: [], toStops: busStops, toSelected: false, userInput })
    }
    handleFromSelect(text) {
        var userInput = this.state.userInput;
        userInput.from = text;
        this.setState({ userInput, fromSelected: true, fromStops: [] });              
        if(userInput.to === text){
            Alert.alert(
                'Attention!',
                'From and To locations cannot be Same',
                [{text: 'Ok'}],
                {clickable: false}
            )
        }else if(userInput.to !== text && this.state.userInput.to !== ''){
            this.setState({isLoading: true})
            listBuses(userInput.from,userInput.to)
                .then(result=>{
                    // console.log(result)
                    if(result.status === false){
                        Alert.alert(
                            'Attention!',
                            'No bus is available at this time. Please try after sometime.',
                            [{text: 'Ok'}]
                        )
                        this.setState({busList: [], isLoading: false});
                    }else if(result.status === true){
                        var unSortedBusList = result.data;
                        unSortedBusList.sort((a,b)=>{
                            if(parseFloat(a.distance) < parseFloat(b.distance)){
                                return -1;
                            }
                            if(parseFloat(a.distance) > parseFloat(b.distance)){
                                return 1;
                            }
                            return 0;
                        });
                        this.setState({busList: unSortedBusList, isLoading: false});
                    }
                })      
        }
    }
    handleToSelect(text) {
        var userInput = this.state.userInput;
        userInput.to = text;
        this.setState({ userInput, toSelected: true, toStops: [] });        
        if(userInput.from === text){
            Alert.alert(
                'Attention!',
                'From and To locations cannot be Same',
                [{text: 'Ok'}],
                {clickable: false}
            )
        }else if(userInput.from !== text && this.state.userInput.from !== ''){
            this.setState({isLoading: true})
            listBuses(userInput.from,userInput.to)
                .then(result=>{
                    console.log(result)
                    if(result.status === false){
                        Alert.alert(
                            'Attention!',
                            'No bus is available at this time. Please try after sometime.',
                            [{text: 'Ok'}]
                        )
                        this.setState({busList: [], isLoading: false});
                    }else if(result.status === true){
                        var unSortedBusList = result.data;
                        unSortedBusList.sort((a,b)=>{
                            if(parseFloat(a.distance) < parseFloat(b.distance)){
                                return -1;
                            }
                            if(parseFloat(a.distance) > parseFloat(b.distance)){
                                return 1;
                            }
                            return 0;
                        });
                        this.setState({busList: unSortedBusList, isLoading: false});
                    }
                })      
        }
    }
    handleBusSelect(bus){
        console.log("bus select")
        database.ref(`buses/${bus.busNo}`).on('value',(dataSnapshot)=>{
            var selectedBusDetails = {
                busNo: bus.busNo,
                distance: bus.distance,
                time: bus.time,
                latitude: dataSnapshot.val().latitude,
                longitude: dataSnapshot.val().longitude 
            };
            console.log(selectedBusDetails)
            this.setState({selectedBusDetails,lat: selectedBusDetails.latitude, lon: selectedBusDetails.longitude});
        })
    }
    render() {
        // console.log(this.state.selectedBusDetails)
        return (
            <View style={styles.container}>
                {this.state.fromStops.length > 0 && this.state.userInput.from !== '' ?
                    <ScrollView keyboardShouldPersistTaps="always" style={styles.fromItemsList}>
                        {this.state.fromStops.map((busStop, key) => {
                            return (
                                <TouchableOpacity onPress={() => this.handleFromSelect(busStop)} key={key} style={styles.listItem}>
                                    <Text>{busStop}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    : null}
                {this.state.toStops.length > 0 && this.state.userInput.to !== '' ?
                    <ScrollView keyboardShouldPersistTaps="always" style={styles.toItemsList}>
                        {this.state.toStops.map((busStop, key) => {
                            return (
                                <TouchableOpacity onPress={() => this.handleToSelect(busStop)} key={key} style={styles.listItem}>
                                    <Text>{busStop}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    : null}
                <MapView
                    style={styles.map}
                    region={{
                        latitude: this.state.lat,
                        longitude: this.state.lon,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    provider="google"
                    showsUserLocation
                >
                    {this.state.selectedBusDetails.busNo !== null ? 
                        <MapView.Marker
                            coordinate={{
                                latitude: this.state.selectedBusDetails.latitude,
                                longitude: this.state.selectedBusDetails.longitude
                            }}
                            title={this.state.selectedBusDetails.busNo}
                        >
                        <Image source={busIcon} style={{width: 30, height: 30}} />
                        </MapView.Marker> 
                    : null}
                </MapView>
                <View style={styles.header} >
                    <Text style={styles.title}>Track Buses</Text>
                    <View>
                        <View style={styles.textFieldContainer}>
                            <Image source={fromIcon} style={styles.fromToIcon} />
                            <TextInput
                                style={styles.textInput}
                                value={this.state.userInput.from}
                                underlineColorAndroid="transparent"
                                onChangeText={(e) => this.handleFromType(e)}
                                placeholder="From"
                            />
                        </View>
                        <View style={styles.textFieldContainer}>
                            <Image source={toIcon} style={styles.fromToIcon} />
                            <TextInput
                                style={styles.textInput}
                                underlineColorAndroid="transparent"
                                placeholder="To"
                                value={this.state.userInput.to}
                                onChangeText={(e) => this.handleToType(e)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.showBuses}>
                    {this.state.isLoading ? 
                        <ActivityIndicator size={50} color="#b90000" />
                        :
                        <Fragment>
                        {this.state.busList.length > 0 ?
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {this.state.busList.map((bus,key)=>{
                                    return (
                                        <TouchableOpacity key={key} style={this.state.selectedBusDetails.busNo === bus.busNo ? styles.selectedBusItem : styles.busItemContainer} onPress={()=>this.handleBusSelect(bus)}>
                                                <Text style={this.state.selectedBusDetails.busNo === bus.busNo ? {color: 'white'} : {color: '#b90000'}}>{bus.busNo}</Text>
                                        </TouchableOpacity>
                                    )
                                })} 
                            </ScrollView> 
                            : <Text style={{color: '#b90000',padding:10}}>Please Select "From" and "To" to View Buses</Text>}
                        </Fragment>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        top: 200
    },
    header: {
        height: 125,
        backgroundColor: '#b90000',
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 18,
        margin: 0,
        padding: 0,
        color: "white",
        fontWeight: "bold",
        paddingBottom: 8
    },
    textInput: {
        width: 250,
        color: 'black',
        backgroundColor: "white",
        padding: 1,
        borderRadius: 2,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5
    },
    textFieldContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    fromToIcon: {
        height: 20,
        width: 20,
        marginRight: 10
    },
    showBuses: {
        height: 75,
        backgroundColor: "white",
        elevation: 4,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center'
    },
    fromItemsList: {
        position: 'absolute',
        top: 75,
        bottom: 75,
        backgroundColor: 'white',
        width: '90%',
        marginLeft: 18,
        elevation: 10,
        zIndex: 100
    },
    toItemsList: {
        position: 'absolute',
        top: 115,
        bottom: 75,
        backgroundColor: 'white',
        width: '90%',
        marginLeft: 18,
        elevation: 10,
        zIndex: 100
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },
    busItemContainer: {
        padding: 15,
        borderWidth: 2,
        borderColor: '#b90000',
        borderRadius: 100,
        marginLeft: 5,
        marginRight: 5
    },
    selectedBusItem: {
        padding: 15,
        borderWidth: 2,
        borderColor: '#b90000',
        borderRadius: 100,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#b90000'
    },
});

// const mapStateToProps = (state)=>({
// })

export default connect()(TrackBusScreen);
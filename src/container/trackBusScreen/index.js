import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import MapView from 'react-native-maps';

class TrackBusScreen extends React.Component {
    state={
        lat: 0,
        lon: 0
    }

    componentWillMount(){
        navigator.geolocation.getCurrentPosition(position=>{
            this.setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            })
        })
    }
    render(){
        
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: this.state.lat,
                        longitude: this.state.lon,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.lat,
                            longitude: this.state.lon
                        }}
                        title={"Test"}
                        description={"Test Description"}
                    />
                </MapView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    //   ...StyleSheet.absoluteFillObject,
    //   height: 400,
    //   width: 400,
    //   justifyContent: 'flex-end',
    //   alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

export default connect()(TrackBusScreen);
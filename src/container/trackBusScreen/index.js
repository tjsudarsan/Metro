import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {connect} from 'react-redux';

class TrackBusScreen extends React.Component {
    render(){
        return (
            <View>
                <Text>TrackBusScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default connect()(TrackBusScreen);
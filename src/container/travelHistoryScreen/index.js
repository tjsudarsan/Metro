import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {connect} from 'react-redux';

class TravelHistoryScreen extends React.Component {
    render(){
        return (
            <View>
                <Text>TravelHistoryScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default connect()(TravelHistoryScreen);
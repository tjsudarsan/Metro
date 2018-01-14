import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {connect} from 'react-redux';

class TicketsScreen extends React.Component {
    render(){
        return (
            <View>
                <Text>TicketsScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default connect()(TicketsScreen);
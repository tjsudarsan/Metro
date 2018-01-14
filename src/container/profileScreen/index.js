import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {connect} from 'react-redux';

class ProfileScreen extends React.Component {
    render(){
        return (
            <View>
                <Text>Profile</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default connect()(ProfileScreen);
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {connect} from 'react-redux';

class WalletScreen extends React.Component {
    render(){
        return (
            <View>
                <Text>Wallet</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default connect()(WalletScreen);
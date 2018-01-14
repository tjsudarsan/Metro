import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({title}) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: '11%',
        elevation: 10,
        backgroundColor: '#b90000',
        justifyContent: 'center'
    },
    titleText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default Header;
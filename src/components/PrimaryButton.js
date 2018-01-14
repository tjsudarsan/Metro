import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const PrimaryButton = ({label, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.buttonContainer}>
            <Text style={styles.labelText}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    buttonContainer: {
        width: 150,
        borderWidth: 1,
        borderColor: '#b90000',
        backgroundColor: '#b90000',
        borderRadius: 5
    },
    labelText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    }
}

export default PrimaryButton;
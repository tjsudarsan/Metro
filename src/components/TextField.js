import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default TextField = ({placeholderTextColor,maxLength, keyboardType, placeholder, underlineColorAndroid, secureTextEntry}) => {
    const styles = StyleSheet.create({
        textFieldStyle : {
            width: 250,
            fontSize: 18,
            color: placeholderTextColor
        }
    })
    return (
        <TextInput 
            style={styles.textFieldStyle}
            underlineColorAndroid={underlineColorAndroid}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            keyboardType={keyboardType}
            maxLength={maxLength}
            selectionColor={placeholderTextColor}
        />
    );
    
}


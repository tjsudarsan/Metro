import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default TextField = ({onEndEditing,onChangeText, placeholderTextColor,maxLength, keyboardType, placeholder, underlineColorAndroid, secureTextEntry}) => {
    const styles = StyleSheet.create({
        textFieldStyle : {
            width: 250,
            fontSize: 18,
            color: placeholderTextColor
        }
    })
    return (
        <TextInput 
            onEndEditing={onEndEditing}
            onChangeText={onChangeText}
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


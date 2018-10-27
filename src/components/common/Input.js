import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, placeholder, value, onChangeText, secureTextEntry }) => {
    const { inputContainer, labelStyle, inputStyle } = styles;
    return(
        <View style={inputContainer}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry = {secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                value = {value}
                onChangeText={text => onChangeText(text)}
                style={inputStyle}
            />
        </View>
    )
};

const styles = {
    inputContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    inputStyle: {
        color: '#000',
        fontSize: 18,
        paddingRight: 5,
        paddingLeft: 5,
        lineHeight: 23,
        flex: 2
    }
}
export { Input };


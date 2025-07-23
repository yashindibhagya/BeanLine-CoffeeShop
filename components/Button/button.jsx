import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ text, onPress, type = 'solid', style }) => (
    <TouchableOpacity
        style={[
            styles.button,
            type === 'outline' ? styles.outline : styles.solid,
            style,
        ]}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <Text style={[styles.text, type === 'outline' && styles.outlineText]}>
            {text}
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        borderRadius: 50,
        alignItems: 'center',
        borderWidth: 2,
        width: '90%',
    },
    solid: {
        backgroundColor: '#934B1F',
        borderColor: '#934B1F',
    },
    outline: {
        backgroundColor: 'transparent',
        borderColor: '#934B1F',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    outlineText: {
        color: '#934B1F',
    },
});

export default Button;
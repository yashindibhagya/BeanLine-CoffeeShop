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
        backgroundColor: '#D2691E',
        borderColor: '#D2691E',
    },
    outline: {
        backgroundColor: 'transparent',
        borderColor: '#D2691E',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    outlineText: {
        color: '#D2691E',
    },
});

export default Button;
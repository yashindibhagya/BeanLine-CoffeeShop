import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import offerWhite from "../../assets/images/offer_white.png";

const OfferScreen = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={offerWhite}
                style={styles.imageBackground}
                resizeMode="cover"
            >
                <View style={styles.card}>
                    <View style={styles.todayCover}>
                        <Text style={styles.today}>
                            Today Offer
                        </Text>
                    </View>

                    <Text style={styles.textOffer}>
                        Get Special Offers
                    </Text>

                    <Text style={styles.up}>
                        Up to <Text style={{ color: '#D2691E', fontSize: 26, fontWeight: 900 }}>20%</Text>
                    </Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Order Now</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </View>
    )
}

export default OfferScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 120, // or whatever height you want
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    imageBackground: {
        width: '100%',
        height: '130%',
        borderRadius: 16,
        overflow: 'hidden',
    },
    card: {
        paddingLeft: 20,
        paddingTop: 15,
        // gap: 10
    },
    today: {
        color: '#fff',
        //fontWeight: 'bold',
        fontSize: 14,
    },
    todayCover: {
        borderRadius: 50,
        backgroundColor: '#D2A285',
        width: 100,
        height: 25,
        alignItems: 'center',
        textAlign: 'auto',
        justifyContent: 'center',
    },
    textOffer: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 22,
        top: 5
    },
    up: {
        color: '#333',
        fontSize: 20,
        top: 5
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#D2691E',
        width: 90,
        height: 30,
        justifyContent: 'center',
        top: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff'

    },
});
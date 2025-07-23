import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';

// Import your Button component - adjust the path based on your file structure
import Button from '../components/Button/button'; // or wherever your button file is located

const { width, height } = Dimensions.get('window');

const CoffeeLandingScreen = () => {
    const router = useRouter();

    const handleGetStarted = () => {
        // Navigate to tabs/index.jsx
        router.push('/auth/signIn');
    };


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground
                source={require('../assets/images/1.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                {/* Dark overlay for contrast */}
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.81)', 'rgba(0, 0, 0, 0.73)']}
                    locations={[0, 0.09, 1]}
                    style={styles.gradientOverlay}
                >
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/images/beanline.png')}
                            style={styles.logoImage}
                        />
                    </View>

                    {/* Main content container */}
                    <View style={styles.topContainerWrapper}>
                        <Text style={styles.mainTitle}>
                            Fresh <Text style={styles.coffeeText}>Coffee</Text>{"\n"}Anywhere
                        </Text>
                    </View>

                    {/* Spacer to push button to bottom 
                    <View style={{ flex: 1 }} /> */}

                    {/* Buttons Container */}
                    <View style={styles.buttonsContainer}>
                        {/* Clear Button - Using your custom Button component */}
                        <Button
                            text="Get Started"
                            type="fill"
                            onPress={handleGetStarted}
                        />
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logoImage: {
        width: 230,
        height: 230,
        resizeMode: 'contain',
    },
    topContainerWrapper: {
        width: "100%",
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    mainTitle: {
        fontSize: 48,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        lineHeight: 56, // Fixed line height to prevent text clipping
        letterSpacing: 0.5,
        marginTop: 320
    },
    coffeeText: {
        color: "#934B1F",
    },
    buttonsContainer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 60,
        gap: 16,
    },
    getStartedButton: {
        backgroundColor: '#934B1F',
        paddingHorizontal: 40,
        paddingVertical: 16,
        borderRadius: 25,
        width: width - 80,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});

export default CoffeeLandingScreen;
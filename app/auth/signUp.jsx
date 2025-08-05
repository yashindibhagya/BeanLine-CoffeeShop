import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Button from '../../components/Button/button';
import { registerUser } from "../../services/authService";


export default function SignUp() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle sign up

    const handleSignUp = async () => {
        // Validate input
        if (!name.trim()) {
            Alert.alert("Error", "Please enter your name");
            return;
        }
        if (!email.trim()) {
            Alert.alert("Error", "Please enter your email");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            await registerUser(name, email, password);
            Alert.alert(
                "Account Created",
            );
        } catch (error) {
            console.error("Registration error:", error);

            // Handle specific error codes
            let errorMessage = "Failed to create account.";

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already in use. Please use a different email or sign in.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password is too weak. Please choose a stronger password.";
            }

            Alert.alert("Sign Up Failed", errorMessage);
        } finally {
            setLoading(false);
        }
    };



    /*const handleSignIn = async () => {
        router.push('/(tabs)/homeScreen');
    }*/

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <StatusBar barStyle="light-content" />
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Dark overlay for contrast */}
                        <LinearGradient
                            colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)']}
                            locations={[0, 0.09, 1]}
                            style={styles.gradientOverlay}
                        >
                            {/* Logo */}
                            <View style={styles.logoContainer}>
                                <Image
                                    source={require('../../assets/images/beanline.png')}
                                    style={styles.logoImage}
                                />
                            </View>

                            <View style={styles.welcomeContainer}>
                                <Text style={styles.welcomeText}>Welcome Back!</Text>
                                <Text style={styles.text}>Sign in to discover your favorite brews, order ahead, and earn rewards with every sip.</Text>
                            </View>

                            {/* Form Container */}
                            <View style={styles.formContainer}>

                                <TextInput
                                    placeholder="Full Name"
                                    style={styles.textInput}
                                    onChangeText={setName}
                                    value={name}
                                    placeholderTextColor="#999"
                                />

                                <TextInput
                                    placeholder="Email"
                                    style={styles.textInput}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={setEmail}
                                    value={email}
                                    placeholderTextColor="#999"
                                />

                                <TextInput
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    style={styles.textInput}
                                    onChangeText={setPassword}
                                    value={password}
                                    placeholderTextColor="#999"
                                />


                                <Button
                                    text="Login"
                                    type="fill"
                                    onPress={handleSignUp}
                                    style={styles.loginButton}
                                />

                                {/* Create Account Link */}
                                <View style={styles.buttonContainer}>
                                    <Text style={{ color: '#fff' }}>Don't have an account?</Text>
                                    <TouchableOpacity onPress={() => router.push("/auth/signUp")}>
                                        <Text style={styles.signUpLink}>Create New Account</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </LinearGradient>
                    </ScrollView>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        //backgroundColor: "#D0F3DA",
        //marginTop: 25
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
        minHeight: '100%',
    },
    gradientOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        minHeight: '100%',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logoImage: {
        width: 200,
        height: 210,
        resizeMode: 'contain',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 100,
        //paddingBottom: 50, // Add padding at bottom for better scrolling
    },
    textInput: {
        width: "90%",
        padding: 15,
        fontSize: 16,
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#fff",
        //backgroundColor: "rgba(255,255,255,0.9)",
        //borderRadius: 50,
        color: "#fff",
    },
    loginButton: {
        marginTop: 20,
        width: "90%",
    },
    welcomeContainer: {
        alignItems: 'center',
        gap: 10,
        top: 60
    },
    welcomeText: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        //marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    signUpLink: {
        color: "#D2691E",
        fontWeight: "bold",
        marginLeft: 5,
        fontSize: 15
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        width: '90%'
    },
    forgotPassword: {
        color: '#fff'
    }
});
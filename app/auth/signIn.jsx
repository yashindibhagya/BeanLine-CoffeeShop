import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Button from '../../components/Button/button';
import { resetPassword } from "../../services/authService";


export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle sign in
    /*
        const handleSignIn = async () => {
            // Validate input
            if (!email.trim()) {
                Alert.alert("Error", "Please enter your email");
                return;
            }
    
            if (!password) {
                Alert.alert("Error", "Please enter your password");
                return;
            }
    
            setLoading(true);
    
            try {
                // Uncomment and implement your authentication logic here
                await loginUser(email, password);
    
                // For now, simulate successful login and navigate
                console.log("Login attempt with:", email, password);
    
                // Navigate to tabs after successful login
                router.push('/(tabs)');
    
            } catch (error) {
                console.error("Login error:", error);
    
                // Handle specific error codes
                let errorMessage = "Failed to sign in. Please check your credentials and try again.";
    
                if (error.code === 'auth/invalid-email') {
                    errorMessage = "Invalid email address.";
                } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    errorMessage = "Incorrect email or password.";
                } else if (error.code === 'auth/too-many-requests') {
                    errorMessage = "Too many failed sign in attempts. Please try again later.";
                }
    
                Alert.alert("Sign In Failed", errorMessage);
            } finally {
                setLoading(false);
            }
        };
        */



    // Handle forgot password
    const handleForgotPassword = async () => {
        if (!email.trim()) {
            Alert.alert("Error", "Please enter your email to reset password");
            return;
        }

        try {
            await resetPassword(email.trim());
            Alert.alert(
                "Password Reset Email Sent",
                "Check your email for instructions to reset your password"
            );
        } catch (error) {
            console.error("Password reset error:", error);

            let errorMessage = "Failed to send password reset email.";
            if (error.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address.";
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = "No account found with this email.";
            }

            Alert.alert("Error", errorMessage);
        }
    };


    const handleSignIn = async () => {
        router.push('/(tabs)/homeScreen');
    }

    return (
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
                                placeholder="Email"
                                placeholderTextColor="#999"
                                style={styles.textInput}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={setEmail}
                                value={email}
                            />

                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#999"
                                secureTextEntry={true}
                                style={styles.textInput}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={setPassword}
                                value={password}
                            />

                            {/* Forgot Password */}
                            <TouchableOpacity
                                onPress={handleForgotPassword}
                                style={styles.forgotPasswordContainer}
                            >
                                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                            </TouchableOpacity>


                            <Button
                                text="Login"
                                type="fill"
                                onPress={handleSignIn}
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: 200,
        paddingBottom: 50, // Add padding at bottom for better scrolling
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
        top: 160
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
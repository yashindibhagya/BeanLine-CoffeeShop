import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
    Alert,
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
} from 'react-native'
import Button from '../../components/Button/button'

export default function SignUp() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!name.trim()) {
            Alert.alert("Error", "Please enter your name");
            return;
        }
        if (!email.trim()) {
            Alert.alert("Error", "Please enter your email");
            return;
        }
        if (!password) {
            Alert.alert("Error", "Please enter a password");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            await registerUser(email, password, name);

            Alert.alert("Account Created", "Your account has been successfully created!", [
                { text: "Sign In Now", onPress: () => router.push("/auth/signIn") }
            ]);
        } catch (error) {
            console.error("Registration error:", error);

            let errorMessage = "Failed to create account.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already in use.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password is too weak.";
            }

            Alert.alert("Sign Up Failed", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground
                    source={require('../../assets/images/background.jpg')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)']}
                        style={styles.gradientOverlay}
                    >
                        <StatusBar barStyle="light-content" />
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../../assets/images/beanline.png')}
                                style={styles.logoImage}
                            />
                        </View>

                        <View style={styles.welcomeContainer}>
                            <Text style={styles.welcomeText}>Create an Account</Text>
                            <Text style={styles.text}>
                                Sign up to discover your favorite brews, order ahead, and earn rewards with every sip.
                            </Text>
                        </View>

                        <TextInput
                            placeholder="Full Name"
                            placeholderTextColor="#999"
                            style={styles.textInput}
                            onChangeText={setName}
                            value={name}
                        />

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#999"
                            style={styles.textInput}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />

                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            style={styles.textInput}
                            onChangeText={setPassword}
                            value={password}
                        />

                        <Button
                            text="Create Account"
                            onPress={handleSignUp}
                            loading={loading}
                        />

                        <View style={styles.buttonContainer}>
                            <Text style={{ color: '#fff' }}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => router.push("/auth/signIn")}>
                                <Text style={styles.signInLink}>Sign In here</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </ScrollView>
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
    buttonContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    signInLink: {
        color: "#934B1F",
        fontWeight: "bold",
        marginLeft: 5,
        fontSize: 15
    },

    welcomeContainer: {
        alignItems: 'center',
        gap: 10,
        margintop: 100, // Increase this value to move the welcome text lower
    },
    welcomeText: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold',
    },
    text: {
        color: '#fff',
        textAlign: 'center'
    }
})
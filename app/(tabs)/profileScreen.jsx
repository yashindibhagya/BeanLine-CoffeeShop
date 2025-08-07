import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { ThemedButton, ThemedText, ThemedView } from '../../components/themed/ThemedComponents';
import { useTheme } from '../../hooks/useTheme';

const ProfileScreen = () => {
    const { theme, isDark, toggleTheme } = useTheme();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [locationEnabled, setLocationEnabled] = useState(true);
    const router = useRouter();

    // Mock user data
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        orders: 24,
        points: 1240,
    };

    const menuItems = [
        {
            icon: 'person-outline',
            title: 'Personal Information',
            onPress: () => console.log('Personal Info pressed')
        },
        {
            icon: 'shopping-bag',
            title: 'My Orders',
            onPress: () => console.log('Orders pressed')
        },
        {
            icon: 'favorite-border',
            title: 'Favorites',
            onPress: () => console.log('Favorites pressed')
        },
        {
            icon: 'location-on',
            title: 'Delivery Addresses',
            onPress: () => console.log('Addresses pressed')
        },
        {
            icon: 'credit-card',
            title: 'Payment Methods',
            onPress: () => console.log('Payment pressed')
        },
        {
            icon: 'notifications',
            title: 'Notifications',
            rightComponent: (
                <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: theme.gray400, true: theme.primary }}
                    thumbColor={notificationsEnabled ? '#fff' : theme.gray200}
                />
            )
        },
        {
            icon: 'gps-fixed',
            title: 'Location Services',
            rightComponent: (
                <Switch
                    value={locationEnabled}
                    onValueChange={setLocationEnabled}
                    trackColor={{ false: theme.gray400, true: theme.primary }}
                    thumbColor={locationEnabled ? '#fff' : theme.gray200}
                />
            )
        },
        {
            icon: 'help-outline',
            title: 'Help & Support',
            onPress: () => console.log('Help pressed')
        },
    ];

    const renderMenuItem = (item, index) => (
        <TouchableOpacity
            key={index}
            style={[styles.menuItem, { borderBottomColor: theme.border }]}
            onPress={item.onPress}
            activeOpacity={0.7}
        >
            <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: theme.surface }]}>
                    <MaterialIcons
                        name={item.icon}
                        size={20}
                        color={theme.primary}
                    />
                </View>
                <ThemedText style={styles.menuItemText}>{item.title}</ThemedText>
            </View>

            {item.rightComponent || (
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={theme.textTertiary}
                />
            )}
        </TouchableOpacity>
    );

    const dynamicStyles = StyleSheet.create({
        avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 3,
            borderColor: theme.primary,
        },
        editButton: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 36,
            height: 36,
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: theme.background,
        },
        statsContainer: {
            flexDirection: 'row',
            backgroundColor: theme.surface,
            borderRadius: 16,
            padding: 16,
            width: '100%',
            justifyContent: 'space-around',
            marginTop: 16,
        },
    });

    return (
        <ThemedView style={styles.container}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

            {/* Header with back button and title */}
            <View style={styles.header}>
                <ThemedText style={styles.headerTitle}>Profile</ThemedText>
                <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
                    <Feather name={isDark ? 'sun' : 'moon'} size={24} color={theme.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* User Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: user.avatar }}
                            style={dynamicStyles.avatar}
                            resizeMode="cover"
                        />
                        <TouchableOpacity style={[dynamicStyles.editButton, { backgroundColor: theme.primary }]}>
                            <Ionicons name="pencil" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <ThemedText style={styles.userName}>{user.name}</ThemedText>
                    <ThemedText style={[styles.userEmail, { color: theme.textTertiary }]}>{user.email}</ThemedText>

                    <View style={dynamicStyles.statsContainer}>
                        <View style={styles.statItem}>
                            <ThemedText style={styles.statValue}>{user.orders}</ThemedText>
                            <ThemedText style={[styles.statLabel, { color: theme.textTertiary }]}>Orders</ThemedText>
                        </View>
                        <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
                        <View style={styles.statItem}>
                            <ThemedText style={[styles.statValue, { color: theme.primary }]}>{user.points}</ThemedText>
                            <ThemedText style={[styles.statLabel, { color: theme.textTertiary }]}>Points</ThemedText>
                        </View>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={[styles.menuContainer, { backgroundColor: theme.surface }]}>
                    {menuItems.map((item, index) => renderMenuItem(item, index))}
                </View>

                {/* Sign Out Button */}
                <ThemedButton
                    title="Sign Out"
                    onPress={() => console.log('Sign Out')}
                    style={[styles.signOutButton, { backgroundColor: 'transparent' }]}
                    textStyle={{ color: theme.error }}
                    leftIcon={
                        <MaterialCommunityIcons
                            name="logout"
                            size={20}
                            color={theme.error}
                            style={styles.signOutIcon}
                        />
                    }
                />
            </ScrollView>
        </ThemedView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    themeToggle: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    scrollView: {
        flex: 1,
    },
    profileSection: {
        alignItems: 'center',
        padding: 20,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 8,
    },
    userEmail: {
        fontSize: 14,
        marginBottom: 16,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
    },
    statDivider: {
        width: 1,
        height: '100%',
    },
    menuContainer: {
        margin: 20,
        borderRadius: 16,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuItemText: {
        fontSize: 16,
    },
    signOutButton: {
        marginHorizontal: 20,
        marginBottom: 40,
        borderColor: 'transparent',
    },
    signOutIcon: {
        marginRight: 8,
    },
});
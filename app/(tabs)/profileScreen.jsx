import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// Coffee shop theme with black background and coffee-inspired orange
const theme = {
    background: '#000000',
    surface: '#111111',
    surfaceElevated: '#1A1A1A',
    surfaceHover: '#222222',
    primary: '#D2691E', // Coffee brown-orange
    primaryLight: '#FF8C42',
    primaryDark: '#8B4513',
    accent: '#FF7F00', // Bright coffee orange
    success: '#228B22',
    error: '#DC143C',
    warning: '#FFD700',
    text: '#FFFFFF',
    textSecondary: '#E5E5E5',
    textTertiary: '#CCCCCC',
    border: '#333333',
    cardBorder: '#2A2A2A',
    divider: '#1E1E1E',
    coffee: '#8B4513',
};

const ProfileScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [locationEnabled, setLocationEnabled] = useState(true);
    const [orderReminders, setOrderReminders] = useState(true);
    const router = useRouter();

    // Coffee shop customer data
    const user = {
        name: 'Sarah Chen',
        email: 'sarah.chen@email.com',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        memberLevel: 'Gold Bean',
        joinDate: 'Brewing since Jan 2023',
        loyaltyPoints: 847,
        nextRewardAt: 1000,
    };

    const coffeeStats = [
        { icon: '☕', title: 'Orders', count: '156', color: theme.primary, subtitle: 'Total orders' },
        { icon: '❤️', title: 'Favorites', count: '8', color: theme.error, subtitle: 'Saved drinks' },
    ];

    const menuSections = [
        {
            title: 'MY COFFEE',
            items: [
                {
                    icon: 'local-cafe',
                    title: 'My Favorites',
                    subtitle: '8 saved drinks & snacks',
                    color: theme.error,
                    onPress: () => console.log('Favorites pressed')
                },
                {
                    icon: 'history',
                    title: 'Order History',
                    subtitle: '156 previous orders',
                    color: theme.primary,
                    onPress: () => console.log('History pressed')
                },
            ]
        },
        {
            title: 'ACCOUNT & DELIVERY',
            items: [
                {
                    icon: 'person-outline',
                    title: 'Personal Information',
                    subtitle: 'Name, email, preferences',
                    color: theme.primary,
                    onPress: () => console.log('Personal Info pressed')
                },
                {
                    icon: 'location-on',
                    title: 'Delivery Addresses',
                    subtitle: 'Home, Office + 2 more',
                    color: theme.success,
                    onPress: () => console.log('Addresses pressed')
                },
                {
                    icon: 'credit-card',
                    title: 'Payment Methods',
                    subtitle: '2 cards, Apple Pay',
                    color: theme.warning,
                    onPress: () => console.log('Payment pressed')
                },
            ]
        },
        {
            title: 'PREFERENCES',
            items: [
                {
                    icon: 'notifications',
                    title: 'Order Updates',
                    subtitle: 'Ready, pickup reminders',
                    color: theme.primary,
                    rightComponent: (
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: '#444444', true: theme.primary }}
                            thumbColor={notificationsEnabled ? '#fff' : '#999999'}
                            ios_backgroundColor="#444444"
                        />
                    )
                },
                {
                    icon: 'alarm',
                    title: 'Daily Reminders',
                    subtitle: 'Morning coffee alerts',
                    color: theme.accent,
                    rightComponent: (
                        <Switch
                            value={orderReminders}
                            onValueChange={setOrderReminders}
                            trackColor={{ false: '#444444', true: theme.primary }}
                            thumbColor={orderReminders ? '#fff' : '#999999'}
                            ios_backgroundColor="#444444"
                        />
                    )
                },
                {
                    icon: 'gps-fixed',
                    title: 'Location Services',
                    subtitle: 'Find nearest stores',
                    color: theme.success,
                    rightComponent: (
                        <Switch
                            value={locationEnabled}
                            onValueChange={setLocationEnabled}
                            trackColor={{ false: '#444444', true: theme.primary }}
                            thumbColor={locationEnabled ? '#fff' : '#999999'}
                            ios_backgroundColor="#444444"
                        />
                    )
                },
            ]
        },
        {
            title: 'SUPPORT & MORE',
            items: [
                {
                    icon: 'help-outline',
                    title: 'Help & Support',
                    subtitle: 'FAQ, contact us',
                    color: theme.primary,
                    onPress: () => console.log('Help pressed')
                },
            ]
        }
    ];

    const CoffeeStatCard = ({ item }) => (
        <TouchableOpacity
            style={[styles.coffeeStatCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
            activeOpacity={0.8}
        >
            <View style={[styles.coffeeStatIcon, { backgroundColor: `${item.color}25` }]}>
                <Text style={styles.coffeeStatEmoji}>{item.icon}</Text>
            </View>
            <Text style={[styles.coffeeStatCount, { color: item.color }]}>{item.count}</Text>
            <Text style={[styles.coffeeStatTitle, { color: theme.textSecondary }]}>{item.title}</Text>
            <Text style={[styles.coffeeStatSubtitle, { color: theme.textTertiary }]}>{item.subtitle}</Text>
        </TouchableOpacity>
    );

    const MenuItem = ({ item, isLast = false }) => (
        <TouchableOpacity
            style={[
                styles.menuItem,
                { backgroundColor: theme.surface },
                !isLast && { borderBottomWidth: 1, borderBottomColor: theme.divider }
            ]}
            onPress={item.onPress}
            activeOpacity={0.7}
        >
            <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: `${item.color || theme.primary}20` }]}>
                    <MaterialIcons
                        name={item.icon}
                        size={22}
                        color={item.color || theme.primary}
                    />
                </View>
                <View style={styles.menuTextContainer}>
                    <Text style={[styles.menuTitle, { color: theme.text }]}>{item.title}</Text>
                    {item.subtitle && (
                        <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]}>{item.subtitle}</Text>
                    )}
                </View>
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

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={[styles.headerTitle, { color: theme.text }]}>My Profile</Text>
                        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>Brew-tiful day for coffee!</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.settingsButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons name="settings" size={22} color={theme.primary} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Header Card */}
                <View style={[styles.profileCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: user.avatar }}
                                style={[styles.avatar, { borderColor: theme.primary }]}
                                resizeMode="cover"
                            />
                            <TouchableOpacity
                                style={[styles.editBadge, { backgroundColor: theme.primary }]}
                                activeOpacity={0.8}
                            >
                                <Ionicons name="pencil" size={14} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.profileInfo}>
                            <View style={styles.nameContainer}>
                                <Text style={[styles.userName, { color: theme.text }]}>{user.name}</Text>
                                <View style={[styles.memberBadge, { backgroundColor: `${theme.accent}25` }]}>
                                    <MaterialIcons name="local-cafe" size={14} color={theme.accent} />
                                    <Text style={[styles.memberText, { color: theme.accent }]}>{user.memberLevel}</Text>
                                </View>
                            </View>
                            <Text style={[styles.userEmail, { color: theme.textSecondary }]}>{user.email}</Text>
                            <Text style={[styles.joinDate, { color: theme.textTertiary }]}>{user.joinDate}</Text>

                        </View>
                    </View>

                    {/* Coffee Stats */}
                    <View style={styles.coffeeStats}>
                        {coffeeStats.map((item, index) => (
                            <CoffeeStatCard key={index} item={item} />
                        ))}
                    </View>
                </View>

                {/* Menu Sections */}
                {menuSections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.menuSection}>
                        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{section.title}</Text>
                        <View style={[styles.menuContainer, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
                            {section.items.map((item, itemIndex) => (
                                <MenuItem
                                    key={itemIndex}
                                    item={item}
                                    isLast={itemIndex === section.items.length - 1}
                                />
                            ))}
                        </View>
                    </View>
                ))}

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    {/* Quick Order Button */}
                    <TouchableOpacity
                        style={[styles.quickOrderButton, { backgroundColor: theme.primary }]}
                        activeOpacity={0.8}
                    >
                        <MaterialIcons name="local-cafe" size={20} color="#fff" />
                        <Text style={[styles.quickOrderText, { color: '#fff' }]}>Order My Usual</Text>
                    </TouchableOpacity>

                    {/* Sign Out Button */}
                    <TouchableOpacity
                        style={[styles.signOutButton, { backgroundColor: theme.surface, borderColor: theme.error }]}
                        onPress={() => router.replace('/auth/signIn')}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons
                            name="logout"
                            size={20}
                            color={theme.error}
                            style={styles.signOutIcon}
                        />
                        <Text style={[styles.signOutText, { color: theme.error }]}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

                {/* Bottom spacing for navigation */}
                <View style={styles.bottomSpacing} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 16,
        paddingHorizontal: 20,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 14,
        marginTop: 2,
    },
    settingsButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    scrollView: {
        flex: 1,
    },
    profileCard: {
        marginHorizontal: 16,
        marginBottom: 20,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 16,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    profileInfo: {
        flex: 1,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        flexWrap: 'wrap',
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        marginRight: 8,
    },
    memberBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    memberText: {
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 4,
    },
    userEmail: {
        fontSize: 14,
        marginBottom: 2,
    },
    joinDate: {
        fontSize: 12,
        marginBottom: 8,
    },
    loyaltyContainer: {
        marginTop: 8,
    },
    loyaltyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    loyaltyText: {
        fontSize: 14,
        fontWeight: '600',
    },
    loyaltyPoints: {
        fontSize: 14,
        fontWeight: '700',
    },
    progressBar: {
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    coffeeStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    coffeeStatCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderRadius: 12,
        marginHorizontal: 2,
        borderWidth: 1,
    },
    coffeeStatIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    coffeeStatEmoji: {
        fontSize: 16,
    },
    coffeeStatCount: {
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 1,
    },
    coffeeStatTitle: {
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 1,
    },
    coffeeStatSubtitle: {
        fontSize: 8,
        textAlign: 'center',
    },
    menuSection: {
        marginBottom: 18,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        marginLeft: 20,
        marginBottom: 8,
    },
    menuContainer: {
        marginHorizontal: 16,
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 1,
    },
    menuSubtitle: {
        fontSize: 13,
    },
    actionButtons: {
        marginHorizontal: 16,
        marginBottom: 16,
        gap: 10,
    },
    quickOrderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    quickOrderText: {
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 8,
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 1,
    },
    signOutIcon: {
        marginRight: 6,
    },
    signOutText: {
        fontSize: 15,
        fontWeight: '600',
    },
    bottomSpacing: {
        height: 80,
    },
});

export default ProfileScreen;
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// Modern theme colors
const theme = {
    background: '#0A0A0B',
    surface: '#1C1C1E',
    surfaceElevated: '#2C2C2E',
    primary: '#6366F1',
    primaryLight: '#818CF8',
    accent: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    text: '#FFFFFF',
    textSecondary: '#A1A1AA',
    textTertiary: '#71717A',
    border: '#27272A',
    cardBorder: '#374151',
};

const ProfileScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [locationEnabled, setLocationEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const router = useRouter();

    // Mock user data
    const user = {
        name: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        level: 'Gold Member',
    };

    const menuSections = [
        {
            title: 'ACCOUNT',
            items: [
                {
                    icon: 'person-outline',
                    title: 'Personal Information',
                    subtitle: 'Manage your profile',
                    color: theme.primary,
                    onPress: () => console.log('Personal Info pressed')
                },
                {
                    icon: 'security',
                    title: 'Privacy & Security',
                    subtitle: 'Control your data',
                    color: theme.success,
                    onPress: () => console.log('Security pressed')
                },
                {
                    icon: 'palette',
                    title: 'Appearance',
                    subtitle: 'Theme preferences',
                    color: theme.accent,
                    rightComponent: (
                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            trackColor={{ false: '#374151', true: theme.primary }}
                            thumbColor={darkMode ? '#fff' : '#9CA3AF'}
                        />
                    )
                },
            ]
        },
        {
            title: 'SERVICES',
            items: [
                {
                    icon: 'favorite-border',
                    title: 'Favorites',
                    subtitle: 'Your saved items',
                    color: theme.error,
                    onPress: () => console.log('Favorites pressed')
                },
                {
                    icon: 'location-on',
                    title: 'Delivery Addresses',
                    subtitle: '3 saved locations',
                    color: theme.success,
                    onPress: () => console.log('Addresses pressed')
                },
                {
                    icon: 'credit-card',
                    title: 'Payment Methods',
                    subtitle: 'Cards & wallets',
                    color: theme.accent,
                    onPress: () => console.log('Payment pressed')
                },
            ]
        },
        {
            title: 'PREFERENCES',
            items: [
                {
                    icon: 'notifications',
                    title: 'Notifications',
                    subtitle: 'Push & email alerts',
                    rightComponent: (
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: '#374151', true: theme.primary }}
                            thumbColor={notificationsEnabled ? '#fff' : '#9CA3AF'}
                        />
                    )
                },
                {
                    icon: 'gps-fixed',
                    title: 'Location Services',
                    subtitle: 'GPS & location tracking',
                    rightComponent: (
                        <Switch
                            value={locationEnabled}
                            onValueChange={setLocationEnabled}
                            trackColor={{ false: '#374151', true: theme.primary }}
                            thumbColor={locationEnabled ? '#fff' : '#9CA3AF'}
                        />
                    )
                },
                {
                    icon: 'language',
                    title: 'Language',
                    subtitle: 'English (US)',
                    color: theme.primary,
                    onPress: () => console.log('Language pressed')
                },
            ]
        },
        {
            title: 'SUPPORT',
            items: [
                {
                    icon: 'help-outline',
                    title: 'Help & Support',
                    subtitle: '24/7 customer service',
                    color: theme.success,
                    onPress: () => console.log('Help pressed')
                },
                {
                    icon: 'description',
                    title: 'Terms & Conditions',
                    subtitle: 'Legal information',
                    color: theme.textTertiary,
                    onPress: () => console.log('Terms pressed')
                },
                {
                    icon: 'shield',
                    title: 'Privacy Policy',
                    subtitle: 'Data protection',
                    color: theme.textTertiary,
                    onPress: () => console.log('Privacy pressed')
                },
            ]
        }
    ];

    const QuickActionCard = ({ item }) => (
        <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: theme.surface }]} activeOpacity={0.7}>
            <View style={[styles.quickActionIcon, { backgroundColor: `${item.color}20` }]}>
                <Text style={styles.quickActionEmoji}>{item.icon}</Text>
            </View>
            <Text style={[styles.quickActionCount, { color: item.color }]}>{item.count}</Text>
            <Text style={[styles.quickActionTitle, { color: theme.textSecondary }]}>{item.title}</Text>
        </TouchableOpacity>
    );

    const MenuItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.surface }]}
            onPress={item.onPress}
            activeOpacity={0.7}
        >
            <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: `${item.color || theme.primary}15` }]}>
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
                    <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
                    <TouchableOpacity style={[styles.settingsButton, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                        <MaterialIcons name="settings" size={22} color={theme.text} />
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
                            <TouchableOpacity style={[styles.editBadge, { backgroundColor: theme.accent }]}>
                                <Ionicons name="pencil" size={14} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.profileInfo}>
                            <View style={styles.nameContainer}>
                                <Text style={[styles.userName, { color: theme.text }]}>{user.name}</Text>
                                <View style={[styles.levelBadge, { backgroundColor: `${theme.accent}20` }]}>
                                    <Text style={[styles.levelText, { color: theme.accent }]}>{user.level}</Text>
                                </View>
                            </View>
                            <Text style={[styles.userEmail, { color: theme.textSecondary }]}>{user.email}</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Sections */}
                {menuSections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.menuSection}>
                        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{section.title}</Text>
                        <View style={styles.menuContainer}>
                            {section.items.map((item, itemIndex) => (
                                <MenuItem key={itemIndex} item={item} />
                            ))}
                        </View>
                    </View>
                ))}

                {/* Sign Out Button */}
                <TouchableOpacity
                    style={[styles.signOutButton, { backgroundColor: theme.surface }]}
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
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 24,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    settingsButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    profileCard: {
        marginHorizontal: 24,
        marginBottom: 24,
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInfo: {
        flex: 1,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        marginRight: 12,
    },
    levelBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    levelText: {
        fontSize: 12,
        fontWeight: '600',
    },
    userEmail: {
        fontSize: 16,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    quickActionCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 16,
        marginHorizontal: 4,
    },
    quickActionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    quickActionEmoji: {
        fontSize: 24,
    },
    quickActionCount: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 2,
    },
    quickActionTitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    menuSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1,
        marginLeft: 24,
        marginBottom: 12,
    },
    menuContainer: {
        marginHorizontal: 24,
        borderRadius: 16,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginBottom: 2,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 14,
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 16,
        marginBottom: 20,
    },
    signOutIcon: {
        marginRight: 8,
    },
    signOutText: {
        fontSize: 16,
        fontWeight: '600',
    },
    bottomSpacing: {
        height: 100,
    },
});

export default ProfileScreen;
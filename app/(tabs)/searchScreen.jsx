import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { categories } from '@/assets/Data/categories';
import { getItemsByCategory, searchItems } from '@/assets/Data/items/items';
import ItemCard from '@/components/ItemCard/SearchItemCard';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = 85;

export default function ModernSidebarCategories() {
    const [selectedCategory, setSelectedCategory] = useState('1');
    const [searchQuery, setSearchQuery] = useState('');
    const [animatedValue] = useState(new Animated.Value(0));
    const router = useRouter();

    const handleItemPress = (item) => {
        const type = (item.type || item.category || '').toLowerCase();
        const coffeeCategories = ['1', '2', '3'];
        const itemCategoryId = item.categoryId || item.category;

        if (coffeeCategories.includes(String(itemCategoryId))) {
            router.push({
                pathname: '/details/CoffeeDetails',
                params: { coffee: item.id }
            });
        } else {
            router.push({
                pathname: '/details/FoodDetails',
                params: { food: item.id }
            });
        }
    };

    const handleCategorySelect = (id) => {
        setSelectedCategory(id);
        setSearchQuery('');

        // Trigger animation
        Animated.spring(animatedValue, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
        }).start(() => {
            animatedValue.setValue(0);
        });
    };

    const items = searchQuery
        ? searchItems(searchQuery, selectedCategory)
        : getItemsByCategory(selectedCategory);

    const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory);

    const renderCategoryItem = ({ item, index }) => {
        const isActive = selectedCategory === item.id;
        const scale = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, isActive ? 1.1 : 1],
        });

        const rotate = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', isActive ? '360deg' : '0deg'],
        });

        return (
            <Animated.View style={{ transform: [{ scale }] }}>
                <TouchableOpacity
                    onPress={() => handleCategorySelect(item.id)}
                    style={[
                        styles.categoryButton,
                        isActive && styles.activeCategoryButton,
                    ]}
                    activeOpacity={0.7}
                >
                    {isActive && <View style={styles.activeBackground} />}

                    <Animated.View style={[styles.iconContainer, { transform: [{ rotate }] }]}>
                        <MaterialIcons
                            name={item.icon}
                            size={26}
                            color={isActive ? '#D2691E' : '#FFFFFF'}
                            style={styles.categoryIconStyle}
                        />
                    </Animated.View>

                    <Animated.Text
                        style={[
                            styles.categoryText,
                            isActive && styles.activeCategoryText,
                            { transform: [{ rotate }] },
                        ]}
                        numberOfLines={2}
                    >
                        {item.title}
                    </Animated.Text>

                    {isActive && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />

            <View style={styles.container}>
                {/* Modern Sidebar with Brown Theme */}
                <View style={styles.sidebar}>
                    <View style={styles.sidebarContent}>
                        {/* Sidebar Header */}
                        <View style={styles.sidebarHeader}>
                            <View style={styles.logoContainer}>
                                <View style={styles.logoCircle}>
                                    <MaterialIcons name="restaurant-menu" size={20} color="#FFFFFF" />
                                </View>
                            </View>
                        </View>

                        {/* Categories List */}
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id}
                            renderItem={renderCategoryItem}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.categoriesList}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />

                        {/* Sidebar Footer */}
                        <View style={styles.sidebarFooter}>
                            <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
                                <MaterialIcons name="settings" size={22} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Main Content */}
                <View style={styles.content}>
                    {/* Header Section */}
                    <View style={styles.contentHeader}>
                        <View style={styles.headerInfo}>
                            <Text style={styles.categoryTitle}>
                                {selectedCategoryData?.title || 'All Items'}
                            </Text>
                            <Text style={styles.itemCount}>
                                {items.length} items available
                            </Text>
                        </View>

                        <View style={styles.categoryIconBadge}>
                            <View style={styles.categoryIconBadgeCircle}>
                                <MaterialIcons
                                    name={selectedCategoryData?.icon || 'restaurant'}
                                    size={20}
                                    color="#FFFFFF"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Modern Search Bar */}
                    <View style={styles.searchContainer}>
                        <View style={styles.searchInputWrapper}>
                            <MaterialIcons
                                name="search"
                                size={20}
                                color="#94A3B8"
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search for delicious items..."
                                placeholderTextColor="#94A3B8"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity
                                    onPress={() => setSearchQuery('')}
                                    style={styles.clearButton}
                                >
                                    <MaterialIcons name="close" size={18} color="#94A3B8" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Items Grid */}
                    <FlatList
                        data={items}
                        numColumns={1}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.itemsList}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <Animated.View
                                style={[
                                    styles.cardContainer,
                                    {
                                        opacity: animatedValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 0.95],
                                        }),
                                    },
                                ]}
                            >
                                <ItemCard
                                    item={item}
                                    onPress={() => handleItemPress(item)}
                                    onAddPress={() => console.log('Add to cart:', item.name)}
                                    style={styles.itemCard}
                                />
                            </Animated.View>
                        )}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyState}>
                                <MaterialIcons name="search-off" size={48} color="#CBD5E1" />
                                <Text style={styles.emptyTitle}>No items found</Text>
                                <Text style={styles.emptySubtitle}>
                                    Try adjusting your search or browse different categories
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000',
        marginTop: 36
    },

    // Sidebar Styles - Updated to Brown Theme
    sidebar: {
        width: SIDEBAR_WIDTH,
        backgroundColor: '#D2691E', // Brown background like second code
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
        zIndex: 10,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    sidebarContent: {
        flex: 1,
        paddingVertical: 20,
    },
    sidebarHeader: {
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 15,
    },
    logoContainer: {
        marginBottom: 10,
    },
    logoCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#B8621E', // Darker brown for contrast
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },

    // Category Styles - Updated for Brown Theme
    categoriesList: {
        paddingHorizontal: 12,
        flexGrow: 1,
    },
    categoryButton: {
        height: 70,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 6,
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    activeCategoryButton: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
        borderColor: '#FFFFFF',
    },
    activeBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
    },
    iconContainer: {
        marginBottom: 4,
    },
    categoryIconStyle: {
        marginBottom: 2,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 12,
        letterSpacing: 0.3,
    },
    activeCategoryText: {
        color: '#D2691E',
        fontWeight: '600',
    },
    activeIndicator: {
        position: 'absolute',
        right: -1,
        top: '50%',
        width: 3,
        height: 20,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        transform: [{ translateY: -10 }],
    },
    separator: {
        height: 8,
    },

    // Sidebar Footer
    sidebarFooter: {
        alignItems: 'center',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.2)',
        marginTop: 20,
        marginHorizontal: 12,
    },
    settingsButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Content Styles
    content: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerInfo: {
        flex: 1,
    },
    categoryTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    itemCount: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },
    categoryIconBadge: {
        marginLeft: 16,
    },
    categoryIconBadgeCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#D2691E', // Brown theme
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#D2691E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },

    // Search Styles
    searchContainer: {
        marginBottom: 24,
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1E293B',
        paddingVertical: 12,
        fontWeight: '500',
    },
    clearButton: {
        padding: 4,
        marginLeft: 8,
    },

    // Items List Styles
    itemsList: {
        paddingBottom: 100,
    },
    cardContainer: {
        marginBottom: 16,
    },
    itemCard: {
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },

    // Empty State
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#475569',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#94A3B8',
        textAlign: 'center',
        lineHeight: 20,
    },
});
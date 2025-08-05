import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { categories } from '@/assets/Data/categories';
import { getItemsByCategory, searchItems } from '@/assets/Data/items/items';
//import ItemCard from '@/components/ItemCard/ItemCard';
import ItemCard from '@/components/ItemCard/SearchItemCard'; // Updated import for SearchItemCard
import { useRouter } from 'expo-router'; // <-- Add this import

const { width } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 130; // default safe value

export default function SidebarCategories() {
    const [selectedCategory, setSelectedCategory] = useState('1');
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter(); // <-- Add this

    // Navigation handler similar to HomeScreen
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
    };

    const items = searchQuery
        ? searchItems(searchQuery, selectedCategory)
        : getItemsByCategory(selectedCategory);

    const title = categories.find((cat) => cat.id === selectedCategory)?.title;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View style={styles.container}>

                {/* Sidebar */}
                <View style={styles.sidebar}>
                    <ScrollView
                        contentContainerStyle={[
                            styles.sidebarIcons,
                            { paddingTop: STATUS_BAR_HEIGHT, paddingBottom: 80 }, // reserve for navbar
                        ]}
                        showsVerticalScrollIndicator={false}
                    >
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => handleCategorySelect(cat.id)}
                                style={[
                                    styles.categoryIcon,
                                    selectedCategory === cat.id && styles.activeCategoryIcon,
                                ]}
                            >
                                <View style={styles.iconWrapper}>
                                    <MaterialIcons
                                        name={cat.icon}
                                        size={24}
                                        style={styles.icon}
                                        color={selectedCategory === cat.id ? '#D2691E' : '#fff'}
                                    />
                                    <Text
                                        style={[
                                            styles.iconText,
                                            selectedCategory === cat.id && styles.activeIconText,
                                        ]}
                                    >
                                        {cat.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                </View>

                {/* Content */}
                <View style={styles.content}>

                    {/* Search Input (always visible) */}
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search items..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

                    {/* Grid */}
                    <FlatList
                        data={items}
                        numColumns={1}
                        keyExtractor={(item) => item.id}
                        key={'single-column'}
                        //columnWrapperStyle={styles.grid}
                        contentContainerStyle={styles.itemsList}
                        renderItem={({ item }) => (
                            <View style={styles.cardContainer}>
                                <ItemCard
                                    item={item}
                                    onPress={() => handleItemPress(item)}
                                    onAddPress={() => console.log('Add to cart:', item.name)}
                                    style={styles.card}
                                />
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
        backgroundColor: "#D0F3DA",
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000',
        paddingTop: STATUS_BAR_HEIGHT,
    },
    sidebar: {
        width: 70,
        backgroundColor: '#D2691E', // Brown background
        alignItems: 'center',
        paddingVertical: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    sidebarIcons: {
        alignItems: 'center',

    },
    categoryIcon: {
        width: 50,
        height: 100,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#D2691E',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        paddingVertical: 8,

    },
    activeCategoryIcon: {
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 14,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerEmojiCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#22C55E',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    headerEmoji: {
        color: '#fff',
        fontSize: 14,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    itemsList: {
        paddingBottom: 100,
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
    },
    categoryIconStyle: {
        transform: [{ rotate: '-90deg' }],
    },
    iconText: {
        marginTop: 6,
        fontSize: 10,
        color: '#fff',
        transform: [{ rotate: '-90deg' }],
        textAlign: 'center',
        width: 60,
    },
    activeIconText: {
        color: '#D2691E',
    },
});
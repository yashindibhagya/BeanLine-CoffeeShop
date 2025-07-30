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
import ItemCard from '@/components/ItemCard/ItemCard';


const { width } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 130; // default safe value

export default function SidebarCategories() {
    const [selectedCategory, setSelectedCategory] = useState('1');
    const [searchQuery, setSearchQuery] = useState('');

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
            <StatusBar backgroundColor="#D0F3DA" barStyle="dark-content" />
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
                                        color={selectedCategory === cat.id ? '#8A4B23' : '#fff'}
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
                                    onPress={() => console.log('Pressed:', item.name)}
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
        backgroundColor: '#8A4B23', // Brown background
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
        backgroundColor: '#8A4B23',
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
    grid: {
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    cardContainer: {
        width: (width - 10 - 38) / 2 - 9, // Available width minus sidebar, padding, and gap
        maxWidth: 100, // Maximum width to prevent cards from being too wide
    },
    card: {

    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    emoji: {
        fontSize: 28, // Reduced from 32
    },
    statusDotOuter: {
        width: 20, // Reduced from 24
        height: 20,
        borderRadius: 10,
        backgroundColor: '#D1FAE5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusDotInner: {
        width: 6, // Reduced from 8
        height: 6,
        borderRadius: 3,
        backgroundColor: '#22C55E',
    },
    cardTitle: {
        fontWeight: '600',
        fontSize: 14, // Reduced from 16
        color: '#1F2937',
        marginBottom: 3,
    },
    cardDesc: {
        fontSize: 11, // Reduced from 12
        color: '#6B7280',
        marginBottom: 6,
        lineHeight: 14,
    },
    tags: {
        flexDirection: 'row',
        gap: 4,
        marginBottom: 6,
    },
    tag: {
        fontSize: 9, // Reduced from 10
        color: '#9CA3AF',
        marginRight: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 14, // Reduced from 16
        fontWeight: 'bold',
        color: '#111827',
    },
    addButton: {
        width: 28, // Reduced from 32
        height: 28,
        borderRadius: 14,
        backgroundColor: '#22C55E',
        alignItems: 'center',
        justifyContent: 'center',
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
        color: '#8A4B23',
    },
});
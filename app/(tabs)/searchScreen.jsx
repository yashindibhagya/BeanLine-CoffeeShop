import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
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
                <View style={styles.header}>
                    <View style={styles.headerTitle}>
                        <View style={styles.headerEmojiCircle}>
                            <Text style={styles.headerEmoji}>
                                {items[0]?.image || '🍽️'}
                            </Text>
                        </View>
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                    <MaterialIcons name="filter-list" size={24} color="#888" />
                </View>

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
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
                    contentContainerStyle={styles.itemsList}
                    renderItem={({ item }) => (
                        <ItemCard
                            item={item}
                            onPress={() => console.log('Pressed:', item.name)}
                            onAddPress={() => console.log('Add to cart:', item.name)}
                        />
                    )}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F9FAFB',
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
        padding: 16,
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
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        width: (width - 70 - 48) / 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    emoji: {
        fontSize: 32,
    },
    statusDotOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#D1FAE5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusDotInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#22C55E',
    },
    cardTitle: {
        fontWeight: '600',
        fontSize: 16,
        color: '#1F2937',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 8,
    },
    tags: {
        flexDirection: 'row',
        gap: 6,
        marginBottom: 8,
    },
    tag: {
        fontSize: 10,
        color: '#9CA3AF',
        marginRight: 10,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
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

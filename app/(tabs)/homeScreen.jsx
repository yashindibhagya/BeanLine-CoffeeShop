import { categories } from '@/assets/Data/categories';
import { getItemsByCategory, searchItems } from '@/assets/Data/items/items'; // Import items data
import Header from '@/components/Home/Header';
import ItemCard from '@/components/ItemCard/ItemCard'; // Import the new ItemCard component
import OfferScreen from '@/components/Offers/offer';
import { useNavigation, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
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
import Icon from 'react-native-vector-icons/MaterialIcons';

//const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('1'); // Changed to integer
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery(''); // Clear search when changing category
  }

  // Add this debugging version of handleItemPress to your HomeScreen

  const handleItemPress = (item) => {
    // console.log('=== HANDLE ITEM PRESS DEBUG ===');
    // console.log('Clicked item:', item);
    // console.log('Item ID:', item.id, 'Type:', typeof item.id);
    // console.log('Selected Category:', selectedCategory);
    // console.log('Item type:', item.type);
    // console.log('Item category:', item.category);
    // console.log('Item categoryId:', item.categoryId);
    // console.log('Item name:', item.name);
    // console.log('================================');

    // Get the category ID from the item or use the selected category
    const itemCategoryId = item.categoryId || item.category || selectedCategory;
    const coffeeCategories = ['1', '2', '3'];

    if (coffeeCategories.includes(String(itemCategoryId))) {
      console.log('Navigating to CoffeeDetails with ID:', item.id);
      router.push({
        pathname: '/details/CoffeeDetails',
        params: { coffee: item.id }
      });
    } else {
      console.log('Navigating to FoodDetails with ID:', item.id);
      router.push({
        pathname: '/details/FoodDetails',
        params: { food: item.id }
      });
    }
  };

  // Handle add button press
  const handleAddPress = (item) => {
    console.log('Add item:', item);
    // Add your add to cart logic here
  };

  // Get items for selected category
  const selectedCategoryItems = useMemo(() => {
    if (searchQuery.trim()) {
      return searchItems(searchQuery, selectedCategory);
    }
    return getItemsByCategory(selectedCategory);
  }, [selectedCategory, searchQuery]);

  const renderCategoryItem = ({ item }) => {
    const isSelected = selectedCategory === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          isSelected && styles.selectedCategoryItem
        ]}
        onPress={() => handleCategoryPress(item.id)}
      >
        <View style={styles.categoryVew}>
          <View style={[
            styles.categoryIcon,
            isSelected && styles.selectedCategoryIcon
          ]}>
            <Icon
              name={item.icon}
              size={24}
              color={isSelected ? '#fff' : '#fff'}
            />
          </View>
          <Text style={[
            styles.categoryText,
            isSelected && styles.selectedCategoryText
          ]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderItemCard = ({ item }) => {
    return (
      <ItemCard
        item={item}
        onPress={handleItemPress}
        onAddPress={handleAddPress}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, { paddingBottom: 60 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Image + Header container */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/Intersect.png')}
            style={styles.image}
          />
          <View style={styles.headerOverlay}>
            <Header />
          </View>

          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor="#fff"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Rest of the content */}
        <View style={styles.offers}>
          <Text style={styles.special}>Special Offers</Text>
          <TouchableOpacity>
            <Text style={styles.offerText}>View All</Text>
          </TouchableOpacity>
        </View>

        <OfferScreen />

        <View style={styles.category}>
          <Text style={styles.special}>
            Categories
          </Text>
        </View>

        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()} // Convert to string for keyExtractor
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          style={styles.categoriesList}
        />

        {/* Items Section */}
        <View style={styles.itemsSection}>
          <View style={styles.itemsHeader}>
            <Text style={styles.itemsSectionTitle}>
              {categories.find(cat => cat.id === selectedCategory)?.title}
            </Text>
          </View>

          {selectedCategoryItems.length > 0 ? (
            <FlatList
              data={selectedCategoryItems}
              renderItem={renderItemCard}
              keyExtractor={(item) => item.id.toString()} // Convert to string for keyExtractor
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.itemsContainer}
              columnWrapperStyle={styles.itemsRow}
              scrollEnabled={false} // Since it's inside ScrollView
            />
          ) : (
            <View style={styles.noItemsContainer}>
              <Text style={styles.noItemsText}>
                No items available in this category
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    //paddingLeft: 24,
    //paddingRight: 24,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    //marginBottom: 20, // Space below the image
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.5,
    //marginTop: 8
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 20, // adjust as needed to position nicely
  },
  special: {
    fontWeight: '500',
    color: '#fff',
    paddingTop: 30,
    fontSize: 22
  },
  offerText: {
    color: '#fff',
    fontSize: 14
  },
  offers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: -30,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#934B1F', // black background inside
    //borderColor: '#fff',     // white border
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 12,
    //height: 40,
    marginVertical: 20,
    width: '92%',
    marginTop: -70
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff', // text color
    fontSize: 16,
  },
  category: {
    paddingLeft: 24
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 15,
  },
  categoriesList: {
    //marginBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    paddingRight: 48, // Extra padding at the end
  },
  categoryItem: {
    marginTop: 14,
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.21)',
    height: 40,
    justifyContent: 'center'
  },
  selectedCategoryItem: {
    backgroundColor: '#934B1F',
  },
  categoryVew: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 10,
    justifyContent: 'center'
  },
  categoryIcon: {
    width: 40,
    height: 40,
    //borderRadius: 20,
    //backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryIcon: {
    //backgroundColor: 'rgba(147, 75, 31, 0.2)',
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  categoryContentText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  // Items section styles
  itemsSection: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemsSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemsContainer: {
    paddingBottom: 20,
  },
  itemsRow: {
    justifyContent: 'space-between',
  },
  noItemsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noItemsText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
});
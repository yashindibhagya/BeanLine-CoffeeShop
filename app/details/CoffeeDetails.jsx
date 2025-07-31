import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const cupSizes = ['Small', 'Medium', 'Large'];
const sugarLevels = ['No Sugar', 'Less Sugar', 'Normal', 'Extra Sugar'];

import { useCart } from '@/app/context/CartContext';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { getAllItemsFlat } from '@/assets/Data/items/items';
import { useEffect } from 'react';

export default function CoffeeDetails() {
  const { coffee } = useLocalSearchParams();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(cupSizes[1]);
  const [selectedSugar, setSelectedSugar] = useState(sugarLevels[2]);
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    console.log('=== DEBUG INFO ===');
    console.log('Received coffee param:', coffee);
    console.log('Coffee param type:', typeof coffee);

    // Get all items for debugging
    const allItems = getAllItemsFlat();
    console.log('Total items found:', allItems.length);
    console.log('First few items:', allItems.slice(0, 3).map(item => ({ id: item.id, name: item.name, type: typeof item.id })));

    // Try different approaches to find the item
    let foundItem = null;

    // Approach 1: Direct comparison (string)
    foundItem = allItems.find(i => i.id === coffee);
    console.log('Found with string comparison:', foundItem ? foundItem.name : 'Not found');

    if (!foundItem) {
      // Approach 2: Parse as integer
      const coffeeId = parseInt(coffee, 10);
      console.log('Parsed coffee ID:', coffeeId);
      foundItem = allItems.find(i => i.id === coffeeId);
      console.log('Found with integer comparison:', foundItem ? foundItem.name : 'Not found');
    }

    if (!foundItem) {
      // Approach 3: Convert both to strings
      foundItem = allItems.find(i => String(i.id) === String(coffee));
      console.log('Found with string conversion:', foundItem ? foundItem.name : 'Not found');
    }

    if (!foundItem) {
      // Approach 4: Convert both to numbers
      const coffeeNum = Number(coffee);
      foundItem = allItems.find(i => Number(i.id) === coffeeNum);
      console.log('Found with number conversion:', foundItem ? foundItem.name : 'Not found');
    }

    console.log('Final found item:', foundItem);
    console.log('==================');

    setItem(foundItem);
    setLoading(false);
  }, [coffee]);

  const handleAddToCart = () => {
    if (!item) return;
    addToCart({
      ...item,
      selectedSize,
      selectedSugar,
      quantity,
    });
    router.push('/cartScreen'); // Navigate to cart
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Item not found</Text>
        <Text style={styles.errorSubText}>
          Looking for item with ID: {coffee} (type: {typeof coffee})
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>

      {/* Cup Size Section */}
      <View style={styles.optionSection}>
        <Text style={styles.sectionTitle}>Select Cup Size</Text>
        <View style={styles.optionsRow}>
          {cupSizes.map(size => (
            <TouchableOpacity
              key={size}
              style={[
                styles.optionButton,
                selectedSize === size && styles.selectedOption
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={[
                styles.optionText,
                selectedSize === size && styles.selectedOptionText
              ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sugar Level Section */}
      <View style={styles.optionSection}>
        <Text style={styles.sectionTitle}>Select Sugar Level</Text>
        <View style={styles.optionsRow}>
          {sugarLevels.map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.optionButton,
                selectedSugar === level && styles.selectedOption
              ]}
              onPress={() => setSelectedSugar(level)}
            >
              <Text style={[
                styles.optionText,
                selectedSugar === level && styles.selectedOptionText
              ]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quantity Section */}
      <View style={styles.quantitySection}>
        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 18,
    marginBottom: 10,
  },
  errorSubText: {
    color: '#AAAAAA',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  price: {
    fontSize: 24,
    color: '#F9A826',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  optionSection: {
    width: '100%',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 25,
    backgroundColor: '#1E1E1E',
    minWidth: 80,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#F9A826',
    borderColor: '#F9A826',
    shadowColor: '#F9A826',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  optionText: {
    color: '#AAAAAA',
    fontWeight: '600',
    fontSize: 14,
  },
  selectedOptionText: {
    color: '#121212',
    fontWeight: 'bold',
  },
  quantitySection: {
    width: '100%',
    marginBottom: 30,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F9A826',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  quantityButtonText: {
    color: '#121212',
    fontSize: 22,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    minWidth: 30,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#F9A826',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#F9A826',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  addButtonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 15,
    marginTop: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

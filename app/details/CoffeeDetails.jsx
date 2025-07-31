import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const cupSizes = ['Small', 'Medium', 'Large'];
const sugarLevels = ['No Sugar', 'Less Sugar', 'Normal', 'Extra Sugar'];

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

  useEffect(() => {
    // coffee param may be an object or just an id string
    let coffeeId = coffee;
    if (typeof coffee === 'string') {
      try {
        const parsed = JSON.parse(coffee);
        coffeeId = parsed.id || coffee;
      } catch {
        coffeeId = coffee;
      }
    } else if (coffee && coffee.id) {
      coffeeId = coffee.id;
    }
    // Search for the item in allItems
    const found = getAllItemsFlat().find(i => i.id === coffeeId);
    setItem(found);
  }, [coffee]);

  const handleAddToCart = () => {
    // Add to cart logic here
    router.back();
  };

  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (item === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Item not found.</Text>
      </View>
    );
  }
  if (item === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>

      <Text style={styles.sectionTitle}>Select Cup Size</Text>
      <View style={styles.optionsRow}>
        {cupSizes.map(size => (
          <TouchableOpacity
            key={size}
            style={[styles.optionButton, selectedSize === size && styles.selectedOption]}
            onPress={() => setSelectedSize(size)}
          >
            <Text style={styles.optionText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Select Sugar Level</Text>
      <View style={styles.optionsRow}>
        {sugarLevels.map(level => (
          <TouchableOpacity
            key={level}
            style={[styles.optionButton, selectedSugar === level && styles.selectedOption]}
            onPress={() => setSelectedSugar(level)}
          >
            <Text style={styles.optionText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.quantityRow}>
        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 22,
    color: '#b98068',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#b98068',
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  selectedOption: {
    backgroundColor: '#b98068',
  },
  optionText: {
    color: '#333',
    fontWeight: 'bold',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#b98068',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6f4e37',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

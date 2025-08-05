import { LinearGradient } from 'expo-linear-gradient'; // Add this import
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import MiniItemCard from '@/components/ItemCard/MiniItemCard';

const { width, height } = Dimensions.get('window'); // Fixed: Added height

// Import navigation and cart context like in the first code
import { getAllItemsFlat } from '@/assets/Data/items/items';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCart } from '../context/CartContext';

const FoodDetails = () => {
  const { food } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  useEffect(() => {
    // console.log('=== DEBUG INFO ===');
    // console.log('Received food param:', food);
    // console.log('Food param type:', typeof food);

    // Get all items for debugging
    const allItems = getAllItemsFlat();
    //  console.log('Total items found:', allItems.length);
    // console.log('First few items:', allItems.slice(0, 3).map(item => ({ id: item.id, name: item.name, type: typeof item.id })));

    // Try different approaches to find the item
    let foundItem = null;

    // Approach 1: Direct comparison (string)
    foundItem = allItems.find(i => i.id === food);
    console.log('Found with string comparison:', foundItem ? foundItem.name : 'Not found');

    if (!foundItem) {
      // Approach 2: Parse as integer
      const foodId = parseInt(food, 10);
      console.log('Parsed food ID:', foodId); // Fixed: Changed coffeeId to foodId
      foundItem = allItems.find(i => i.id === foodId);
      console.log('Found with integer comparison:', foundItem ? foundItem.name : 'Not found');
    }

    if (!foundItem) {
      // Approach 3: Convert both to strings
      foundItem = allItems.find(i => String(i.id) === String(food));
      // console.log('Found with string conversion:', foundItem ? foundItem.name : 'Not found');
    }

    if (!foundItem) {
      // Approach 4: Convert both to numbers
      const foodNum = Number(food);
      foundItem = allItems.find(i => Number(i.id) === foodNum);
      console.log('Found with number conversion:', foundItem ? foundItem.name : 'Not found');
    }

    setItem(foundItem);
    setLoading(false);
  }, [food]);

  // Add to cart function
  const handleAddToCart = () => {
    if (!item) return;
    addToCart({
      ...item,
      quantity,
    });
    router.push('/cartScreen'); // Navigate to cart
  };

  // Loading and error states
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Item not found</Text>
        <Text style={styles.errorSubText}>
          Looking for item with ID: {food} (type: {typeof food}) {/* Fixed: Changed coffee to food */}
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
    <View style={styles.container}>
      {/* SECTION 1: Fixed Upper Image Part */}
      <View style={styles.selectorSection}>
        <View style={styles.decorativeBackground}>
          <Image
            source={require('@/assets/images/background.jpg')} // Replace with your image path
            style={styles.backgroundImage}
          />
          <View style={styles.brownOverlay} />
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 38,
            left: 20,
            zIndex: 10,

            padding: 8,
          }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back-circle-sharp" size={34} color="white" />
        </TouchableOpacity>

        {/* Upper Black Area Image */}
        <View style={styles.upperImageArea}>
          {item && item.image && (
            <Image
              source={item.image}
              style={styles.upperImage}
              resizeMode="cover"
            />
          )}
        </View>
      </View>

      {/* SECTION 2: Scrollable Middle Description Section with Gradient */}
      <LinearGradient
        colors={['#000', '#000']} // Dark gradient
        style={styles.detailsSection}
      >
        <ScrollView
          style={styles.scrollableContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          {/* Product Title and Rating */}
          <View style={styles.headerRow}>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>★ {item.rating}</Text>
              </View>
              <Text style={styles.productTitle}>{item.name}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.priceText}>$ {item.price}</Text>
            </View>
          </View>


          {/* About Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>About</Text>
            <Text style={styles.aboutText}>
              {item.description}
            </Text>
          </View>

          {/* Volume and Quantity */}
          <View style={styles.volumeQuantityRow}>
            <View style={styles.quantitySection}>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Related Items Section */}
          {item && item.category && (
            <View style={{ marginTop: 24 }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
                Other items in this category
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {getAllItemsFlat()
                  .filter(i => i.category === item.category && i.id !== item.id)
                  .map(related => (
                    <MiniItemCard
                      key={related.id}
                      item={related}
                      onPress={() => {
                        router.push({ pathname: '/details/FoodDetails', params: { food: related.id } });

                      }}
                    />
                  ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>
      </LinearGradient>

      {/* SECTION 3: Fixed Bottom Button with Gradient */}
      <LinearGradient
        colors={['#000', '#000']} // Same gradient as description section
        style={styles.fixedButtonContainer}
      >
        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <Text style={styles.buyButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 18,
    marginBottom: 10,
  },
  errorSubText: {
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
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

  // SECTION 1: Fixed Upper Image Part
  selectorSection: {
    height: height * 0.42, // Fixed height for upper section
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Dark background
    position: 'relative',
    overflow: 'hidden', // Hide parts of circle that go outside
  },

  // Background image with overlay
  decorativeBackground: {
    position: 'absolute',
    width: '100%',
    height: 200,
    top: -10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden', // Ensures image respects border radius
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  brownOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#8B4513',
    opacity: 0.7, // Adjust opacity to control brown tint intensity
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  upperImageArea: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure image is above background
  },
  upperImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  cupContainer: {
    width: 10,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure cup is above background
  },
  sizeLabel: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D3D3D3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 15, // Above everything including cup
  },
  selectedLabel: {
    borderColor: '#8B4513',
    backgroundColor: '#8B4513',
  },
  sizeLabelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  selectedLabelText: {
    color: '#FFFFFF',
  },

  // SECTION 2: Scrollable Middle Description Section with Gradient
  detailsSection: {
    flex: 1, // Takes remaining space between upper and button
    top: -40
  },
  scrollableContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 24,
    paddingTop: 4, // Reduced since we now have padding on the container
    paddingBottom: 20, // Extra padding at bottom for better scroll experience
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for dark gradient
    flex: 1,
  },
  ratingContainer: {
    alignItems: 'flex-start',
  },
  ratingBadge: {
    backgroundColor: '#D2691E',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    marginBottom: 4,
  },
  ratingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for dark gradient
  },
  aboutSection: {
    marginBottom: 24,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for dark gradient
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#CCCCCC', // Light gray text for dark gradient
    lineHeight: 20,
    marginBottom: 8,
  },
  sugarSection: {
    marginBottom: 24,
  },
  sugarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for dark gradient
    marginBottom: 12,
  },
  sugarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  sugarButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#555555', // Darker border for dark theme
    borderRadius: 15,
    backgroundColor: '#333333', // Dark background for buttons
    alignItems: 'center',
  },
  selectedSugar: {
    backgroundColor: '#D2691E',
    borderColor: '#D2691E',
  },
  sugarText: {
    color: '#CCCCCC', // Light text for dark theme
    fontSize: 12,
    fontWeight: '600',
  },
  selectedSugarText: {
    color: '#FFFFFF',
  },
  volumeQuantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  volumeSection: {
    flex: 1,
  },
  volumeLabel: {
    fontSize: 14,
    color: '#CCCCCC', // Light gray text for dark gradient
    marginBottom: 4,
  },
  volumeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for dark gradient
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#555555', // Darker background for dark theme
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for dark theme
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for dark theme
    minWidth: 20,
    textAlign: 'center',
  },

  // SECTION 3: Fixed Bottom Button with Gradient
  fixedButtonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 24, // Extra padding for safe area
    borderTopWidth: 1,
    borderTopColor: '#333333', // Darker border to match gradient theme
  },
  buyButton: {
    backgroundColor: '#D2691E',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#D2691E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FoodDetails;
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Import navigation and cart context like in the first code
import { getAllItemsFlat } from '@/assets/Data/items/items';
import MiniItemCard from '@/components/ItemCard/MiniItemCard';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCart } from '../context/CartContext';

const CoffeeCupSelector = () => {
  const { coffee } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('M');
  const [isRotating, setIsRotating] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const rotationValue = useRef(new Animated.Value(0)).current;
  const currentRotation = useRef(0);
  const startAngle = useRef(0);

  // Size options with their angles (in degrees) and volumes
  const sizes = [
    { label: 'S', angle: 125, position: { x: -80, y: 60 }, volume: '120ml', name: 'Small' },
    { label: 'M', angle: 95, position: { x: 0, y: 80 }, volume: '160ml', name: 'Medium' },
    { label: 'L', angle: 65, position: { x: 80, y: 60 }, volume: '200ml', name: 'Large' },
  ];

  // Sugar levels from the first code
  const sugarLevels = ['No Sugar', 'Less Sugar', 'Normal', 'Extra Sugar'];
  const [selectedSugar, setSelectedSugar] = useState(sugarLevels[2]);

  // Item loading logic from the first code
  useEffect(() => {
    // console.log('=== DEBUG INFO ===');
    // console.log('Received coffee param:', coffee);
    // console.log('Coffee param type:', typeof coffee);

    // Get all items for debugging
    const allItems = getAllItemsFlat();
    //  console.log('Total items found:', allItems.length);
    // console.log('First few items:', allItems.slice(0, 3).map(item => ({ id: item.id, name: item.name, type: typeof item.id })));

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


    setItem(foundItem);
    setLoading(false);
  }, [coffee]);

  // Initialize rotation to M position
  useEffect(() => {
    rotationValue.setValue(95); // Set to M position initially
    currentRotation.current = 95;
    setSelectedSize('M');
  }, []);

  // Calculate angle from center point
  const calculateAngle = (x, y, centerX, centerY) => {
    const deltaX = x - centerX;
    const deltaY = y - centerY;

    if (isNaN(deltaX) || isNaN(deltaY)) return 0;

    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    return angle;
  };

  // Normalize angle to -180 to 180 range
  const normalizeAngle = (angle) => {
    while (angle > 180) angle -= 360;
    while (angle < -180) angle += 360;
    return angle;
  };

  // Find closest size based on rotation
  const getClosestSize = (rotation) => {
    const normalizedRotation = normalizeAngle(rotation);

    let closestSize = sizes[1]; // Default to M
    let minDiff = Math.abs(normalizedRotation - sizes[1].angle);

    sizes.forEach(size => {
      const diff = Math.abs(normalizedRotation - size.angle);
      if (diff < minDiff) {
        minDiff = diff;
        closestSize = size;
      }
    });

    return closestSize;
  };

  // Update selected size based on current rotation
  const updateSelectedSize = (rotation) => {
    const closestSize = getClosestSize(rotation);
    setSelectedSize(closestSize.label);
  };

  // Calculate the shortest rotation path
  const getShortestRotation = (from, to) => {
    let diff = to - from;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    return from + diff;
  };

  // NEW: Handle size label tap
  const handleSizeLabelPress = (size) => {
    // Prevent interaction if already rotating
    if (isRotating) return;

    setIsRotating(true);
    setSelectedSize(size.label);

    // Calculate the shortest path to the target angle
    const targetAngle = getShortestRotation(currentRotation.current, size.angle);

    // Update current rotation reference to the final target
    currentRotation.current = size.angle;

    // Animate directly to the calculated shortest path
    Animated.timing(rotationValue, {
      toValue: targetAngle,
      duration: 600, // Smooth duration
      useNativeDriver: true,
    }).start(() => {
      // Ensure the final value is set correctly
      rotationValue.setValue(size.angle);
      currentRotation.current = size.angle;
      setIsRotating(false);
    });
  };

  // Add to cart function like in the first code
  const handleAddToCart = () => {
    if (!item) return;

    const currentSize = getCurrentSize();
    addToCart({
      ...item,
      selectedSize: currentSize.name, // Convert to full name like first code
      selectedSugar,
      quantity,
    });
    router.push('/cartScreen'); // Navigate to cart
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => !isRotating,
    onMoveShouldSetPanResponderCapture: () => !isRotating,
    onPanResponderGrant: (evt) => {
      if (isRotating) return;

      setIsRotating(true);
      const centerX = width / 2;
      const centerY = height / 2 - 100;
      const touchX = evt.nativeEvent.pageX;
      const touchY = evt.nativeEvent.pageY;

      startAngle.current = calculateAngle(touchX, touchY, centerX, centerY);
    },
    onPanResponderMove: (evt, gestureState) => {
      if (!isRotating) return;

      const centerX = width / 2;
      const centerY = height / 2 - 100;
      const touchX = evt.nativeEvent.pageX;
      const touchY = evt.nativeEvent.pageY;

      if (isNaN(touchX) || isNaN(touchY)) return;

      const currentAngle = calculateAngle(touchX, touchY, centerX, centerY);
      let angleDiff = currentAngle - startAngle.current;

      // Handle angle wrapping
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;

      const newRotation = currentRotation.current + angleDiff;

      // Smooth the rotation update with slight damping
      Animated.timing(rotationValue, {
        toValue: newRotation,
        duration: 50, // Very short duration for real-time feel but with smoothing
        useNativeDriver: true,
      }).start();

      // Update selected size in real-time
      updateSelectedSize(newRotation);

      // Update start angle for next move
      startAngle.current = currentAngle;
      currentRotation.current = newRotation;
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (!isRotating) return;

      // Find the target size to snap to
      const targetSize = getClosestSize(currentRotation.current);
      const targetAngle = getShortestRotation(currentRotation.current, targetSize.angle);

      // Update current rotation reference
      currentRotation.current = targetSize.angle;

      // Smooth snap animation with better parameters
      Animated.timing(rotationValue, {
        toValue: targetSize.angle,
        duration: 400, // Smooth timing animation
        useNativeDriver: true,
      }).start(() => {
        // Ensure final state is correct
        setSelectedSize(targetSize.label);
        currentRotation.current = targetSize.angle;
        setIsRotating(false);
      });
    },
  });

  const rotation = rotationValue.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
    extrapolate: 'extend',
  });

  // Get current size details
  const getCurrentSize = () => {
    return sizes.find(size => size.label === selectedSize) || sizes[1];
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  // Loading and error states like in the first code
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

        {/* Size labels - NOW TOUCHABLE */}
        {sizes.map((size) => (
          <TouchableOpacity
            key={size.label}
            style={[
              styles.sizeLabel,
              {
                left: width / 2 + size.position.x - 15,
                top: height / 2 - 170 + size.position.y - 15,
                transform: [
                  {
                    scale: selectedSize === size.label ? 1.1 : 1.0
                  }
                ]
              },
              selectedSize === size.label && styles.selectedLabel,
            ]}
            onPress={() => handleSizeLabelPress(size)}
            disabled={isRotating} // Disable when rotating
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.sizeLabelText,
                selectedSize === size.label && styles.selectedLabelText,
              ]}
            >
              {size.label}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Rotatable coffee cup */}
        <Animated.View
          style={[
            styles.cupContainer,
            {
              transform: [{ rotate: rotation }],
              opacity: isRotating ? 0.9 : 1.0, // Slight transparency when rotating
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Animated.Image
            source={item.imageTop}
            style={{
              width: 250,
              height: 250,
              resizeMode: 'contain',
              bottom: 20,
              alignSelf: 'center',
            }}
          />
        </Animated.View>
      </View>

      {/* SECTION 2: Scrollable Middle Description Section with Gradient */}
      <LinearGradient
        colors={['#000000', '#000000']} // Dark gradient
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
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>$ {item.price}</Text>
          </View>

          {/* About Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>About</Text>
            <Text style={styles.aboutText}>
              {item.description}
            </Text>
          </View>

          {/* Sugar Level Section */}
          <View style={styles.sugarSection}>
            <Text style={styles.sugarTitle}>Sugar Level</Text>
            <View style={styles.sugarRow}>
              {sugarLevels.map(level => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.sugarButton,
                    selectedSugar === level && styles.selectedSugar
                  ]}
                  onPress={() => setSelectedSugar(level)}
                >
                  <Text style={[
                    styles.sugarText,
                    selectedSugar === level && styles.selectedSugarText
                  ]}>
                    {level.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Volume and Quantity */}
          <View style={styles.volumeQuantityRow}>
            <View style={styles.volumeSection}>
              <Text style={styles.volumeLabel}>Volume</Text>
              <Text style={styles.volumeValue}>{getCurrentSize().volume}</Text>
            </View>

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
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', top: -40 }}>
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
                        router.push({ pathname: '/details/CoffeeDetails', params: { coffee: related.id } });

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
        colors={['#000000', '#000000']} // Same gradient as description section
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 5
  },
  scrollableContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
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
  priceContainer: {
    alignItems: 'flex-end',
    top: -60,
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
    top: -40
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
    top: -40
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
    top: -40
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

export default CoffeeCupSelector;
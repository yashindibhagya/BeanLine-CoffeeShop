import CappuccinoImage from '@/assets/images/Untitled-1.png';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Import navigation and cart context like in the first code
import { getAllItemsFlat } from '@/assets/Data/items/items';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCart } from '../context/CartContext';

const CoffeeCupSelector = () => {
  const { coffee } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('M');
  const [isRotating, setIsRotating] = useState(false);
  const [quantity, setQuantity] = useState(2);
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

  // Initialize rotation to M position
  useEffect(() => {
    rotationValue.setValue(0);
    currentRotation.current = 0;
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

      // Update the animated value
      rotationValue.setValue(newRotation);

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

      // Animate to the target position
      Animated.spring(rotationValue, {
        toValue: targetSize.angle,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start(() => {
        // Ensure final state is correct
        setSelectedSize(targetSize.label);
        currentRotation.current = targetSize.angle;
        setIsRotating(false); // Lock rotation after setting size
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
      {/* Coffee Cup Selector Section */}
      <View style={styles.selectorSection}>
        {/* Background circle */}
        <View style={styles.backgroundCircle} />

        {/* Size labels */}
        {sizes.map((size) => (
          <Animated.View
            key={size.label}
            style={[
              styles.sizeLabel,
              {
                left: width / 2 + size.position.x - 15,
                top: height / 2 - 100 + size.position.y - 15,
                transform: [
                  {
                    scale: selectedSize === size.label ? 1.1 : 1.0
                  }
                ]
              },
              selectedSize === size.label && styles.selectedLabel,
            ]}
          >
            <Text
              style={[
                styles.sizeLabelText,
                selectedSize === size.label && styles.selectedLabelText,
              ]}
            >
              {size.label}
            </Text>
          </Animated.View>
        ))}

        {/* Rotatable coffee cup */}
        <Animated.View
          style={[
            styles.cupContainer,
            {
              transform: [{ rotate: rotation }],
              opacity: isRotating ? 0.8 : 1.0, // Visual feedback when rotating
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Animated.Image
            source={CappuccinoImage}
            style={{ width: 250, height: 250, resizeMode: 'contain', left: 10, bottom: 20 }}
          />
        </Animated.View>
      </View>

      {/* Product Details Section */}
      <View style={styles.detailsSection}>
        {/* Product Title and Rating */}
        <View style={styles.headerRow}>
          <Text style={styles.productTitle}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ 4.5</Text>
            </View>
            <Text style={styles.priceText}>$ {item.price}</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About</Text>
          <Text style={styles.aboutText}>
            {item.description}
          </Text>
          <TouchableOpacity>
            <Text style={styles.readMoreText}>Read more</Text>
          </TouchableOpacity>
        </View>

        {/* Sugar Level Section - Added from first code */}
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

        {/* Add to Cart Button - Changed from "Buy now" to match first code */}
        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <Text style={styles.buyButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
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
  selectorSection: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 380,
    height: 380,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: '#D3D3D3',
    borderStyle: 'dashed',
  },
  cupContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
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
  detailsSection: {
    flex: 0.4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
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
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    alignItems: 'flex-end',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  aboutSection: {
    marginBottom: 16,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  readMoreText: {
    fontSize: 14,
    color: '#D2691E',
    fontWeight: '600',
  },
  sugarSection: {
    marginBottom: 16,
  },
  sugarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sugarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sugarButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 15,
    backgroundColor: '#F9F9F9',
  },
  selectedSugar: {
    backgroundColor: '#D2691E',
    borderColor: '#D2691E',
  },
  sugarText: {
    color: '#666',
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
    marginBottom: 24,
  },
  volumeSection: {
    flex: 1,
  },
  volumeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  volumeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 20,
    textAlign: 'center',
  },
  buyButton: {
    backgroundColor: '#D2691E',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CoffeeCupSelector;
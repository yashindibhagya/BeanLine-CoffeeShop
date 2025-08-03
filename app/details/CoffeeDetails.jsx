import CappuccinoImage from '@/assets/images/Untitled-1.png';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const CoffeeCupSelector = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const rotationValue = useRef(new Animated.Value(0)).current;
  const currentRotation = useRef(0);
  const startAngle = useRef(0);

  // Size options with their angles (in degrees)
  const sizes = [
    { label: 'S', angle: -60, position: { x: -80, y: 60 } },
    { label: 'M', angle: 0, position: { x: 0, y: 80 } },
    { label: 'L', angle: 60, position: { x: 80, y: 60 } },
  ];

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

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: (evt) => {
      const centerX = width / 2;
      const centerY = height / 2 - 50;
      const touchX = evt.nativeEvent.pageX;
      const touchY = evt.nativeEvent.pageY;

      startAngle.current = calculateAngle(touchX, touchY, centerX, centerY);
    },
    onPanResponderMove: (evt, gestureState) => {
      const centerX = width / 2;
      const centerY = height / 2 - 50;
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
      });
    },
  });

  const rotation = rotationValue.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
    extrapolate: 'extend',
  });

  return (
    <View style={styles.container}>
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
              top: height / 2 + size.position.y - 15,
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
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Animated.Image
          source={CappuccinoImage}
          style={{ width: 300, height: 300, resizeMode: 'contain' }}
        />
      </Animated.View>

      {/* Selected size display */}
      <View style={styles.selectedSizeContainer}>
        <Text style={styles.selectedSizeText}>Size: {selectedSize}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
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
  centerDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B4513',
  },
  selectedSizeContainer: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedSizeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
});

export default CoffeeCupSelector;
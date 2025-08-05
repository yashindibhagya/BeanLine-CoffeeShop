import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../../app/context/CartContext';

const { width } = Dimensions.get('window');

const ItemCard = ({ item, onPress, onFavoritePress }) => {
    const { addToCart } = useCart();
    const [showPopup, setShowPopup] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    const handleAddToCart = () => {
        addToCart({ ...item, quantity: 1 });

        // Show popup animation
        setShowPopup(true);
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(1500),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            setShowPopup(false);
        });
    };

    return (
        <TouchableOpacity style={styles.itemCard} onPress={() => onPress?.(item)}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.itemImage} />

                {/* Price overlay with blur effect */}
                <View style={styles.priceOverlay}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                        {item.originalPrice && (
                            <Text style={styles.originalPrice}>/${item.originalPrice.toFixed(2)}</Text>
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.itemInfo}>
                <View style={styles.titleRow}>
                    <Text style={styles.itemName}>{item.name}</Text>
                </View>
                <Text style={styles.itemLocation}>{item.description}</Text>

                <View style={styles.itemFooter}>
                    <View style={styles.ratingContainer}>
                        <Icon name="star" size={16} color="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddToCart}
                    >
                        <Icon name="add" size={20} color="#FFD700" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Popup notification */}
            {showPopup && (
                <Animated.View
                    style={[
                        styles.popupContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{
                                translateY: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [20, 0]
                                })
                            }]
                        }
                    ]}
                >
                    <View style={styles.popup}>
                        <Icon name="check-circle" size={20} color="#4CAF50" />
                        <Text style={styles.popupText}>Added to cart!</Text>
                    </View>
                </Animated.View>
            )}
        </TouchableOpacity>
    );
};

export default ItemCard;

const styles = StyleSheet.create({
    itemCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        width: '100%',
        marginBottom: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 160,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
    priceOverlay: {
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        width: '100%',
    },
    priceContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.73)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    itemPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    originalPrice: {
        fontSize: 12,
        color: '#ccc',
        textDecorationLine: 'line-through',
        marginLeft: 2,
    },
    itemInfo: {
        top: 8,
        marginBottom: 10
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    categoryIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
    },
    itemLocation: {
        fontSize: 12,
        color: '#888',
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#21211F',
        width: 60,
        height: 25,
        justifyContent: 'center',
    },
    ratingText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFD700',
        marginLeft: 4,
    },
    addButton: {
        backgroundColor: '#21211F',
        borderRadius: 20,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    popupContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -75 }, { translateY: -15 }],
        zIndex: 1000,
    },
    popup: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4CAF50',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    popupText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
});
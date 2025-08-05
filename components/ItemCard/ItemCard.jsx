import React, { useEffect, useState } from 'react';
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
    const { addToCart, removeFromCart, cart } = useCart();
    const [showPopup, setShowPopup] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [localQuantity, setLocalQuantity] = useState(0);

    // Get current quantity from cart
    useEffect(() => {
        if (cart && Array.isArray(cart)) {
            const cartItem = cart.find(cartItem => cartItem.id === item.id);
            setLocalQuantity(cartItem ? cartItem.quantity : 0);
        } else {
            setLocalQuantity(0);
        }
    }, [cart, item.id]);

    const showPopupAnimation = (message) => {
        setShowPopup(message);
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

    const handleAddToCart = () => {
        addToCart({ ...item, quantity: 1 });
        showPopupAnimation('Added to cart!');
    };

    const handleRemoveFromCart = () => {
        if (localQuantity > 0) {
            removeFromCart(item.id);
            showPopupAnimation('Removed from cart!');
        }
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

                    {/* Quantity Controls */}
                    <View style={styles.quantityContainer}>
                        {localQuantity > 0 && (
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={handleRemoveFromCart}
                            >
                                <Icon name="remove" size={16} color="#FFD700" />
                            </TouchableOpacity>
                        )}

                        {localQuantity > 0 && (
                            <View style={styles.quantityDisplay}>
                                <Text style={styles.quantityText}>{localQuantity}</Text>
                            </View>
                        )}

                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={handleAddToCart}
                        >
                            <Icon name="add" size={16} color="#FFD700" />
                        </TouchableOpacity>
                    </View>
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
                        <Icon
                            name={showPopup === 'Added to cart!' ? "check-circle" : "remove-circle"}
                            size={18}
                            color={showPopup === 'Added to cart!' ? "#4CAF50" : "#FF5722"}
                        />
                        <Text style={styles.popupText}>{showPopup}</Text>
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
        width: (width - 60) / 2,
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
        fontSize: 16,
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
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#21211F',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.3)',
    },
    quantityButton: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
    },
    quantityDisplay: {
        minWidth: 24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    quantityText: {
        color: '#FFD700',
        fontSize: 14,
        fontWeight: 'bold',
    },
    popupContainer: {
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: [{ translateX: -60 }, { translateY: -12 }],
        zIndex: 1000,
    },
    popup: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
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
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
});
import { BlurView } from '@react-native-community/blur';
import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';



const { width } = Dimensions.get('window');

const ItemCard = ({ item, onPress, onAddPress, onFavoritePress }) => {
    return (
        <TouchableOpacity style={styles.itemCard} onPress={() => onPress?.(item)}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.itemImage} />

                {/* Price overlay with blur effect */}
                <View style={styles.priceOverlay}>
                    <BlurView
                        style={styles.blurBackground}
                        blurType="dark" // or "light", "extraDark", etc.
                        blurAmount={10}
                        reducedTransparencyFallbackColor="black"
                    >
                        <View style={styles.priceContainer}>
                            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                            {item.originalPrice && (
                                <Text style={styles.originalPrice}>/${item.originalPrice.toFixed(2)}</Text>
                            )}
                        </View>
                    </BlurView>
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
                        onPress={() => onAddPress?.(item)}
                    >
                        <Icon name="add" size={20} color="#FFD700" />
                    </TouchableOpacity>
                </View>
            </View>
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
        //left: 12,
        // borderRadius: 8,
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
        // padding: 16,
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
        // marginRight: 8,
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
        //  marginBottom: 12,
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
        //borderColor: '#934B1F',
    },
    blurBackground: {
        width: '100%',
    },

});
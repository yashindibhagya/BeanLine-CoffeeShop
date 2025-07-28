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

const ItemCard = ({ item, onPress, onAddPress }) => {
    return (
        <TouchableOpacity style={styles.itemCard} onPress={() => onPress?.(item)}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                </Text>
                <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => onAddPress?.(item)}
                    >
                        <Icon name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ItemCard;

const styles = StyleSheet.create({
    itemCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        width: (width - 60) / 2, // Accounting for padding and gap
        marginBottom: 16,
        overflow: 'hidden',
    },
    itemImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    itemInfo: {
        padding: 12,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    itemDescription: {
        fontSize: 12,
        color: '#ccc',
        marginBottom: 8,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#934B1F',
    },
    addButton: {
        backgroundColor: '#934B1F',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
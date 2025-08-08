import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState, useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCart } from '../../app/context/CartContext';

const LocationDropdown = () => {
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const { cartItems } = useCart();
    
    // Calculate total items in cart
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleSetLocation = () => {
        closeMenu();
        router.push('/Map/MapScreen'); // Navigate to Map screen (must create app/map.jsx)
    };

    return (
        <Provider>
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://www.freepik.com/free-photo/confident-handsome-guy-posing-against-white-wall_11103978.htm#fromView=search&page=1&position=27&uuid=dfb99dca-17fe-4f79-ba69-1852aeffc5ab&query=person ' }}
                    style={styles.image}
                >
                </Image>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <TouchableOpacity onPress={openMenu}>
                            <View style={styles.button}>
                                <Text style={styles.text}>19687 Sun Cir</Text>
                                <Icon name="arrow-drop-down" size={22} color="white" />
                            </View>
                        </TouchableOpacity>
                    }
                >
                    <Menu.Item onPress={handleSetLocation} title="Set location on map" />
                </Menu>


                <TouchableOpacity 
                    style={styles.cartIconContainer}
                    onPress={() => router.push('/cartScreen')}
                >
                    <MaterialIcons name="delivery-dining" size={30} color="white" />
                    {totalItems > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                                {totalItems > 9 ? '9+' : totalItems}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        paddingTop: 40
    },
    cartIconContainer: {
        position: 'relative',
        marginLeft: 10,
    },
    badge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 4,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 30, // Makes it circular
        borderWidth: 2,
        borderColor: '#fff', // Optional: white border
    },
});

export default LocationDropdown;

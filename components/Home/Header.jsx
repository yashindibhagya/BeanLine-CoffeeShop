import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LocationDropdown = () => {
    const [visible, setVisible] = useState(false);
    const router = useRouter();

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


                <MaterialIcons name="delivery-dining" size={30} color="white" />

            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        //padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40
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

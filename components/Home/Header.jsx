import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 4,
    },
});

export default LocationDropdown;

import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart, getTotal, increaseQuantity, decreaseQuantity } = useCart();
  const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 130; // default safe value

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Your Cart</Text>

        <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item, index }) => (
              <LinearGradient
                colors={['#484848', '#171717']}
                //start={{ x: 0, y: 0 }}
                //end={{ x: 1, y: 0 }}
                style={styles.itemCard}
              >
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardSubtitle}>{item.description}</Text>
                  <View style={styles.cardBottom}>
                    <View style={styles.cardLeft}>
                      <View style={styles.sizeBox}>
                        <Text style={styles.sizeText}>{item.meta || 'M'}</Text>
                      </View>
                      <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity style={styles.quantityBtn} onPress={() => decreaseQuantity(index)}>
                        <Text style={styles.quantityBtnText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityDisplay}>{item.quantity}</Text>
                      <TouchableOpacity style={styles.quantityBtn} onPress={() => increaseQuantity(index)}>
                        <Text style={styles.quantityBtnText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            )}
          />
          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalAmount}>${getTotal().toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.payNowBtn}
              disabled={cartItems.length === 0}
              onPress={() => {/* TODO: handle payment */ }}
            >
              <Text style={styles.payNowBtnText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sizeBox: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  sizeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityBtn: {
    backgroundColor: '#D2691E',
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  quantityDisplay: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 24,
    paddingTop: 60, // Ensures content is not under status bar
    paddingBottom: 90, // Ensures content is not covered by tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'left',
  },
  emptyText: {
    color: '#aaa',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },

  totalContainer: {
    paddingBottom: 30
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#333',
  },
  totalText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
  },
  totalAmount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
  clearCartTopRight: {
    position: 'absolute',
    top: 16,
    right: 20,
    zIndex: 10,
  },
  clearBtn: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  clearBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  payNowBtn: {
    backgroundColor: '#D2691E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 0,
    //opacity: 1,
  },
  payNowBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default CartScreen;
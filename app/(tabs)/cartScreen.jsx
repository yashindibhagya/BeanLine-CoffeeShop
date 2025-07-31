import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart, getTotal } = useCart();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.selectedSize && <Text style={styles.itemMeta}>Size: {item.selectedSize}</Text>}
                {item.selectedSugar && <Text style={styles.itemMeta}>Sugar: {item.selectedSugar}</Text>}
                <Text style={styles.itemMeta}>Qty: {item.quantity}</Text>
                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromCart(index)}>
                  <Text style={styles.removeBtnText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>${getTotal().toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
            <Text style={styles.clearBtnText}>Clear Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    color: '#aaa',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  itemRow: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  itemName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  itemMeta: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 2,
  },
  itemPrice: {
    color: '#F9A826',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
  },
  removeBtn: {
    marginTop: 8,
    backgroundColor: '#FF6B6B',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  removeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#F9A826',
    fontSize: 22,
    fontWeight: 'bold',
  },
  clearBtn: {
    marginTop: 24,
    backgroundColor: '#444',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  clearBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;

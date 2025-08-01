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
                <View style={styles.imagePlaceholder} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.metaRow}>
                    <View style={styles.metaBox}>
                      <Text style={styles.metaBoxText}>{item.meta || 'M'}</Text>
                    </View>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  </View>
                  <View style={styles.qtyRow}>
                    <TouchableOpacity style={styles.qtyBtn}>
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>1</Text>
                    <TouchableOpacity style={styles.qtyBtn}>
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181B23',
    borderRadius: 18,
    marginBottom: 20,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 2,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 14,
    marginRight: 18,
    backgroundColor: '#222',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 6,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  metaBox: {
    backgroundColor: '#23242a',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  metaBoxText: {
    color: '#fff',
    fontSize: 12,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardPrice: {
    color: '#F9A826',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 18,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
  },
  qtyBtn: {
    backgroundColor: '#F9A826',
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    color: '#181B23',
    fontWeight: 'bold',
    fontSize: 18,
  },
  qtyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 12,
    minWidth: 22,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  itemRow: {
    flexDirection: 'row',
    backgroundColor: '#181B23',
    borderRadius: 18,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },

  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: '#222',
    marginRight: 16,
  },

  itemDetails: {
    flex: 1,
  },

  itemName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  metaBox: {
    backgroundColor: '#23242a',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  metaBoxText: {
    color: '#fff',
    fontSize: 12,
  },

  itemPrice: {
    color: '#F9A826',
    fontSize: 18,
    fontWeight: 'bold',
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyBtn: {
    backgroundColor: '#F9A826',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },

  qtyBtnText: {
    color: '#181B23',
    fontWeight: 'bold',
    fontSize: 18,
  },

  qtyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 12,
    minWidth: 22,
    textAlign: 'center',
  },

});

export default CartScreen;

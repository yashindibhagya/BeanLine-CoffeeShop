import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { FlatList, Image, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { useCart } from '../context/CartContext';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart, getTotal, increaseQuantity, decreaseQuantity } = useCart();
  const [isReceiptVisible, setIsReceiptVisible] = useState(false);
  const [receiptHtml, setReceiptHtml] = useState('');
  const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 130; // default safe value

  const generateReceipt = () => {
    const date = new Date().toLocaleString();
    const itemsHtml = cartItems.map(item => `
      <tr>
        <td>${item.name} (${item.meta || 'M'})</td>
        <td>${item.quantity}</td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 400px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
            .subtitle { color: #666; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th { text-align: left; border-bottom: 2px solid #000; padding: 8px 0; }
            td { padding: 8px 0; border-bottom: 1px solid #ddd; }
            .total { font-weight: bold; text-align: right; font-size: 18px; margin-top: 10px; }
            .thank-you { text-align: center; margin-top: 30px; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">BeanLine Coffee Shop</div>
            <div class="subtitle">123 Coffee St, Bean City</div>
            <div>Receipt #${Math.floor(100000 + Math.random() * 900000)}</div>
            <div>${date}</div>
          </div>
          <table>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
            ${itemsHtml}
          </table>
          <div class="total">Total: $${getTotal().toFixed(2)}</div>
          <div class="thank-you">Thank you for your purchase!</div>
        </body>
      </html>
    `;
    return html;
  };

  const handlePayment = async () => {
    try {
      // Generate receipt HTML
      const html = generateReceipt();
      setReceiptHtml(html);
      
      // Show receipt modal
      setIsReceiptVisible(true);
      
    } catch (error) {
      console.error('Error generating receipt:', error);
      alert('Error generating receipt. Please try again.');
    }
  };

  const savePdf = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: receiptHtml,
        base64: false
      });
      
      if (Platform.OS === 'ios') {
        await Sharing.shareAsync(uri);
      } else {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const fileName = `BeanLine_Receipt_${Date.now()}.pdf`;
          const newUri = await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            fileName,
            'application/pdf'
          );
          await FileSystem.writeAsStringAsync(newUri, await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 }), {
            encoding: FileSystem.EncodingType.Base64
          });
          alert('Receipt saved to Downloads folder');
        }
      }
      
      // Clear cart and close modal after saving
      clearCart();
      setIsReceiptVisible(false);
    } catch (error) {
      console.error('Error saving PDF:', error);
      alert('Error saving receipt. Please try again.');
    }
  };

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
              style={[styles.payNowBtn, cartItems.length === 0 && styles.payNowBtnDisabled]}
              disabled={cartItems.length === 0}
              onPress={handlePayment}
            >
              <Text style={styles.payNowBtnText}>Pay Now</Text>
            </TouchableOpacity>

            {/* Receipt Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={isReceiptVisible}
              onRequestClose={() => setIsReceiptVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Order Receipt</Text>
                    <TouchableOpacity onPress={() => setIsReceiptVisible(false)}>
                      <MaterialIcons name="close" size={24} color="#000" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.receiptContainer}>
                    {receiptHtml ? (
                      <Text style={styles.receiptText}>
                        Your order has been placed successfully!
                      </Text>
                    ) : null}
                  </View>
                  
                  <View style={styles.modalButtons}>
                    <TouchableOpacity 
                      style={[styles.modalButton, styles.saveButton]}
                      onPress={savePdf}
                    >
                      <MaterialIcons name="picture-as-pdf" size={20} color="#fff" />
                      <Text style={styles.saveButtonText}>Save as PDF</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.modalButton, styles.closeButton]}
                      onPress={() => {
                        clearCart();
                        setIsReceiptVisible(false);
                      }}
                    >
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
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
    backgroundColor: '#D4A76A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  payNowBtnDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.6,
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
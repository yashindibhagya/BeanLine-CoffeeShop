import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart (if same id/size/sugar, increase quantity)
  const addToCart = (item) => {
    setCartItems((prev) => {
      // Check for existing (id + size + sugar) combo
      const idx = prev.findIndex(
        (ci) =>
          ci.id === item.id &&
          ci.selectedSize === item.selectedSize &&
          ci.selectedSugar === item.selectedSugar
      );
      if (idx > -1) {
        // Update quantity
        const updated = [...prev];
        updated[idx].quantity += item.quantity;
        return updated;
      } else {
        return [...prev, { ...item }];
      }
    });
  };

  // Increase quantity of an item
  const increaseQuantity = (index) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity += 1;
      return updated;
    });
  };

  // Decrease quantity of an item
  const decreaseQuantity = (index) => {
    setCartItems((prev) => {
      const updated = [...prev];
      if (updated[index].quantity > 1) {
        updated[index].quantity -= 1;
        return updated;
      } else {
        // Remove item if quantity reaches 0
        return updated.filter((_, i) => i !== index);
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Calculate total
  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getTotal, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

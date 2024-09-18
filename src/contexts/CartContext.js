import React, { createContext, useState, useContext } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cartId, setcartId] = useState(null);

  // Add item to cart
  const setCartId = (id) => {
    localStorage.setItem('cartId', id)
    setcartId(id);
  };

  // Remove item from cart
  const unSetcartId = () => {
    delete localStorage.cartId;
    setCartId(null);
  };

  return (
    <CartContext.Provider value={{ cartId, setCartId, unSetcartId }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);

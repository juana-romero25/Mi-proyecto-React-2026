import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeItem(id) {
    setCart(cart.filter(p => p.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}
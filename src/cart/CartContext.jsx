import React, { createContext, useState, useContext } from "react";

// 1. Creamos el contexto
export const CartContext = createContext();

// 2. Creamos el Hook Personalizado para consumir el contexto fácilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// 3. El componente Proveedor
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");

  // Cálculo del precio total al vuelo
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );

  // AGREGAR
  function addToCart(producto) {
    const existe = cart.find((item) => item.id === producto.id);

    if (existe) {
      setCart(
        cart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item,
        ),
      );
    } else {
      setCart([...cart, producto]);
    }
    setToast("Producto agregado 🛒");

    setTimeout(() => setToast(""), 2000);
  }

  // SUMAR UNO (Con control de stock)
  function increase(id) {
    setCart(
      cart.map(item =>
        item.id === id && item.cantidad < item.stock
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  }

  // RESTAR UNO (Se elimina si llega a 0)
  function decrease(id) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  }

  // 1. ELIMINAR UN PRODUCTO DEL CARRITO
  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  // 2. VERIFICAR SI UN PRODUCTO YA ESTÁ EN EL CARRITO
  // Devuelve true si ya existe, false si no.
  function isInCart(id) {
    return cart.some((item) => item.id === id);
  }

  // VACIAR CARRITO
  function clearCart() {
    setCart([]);
  }

  // TOTAL DE ARTÍCULOS
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
        removeItem,  // Ya disponible para exportar
        isInCart,    // Nueva función añadida al contexto global
        clearCart,
        totalItems,
        totalPrice,
        toast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
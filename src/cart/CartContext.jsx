import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );

  // AGREGAR
  function addToCart(product) {
    const existe = cart.find((item) => item.id === product.id);

    if (existe) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + product.cantidad }
            : item,
        ),
      );
    } else {
      setCart([...cart, product]);
    }
setToast("Producto agregado 🛒");

  setTimeout(() => setToast(""), 2000);

  }

  // SUMAR UNO
 function increase(id) {
  setCart(
    cart.map(item =>
      item.id === id && item.cantidad < item.stock
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    )
  );
}

  // RESTAR UNO
  function decrease(id) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  }

  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  // 🔥 TOTAL REAL (IMPORTANTE)
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
        removeItem,
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

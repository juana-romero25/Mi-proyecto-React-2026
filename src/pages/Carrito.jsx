import { useContext } from "react";
import { CartContext } from "../cart/CartContext";
import styles from "./carrito.module.css";

function Carrito() {
  const { cart, removeItem, clearCart, increase, decrease } =
    useContext(CartContext);
  const { totalPrice } = useContext(CartContext);

  return (
    <section className={styles.carrito}>
      <h1 className={styles.titulo}>Carrito</h1>

      {cart.length === 0 ? (
        <p className={styles.vacio}>El carrito está vacío</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id + item.cantidad} className={styles.item}>
              <div className={styles.info}>
                <p className={styles.nombre}>{item.nombre}</p>

                <p className={styles.precio}>${item.precio}</p>

                <p className={styles.precio}>
                  Subtotal: ${item.precio * item.cantidad}
                </p>
              </div>

              {/* CONTROLES + / - */}
              <div className={styles.controles}>
                <button
                  className={styles.btnCantidad}
                  onClick={() => decrease(item.id)}
                >
                  -
                </button>

                <span className={styles.cantidad}>{item.cantidad}</span>

                <button
                  className={styles.btnCantidad}
                  onClick={() => increase(item.id)}
                  disabled={item.cantidad >= item.stock}
                >
                  +
                </button>
              </div>

              <h2 className={styles.total}>Total: ${totalPrice}</h2>
            </div>
          ))}

          <button className={styles.btnVaciar} onClick={clearCart}>
            Vaciar carrito
          </button>

          <button
            className={styles.btnComprar}
            onClick={() => {
              alert("¡Compra finalizada!");
              clearCart();
            }}
          >
            Finalizar compra
          </button>
        </>
      )}
    </section>
  );
}

export default Carrito;

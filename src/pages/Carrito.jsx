import { useContext } from "react";
import { Link } from "react-router-dom"; // Importación del Link agregada
import { CartContext } from "../cart/CartContext";
import styles from "./carrito.module.css";

function Carrito() {
  const { cart, removeItem, clearCart, increase, decrease, totalPrice } = useContext(CartContext);

  // Calculamos la cantidad total de artículos en el carrito
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <section className={styles.carritoContainer}>
      {/* Encabezado de la página */}
      <div className={styles.headerPage}>
        <h1 className={styles.tituloPage}>Carrito de Compras</h1>
        <p className={styles.breadcrumb}>Inicio / Carrito de compras</p>
        {/* Tu Link configurado hacia tu ruta de catálogo */}
          
      </div>

      {cart.length === 0 ? (
        <div className={styles.vacioContainer}>
          <p className={styles.vacio}>El carrito está vacío</p>
          <p className={styles.vacioSecundario}>Agrega productos para continuar la compra</p>
          {/* LINK AGREGADO: Redirige al catálogo de productos */}
          <Link to="/Productos" className={styles.btnVolver}>
            Ver Productos
          </Link>
          
          
        </div>
      ) : (
        <div className={styles.layout}>
          
          {/* COLUMNA IZQUIERDA: Tabla de Productos */}
          <div className={styles.columnaProductos}>
            <table className={styles.tabla}>
              <thead>
                <tr>
                  <th></th> {/* Para la X de eliminar */}
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    {/* Botón Eliminar fila (X) */}
                    <td className={styles.celdaEliminar}>
                      <button 
                        className={styles.btnEliminar} 
                        onClick={() => removeItem(item.id)}
                        aria-label="Eliminar producto"
                      >
                        &times;
                      </button>
                    </td>

                    {/* Información del Producto (Imagen + Detalles) */}
                    <td className={styles.celdaProducto}>
                      <div className={styles.infoProducto}>
                        <img 
                          src={item.imagen || "https://via.placeholder.com/80"} 
                          alt={item.nombre} 
                          className={styles.imagenProducto}
                        />
                        <div>
                          <p className={styles.nombre}>{item.nombre}</p>
                          {/* Variantes opcionales (Color/Tamaño si tu proyecto de mascotas los maneja) */}
                          {item.detalles && <span className={styles.detalles}>{item.detalles}</span>}
                        </div>
                      </div>
                    </td>

                    {/* Precio Unitario */}
                    <td className={styles.celdaPrecio}>
                      ${item.precio.toFixed(2)}
                    </td>

                    {/* Controles de Cantidad */}
                    <td className={styles.celdaCantidad}>
                      <div className={styles.controles}>
                        <button
                          className={styles.btnCantidad}
                          onClick={() => decrease(item.id)}
                        >
                          -
                        </button>
                        <span className={styles.cantidadText}>{item.cantidad}</span>
                        <button
                          className={styles.btnCantidad}
                          onClick={() => increase(item.id)}
                          disabled={item.cantidad >= item.stock}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Subtotal por producto */}
                    <td className={styles.celdaSubtotal}>
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Acciones debajo de la tabla (Cupón y Vaciar) */}
            <div className={styles.accionesAbajo}>
              <div className={styles.cuponBox}>
                <input 
                  type="text" 
                  placeholder="Codigo de Cupon" 
                  className={styles.inputCupon}
                />
                <button className={styles.btnCupon}>Aplicar Cupon</button>
              </div>
              <button className={styles.btnVaciar} onClick={clearCart}>
                Vaciar Carrito
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: Resumen de la Orden */}
          <div className={styles.columnaResumen}>
            <div className={styles.cardResumen}>
              <h2 className={styles.tituloResumen}>Resumen</h2>
              
              <div className={styles.filaResumen}>
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className={styles.filaResumen}>
                <span>Sub Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className={styles.filaResumen}>
                <span>Envio</span>
                <span>$0.00</span>
              </div>
             
              
              <hr className={styles.separador} />
              
              <div className={`${styles.filaResumen} ${styles.totalDestacado}`}>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button
                className={styles.btnCheckout}
                onClick={() => {
                  alert("¡Compra finalizada!");
                  clearCart();
                }}
              >
                Finalizar compra
              </button>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}

export default Carrito;
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import styles from "./carrito.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Carrito() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cart, removeItem, clearCart, increase, decrease, totalPrice } =
    useContext(CartContext);

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const [codigoCupon, setCodigoCupon] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [mensajeCupon, setMensajeCupon] = useState("");
  const [cuponAplicado, setCuponAplicado] = useState("");
  const [cupones, setCupones] = useState([]);

  useEffect(() => {
    const cargarCupones = async () => {
      try {
        const snapshot = await getDocs(collection(db, "cupones"));

        const listaCupones = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCupones(listaCupones);
      } catch (error) {
        console.error("Error cargando cupones:", error);
      }
    };

    cargarCupones();
  }, []);

  const aplicarCupon = () => {
    const codigo = codigoCupon.trim().toUpperCase();

    if (cuponAplicado) {
      setMensajeCupon("Ya aplicaste un cupón en esta compra.");
      return;
    }

    const cupon = cupones.find((c) => c.codigo.toUpperCase() === codigo);

    if (cupon) {
      setDescuento(cupon.descuento);
      setCuponAplicado(codigo);

      setMensajeCupon(
        `✅ Cupón "${codigo}" aplicado: ${cupon.descuento}% de descuento.`,
      );
    } else {
      setMensajeCupon("❌ Código de cupón inválido.");
    }

    setCodigoCupon("");
  };

  const totalConDescuento = totalPrice * (1 - descuento / 100);

  return (
    <section className={styles.carritoContainer}>
      <div className={styles.headerPage}>
        <h1 className={styles.tituloPage}>Carrito de Compras</h1>
        <p className={styles.breadcrumb}>Inicio / Carrito de compras</p>
      </div>

      {cart.length === 0 ? (
        <div className={styles.vacioContainer}>
          <p className={styles.vacio}>El carrito está vacío</p>
          <p className={styles.vacioSecundario}>
            Agrega productos para continuar la compra
          </p>
          <Link to="/productos" className={styles.btnVolver}>
            Ver Productos
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          {/* COLUMNA IZQUIERDA */}
          <div className={styles.columnaProductos}>
            <table className={styles.tabla}>
              <thead>
                <tr>
                  <th></th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.celdaEliminar}>
                      <button
                        className={styles.btnEliminar}
                        onClick={() => removeItem(item.id)}
                        aria-label="Eliminar producto"
                      >
                        &times;
                      </button>
                    </td>

                    <td className={styles.celdaProducto}>
                      <div className={styles.infoProducto}>
                        <img
                          src={item.imagen || "https://via.placeholder.com/80"}
                          alt={item.nombre}
                          className={styles.imagenProducto}
                        />
                        <div>
                          <p className={styles.nombre}>{item.nombre}</p>
                          {item.detalles && (
                            <span className={styles.detalles}>
                              {item.detalles}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className={styles.celdaPrecio}>
                      ${item.precio.toFixed(2)}
                    </td>

                    <td className={styles.celdaCantidad}>
                      <div className={styles.controles}>
                        <button
                          className={styles.btnCantidad}
                          onClick={() => decrease(item.id)}
                        >
                          -
                        </button>
                        <span className={styles.cantidadText}>
                          {item.cantidad}
                        </span>
                        <button
                          className={styles.btnCantidad}
                          onClick={() => increase(item.id)}
                          disabled={item.cantidad >= item.stock}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className={styles.celdaSubtotal}>
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.accionesAbajo}>
              <div className={styles.cuponBox}>
                <input
                  type="text"
                  placeholder="Código de Cupón"
                  className={styles.inputCupon}
                  value={codigoCupon}
                  onChange={(e) => setCodigoCupon(e.target.value)}
                  disabled={!!cuponAplicado}
                />
                <button
                  className={styles.btnCupon}
                  onClick={aplicarCupon}
                  disabled={!!cuponAplicado}
                >
                  Aplicar Cupón
                </button>
              </div>
              {mensajeCupon && (
                <p
                  className={
                    cuponAplicado ? styles.cuponExito : styles.cuponError
                  }
                >
                  {mensajeCupon}
                </p>
              )}
              <button className={styles.btnVaciar} onClick={clearCart}>
                Vaciar Carrito
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: Resumen */}
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
              {descuento > 0 && (
                <div
                  className={`${styles.filaResumen} ${styles.descuentoFila}`}
                >
                  <span>Descuento ({descuento}%)</span>
                  <span>-${((totalPrice * descuento) / 100).toFixed(2)}</span>
                </div>
              )}
              <div className={styles.filaResumen}>
                <span>Envío</span>
                <span>$0.00</span>
              </div>

              <hr className={styles.separador} />

              <div className={`${styles.filaResumen} ${styles.totalDestacado}`}>
                <span>Total</span>
                <span>${totalConDescuento.toFixed(2)}</span>
              </div>

              <button
                className={styles.btnCheckout}
                onClick={() => {
                  if (!user) {
                    alert("Debes iniciar sesión para finalizar la compra 🐾");
                    navigate("/login", {
                      state: {
                        from: "/carrito",
                      },
                    });

                    return;
                  }

                  const nombreUsuario =
                    user?.nombre || user?.email?.split("@")[0] || "cliente";

                  alert(
                    `¡Gracias por tu compra ${nombreUsuario}! 🐾\nTu pedido fue procesado correctamente.`,
                  );

                  clearCart();
                  navigate("/perfil");
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

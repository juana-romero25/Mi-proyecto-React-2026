import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../cart/CartContext";
import styles from "./productoDetalle.module.css";

import { ShoppingCart, ArrowLeft } from "lucide-react";

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [stockActual, setStockActual] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((res) => res.json())
      .then((data) => {
        const prod = data.find((p) => p.id === Number(id));
        setProducto(prod);
        setStockActual(prod.stock);
      });
  }, [id]);

  const handleAdd = () => {
    if (cantidad > stockActual) return;

    addToCart({ ...producto, cantidad });

    setStockActual(stockActual - cantidad);

    setMensaje("¡Producto agregado al carrito!");
    setTimeout(() => setMensaje(""), 2000);

    setCantidad(1);
  };

  if (!producto) {
    return <p className={styles.loading}>Cargando producto...</p>;
  }

  return (
    <section className={styles.container}>
      <button className={styles.volver} onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Volver
      </button>

      <div className={styles.card}>
        <div className={styles.imgBox}>
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className={styles.info}>
          <h2>{producto.nombre}</h2>

          <p className={styles.categoria}>Categoría: {producto.categoria}</p>

          <p className={styles.precio}>${producto.precio}</p>

          <p className={styles.stock}>Stock disponible: {stockActual}</p>
          <p>{producto.descripcion}</p>

          {/* CANTIDAD */}
          <div className={styles.cantidad}>
            <button
              onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}
            >
              -
            </button>
            <span>{cantidad}</span>
            <button
              onClick={() =>
                setCantidad(cantidad < stockActual ? cantidad + 1 : stockActual)
              }
            >
              +
            </button>
          </div>

          <button
            className={styles.boton}
            onClick={handleAdd}
            disabled={stockActual === 0}
          >
            Agregar al carrito
          </button>

          {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
        </div>
      </div>
    </section>
  );
}

export default ProductoDetalle;

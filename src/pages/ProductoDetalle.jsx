import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { obtenerCatalogo } from "../services/productoService";
import styles from "./productoDetalle.module.css";

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [stockActual, setStockActual] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [tabActiva, setTabActiva] = useState("description");

  // Traemos las funciones del contexto usando tu hook personalizado
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    async function cargarProducto() {
      const data = await obtenerCatalogo();

      const prod = data.find((p) => String(p.id) === String(id));

      if (prod) {
        setProducto(prod);
        setStockActual(prod.stock);

        const filtrados = data.filter(
          (item) =>
            item.categoria === prod.categoria &&
            String(item.id) !== String(prod.id),
        );

        if (filtrados.length === 0) {
          setRelacionados(
            data
              .filter((item) => String(item.id) !== String(prod.id))
              .slice(0, 4),
          );
        } else {
          setRelacionados(filtrados.slice(0, 4));
        }
      }
    }

    cargarProducto();
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
    return <p className={styles.loading}>Cargando productos...</p>;
  }

  return (
    <section className={styles.container}>
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate("/")}>INICIO</span> &gt;
        <span onClick={() => navigate(-1)}> COMPRAR</span> &gt;
        <span className={styles.activeBreadcrumb}>
          {" "}
          {producto.nombre.toUpperCase()}
        </span>
      </div>

      <div className={styles.mainLayout}>
        <div className={styles.gallerySection}>
          <div className={styles.mainImageBox}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.infoSection}>
          <span className={styles.metaCategory}>
            {producto.categoria ? producto.categoria.toUpperCase() : "JEWELRY"}
          </span>
          <h1 className={styles.productTitle}>{producto.nombre}</h1>

          <div className={styles.ratingBox}></div>

          <div className={styles.price}>${producto.precio.toFixed(2)}</div>

          <div className={styles.selectorGroup}></div>

          <div className={styles.metaRow}>
            <span>
              <strong>Disponible:</strong> {stockActual} en stock
            </span>
          </div>

          <div className={styles.purchaseActions}>
            {isInCart(producto.id) ? (
              <Link to="/carrito" className={styles.btnGoToCart}>
                Terminar mi compra 🛒
              </Link>
            ) : (
              <>
                <div className={styles.cantidadContainer}>
                  <button
                    className={styles.btnCantidad}
                    onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}
                  >
                    -
                  </button>
                  <span className={styles.cantidadValor}>{cantidad}</span>
                  <button
                    className={styles.btnCantidad}
                    onClick={() =>
                      setCantidad(
                        cantidad < stockActual ? cantidad + 1 : stockActual,
                      )
                    }
                    disabled={cantidad >= stockActual}
                  >
                    +
                  </button>
                </div>

                <button
                  className={styles.btnAddToCart}
                  onClick={handleAdd}
                  disabled={stockActual === 0}
                >
                  Agregar al carrito
                </button>
              </>
            )}
          </div>

          {mensaje && <p className={styles.mensajeExito}>{mensaje}</p>}
        </div>
      </div>

      <div className={styles.extendedLayout}>
        <div className={styles.tabsAndDetails}>
          <div className={styles.tabsHeader}>
            <button
              className={`${styles.tabButton} ${tabActiva === "description" ? styles.tabActive : ""}`}
              onClick={() => setTabActiva("description")}
            >
              Detalle de Producto
            </button>
          </div>

          <div className={styles.tabContent}>
            {tabActiva === "description" ? (
              <div className={styles.descriptionContent}>
                <p>{producto.descripcion}</p>
              </div>
            ) : (
              <div className={styles.descriptionContent}>
                <p>{producto.detalle}</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.additionalInfo}>
          <h3>Información de Envío y Cuidados</h3>
          <div className={styles.infoMetaField}>
            <span className={styles.metaLabel}>DISPONIBILIDAD INMEDIATA</span>
            <span className={styles.metaValue}>
              Sí, retiro en tienda o envío express.
            </span>
          </div>
          <div className={styles.infoMetaField}>
            <span className={styles.metaLabel}>POLÍTICA DE DEVOLUCIÓN</span>
            <span className={styles.metaValue}>
              30 días para cambios de talle o fallas de fábrica.
            </span>
          </div>
        </div>
      </div>

      <div className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>También te puede interesar</h2>

        <div className={styles.carouselPlaceholder}>
          <button className={styles.carouselArrow}>&lt;</button>

          <div className={styles.carouselGrid}>
            {relacionados.map((rel) => (
              <div
                key={rel.id}
                className={styles.miniCard}
                onClick={() => {
                  navigate(`/producto/${rel.id}`);
                  window.scrollTo(0, 0);
                }}
              >
                <div className={styles.miniImgBox}>
                  <img
                    src={rel.imagen}
                    alt={rel.nombre}
                    className={styles.miniImg}
                  />
                </div>
                <p className={styles.miniNombre}>{rel.nombre}</p>
                <span className={styles.miniPrecio}>
                  ${rel.precio.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <button className={styles.carouselArrow}>&gt;</button>
        </div>
      </div>
    </section>
  );
}

export default ProductoDetalle;

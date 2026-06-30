import { useParams, useNavigate, Link } from "react-router-dom"; // Link agregado
import { useEffect, useState } from "react";
import { useCart } from "../cart/CartContext"; // Cambiado a useCart para consumir el hook premium
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
    fetch("/data/productos.json")
      .then((res) => res.json())
      .then((data) => {
        const prod = data.find((p) => p.id === Number(id));
        if (prod) {
          setProducto(prod);
          setStockActual(prod.stock);

          // FILTRADO INTELIGENTE:
          // Buscamos productos de la misma categoría, pero que NO tengan el mismo ID
          const filtrados = data.filter(
            (item) => item.categoria === prod.categoria && item.id !== prod.id
          );

          // Si no hay suficientes de la misma categoría, puedes mostrar otros cualquiera para rellenar
          if (filtrados.length === 0) {
            setRelacionados(data.filter((item) => item.id !== prod.id).slice(0, 4));
          } else {
            setRelacionados(filtrados.slice(0, 4)); // Tomamos máximo 4 sugerencias
          }
        }
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
      {/* Breadcrumb superior */}
      <div className={styles.breadcrumb}>
        <span onClick={() => navigate("/")}>INICIO</span> &gt;
        <span onClick={() => navigate(-1)}> COMPRAR</span> &gt;
        <span className={styles.activeBreadcrumb}>
          {" "}
          {producto.nombre.toUpperCase()}
        </span>
      </div>

      {/* BLOQUE SUPERIOR: Galería e Info Principal */}
      <div className={styles.mainLayout}>
        {/* Izquierda: Galería de Imágenes */}
        <div className={styles.gallerySection}>
          <div className={styles.thumbnails}>
            <div className={styles.thumbBox}>
              <img src={producto.imagen} alt="thumb" />
            </div>
            <div className={styles.thumbBox}>
              <img src={producto.imagen} alt="thumb" />
            </div>
            <div className={styles.thumbBox}>
              <img src={producto.imagen} alt="thumb" />
            </div>
            <div className={styles.thumbBox}>
              <img src={producto.imagen} alt="thumb" />
            </div>
          </div>
          <div className={styles.mainImageBox}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className={styles.mainImage}
            />
          </div>
        </div>

        {/* Derecha: Opciones de Compra */}
        <div className={styles.infoSection}>
          <span className={styles.metaCategory}>
            {producto.categoria ? producto.categoria.toUpperCase() : "JEWELRY"}
          </span>
          <h1 className={styles.productTitle}>{producto.nombre}</h1>

          {/* Estrellas de valoración estáticas */}
          <div className={styles.ratingBox}>
            <span className={styles.stars}>★★★★★</span>
            <span className={styles.reviewsCount}>5 reviews</span>
          </div>

          <div className={styles.price}>${producto.precio.toFixed(2)}</div>

          {/* Selectores del diseño */}
          <div className={styles.selectorGroup}>
            <label htmlFor="color-select">Color:</label>
            <select id="color-select" className={styles.selectInput}>
              <option value="turquoise">Turquoise</option>
              <option value="brown">Brown</option>
            </select>
          </div>

          {/* Estado de stock y SKU */}
          <div className={styles.metaRow}>
            <span>
              <strong>Availability:</strong> {stockActual} in stock
            </span>
            <span>
              <strong>SKU:</strong> ILMPT-C
            </span>
          </div>

          {/* CONTROLES DE COMPRA OPTIMIZADOS CON ISINCART */}
          <div className={styles.purchaseActions}>
            {isInCart(producto.id) ? (
              /* Si el producto YA está en el carrito, mostramos el acceso directo */
              <Link to="/carrito" className={styles.btnGoToCart}>
                Terminar mi compra 🛒
              </Link>
            ) : (
              /* Si NO está en el carrito, mostramos los controles normales */
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
                  Add to cart
                </button>
              </>
            )}
          </div>

          {mensaje && <p className={styles.mensajeExito}>{mensaje}</p>}

          {/* Redes Sociales */}
          <div className={styles.shareSection}>
            <span>SHARE ON:</span>
            <span className={styles.socialIcons}>𝕗 𝕩 📷</span>
          </div>
        </div>
      </div>

      {/* BLOQUE INFERIOR: Pestañas de información extendida */}
      <div className={styles.extendedLayout}>
        <div className={styles.tabsAndDetails}>
          {/* Encabezado de pestañas */}
          <div className={styles.tabsHeader}>
            <button
              className={`${styles.tabButton} ${tabActiva === "description" ? styles.tabActive : ""}`}
              onClick={() => setTabActiva("description")}
            >
              Descripción Breve
            </button>
            <button
              className={`${styles.tabButton} ${tabActiva === "details" ? styles.tabActive : ""}`}
              onClick={() => setTabActiva("details")}
            >
              Detalles del Producto
            </button>
          </div>

          {/* Contenido de las pestañas */}
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

        {/* Datos fijos de la tienda a la derecha */}
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

      {/* SUGERENCIAS: You may also like */}
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
                  <img src={rel.imagen} alt={rel.nombre} className={styles.miniImg} />
                </div>
                <p className={styles.miniNombre}>{rel.nombre}</p>
                <span className={styles.miniPrecio}>${rel.precio.toLocaleString()}</span>
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
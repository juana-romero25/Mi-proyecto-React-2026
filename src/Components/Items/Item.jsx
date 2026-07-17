import { Link } from "react-router-dom";
import styles from "./item.module.css";

function Item({ id, nombre, precio, imagen, stock, categoria }) {
  return (
    <div className={styles.card}>
      <Link to={`/producto/${id}`} className={styles.productLink}>
        <div className={styles.imageWrapper}>
          <img src={imagen} alt={nombre} className={styles.image} />

          {stock > 0 && stock <= 3 && (
            <span className={styles.lowStockBadge}>¡Últimos {stock}!</span>
          )}
          {stock === 0 && (
            <span className={styles.outOfStockBadge}>Sin Stock</span>
          )}
        </div>

        <div className={styles.info}>
          {categoria && (
            <span className={styles.category}>{categoria.toUpperCase()}</span>
          )}
          <h3 className={styles.title}>{nombre}</h3>
          <p className={styles.price}>${precio.toLocaleString()}</p>
        </div>
      </Link>

      <Link to={`/producto/${id}`} className={styles.actionButton}>
        Ver Producto
      </Link>
    </div>
  );
}

export default Item;

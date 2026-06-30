import Item from "./Item";
import styles from "./itemList.module.css"; // Creamos o usamos su módulo de estilos

function ItemList({ productos }) {
  return (
    /* Cambiamos el div común por uno con estilos de grilla */
    <div className={styles.productsGrid}>
      {productos.map((prod) => (
        <Item
          key={prod.id}
          id={prod.id}
          nombre={prod.nombre}
          precio={prod.precio}
          imagen={prod.imagen}
          stock={prod.stock}
          categoria={prod.categoria}
        />
      ))}
    </div>
  );
}

export default ItemList;
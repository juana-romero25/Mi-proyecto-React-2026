import Item from "./Item";
import styles from "./itemList.module.css"; 

function ItemList({ productos }) {
  return (
  
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
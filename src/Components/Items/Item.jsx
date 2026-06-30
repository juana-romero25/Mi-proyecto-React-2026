import { Link } from "react-router-dom";
import styles from "./item.module.css";
import { useState, useEffect } from "react";


useEffect(() => {
    if (!id) return;
    //creamos una consulta = query
    const queryId = query(
        //creamos una referencia a la colección productos
        collection(db, "productos"),
        //sólo los documentos cuyo campo id sea igual al valor recibido
        where("id", "==", Number(id))
    );
    //getDocs usa el query
    getDocs(queryId)
        .then((resp) => {
            if (resp.empty) {
                console.log("No se encontró el producto");
                return;
            }
            setProducto({
                ...resp.docs[0].data(),
                idFirestore: resp.docs[0].id
            });
        })
        .catch((error) => {
            console.error("Error al cargar el producto:", error);
        });
}, [id]);

function Item({ id, nombre, precio, imagen, stock, categoria }) {
  return (
    <div className={styles.card}>
      {/* Contenedor del enlace que envuelve la imagen y textos para mejor accesibilidad */}
      <Link to={`/producto/${id}`} className={styles.productLink}>
        
        {/* Contenedor de la imagen para controlar el desborde del zoom */}
        <div className={styles.imageWrapper}>
          <img src={imagen} alt={nombre} className={styles.image} />
          
          {/* Badge UX: Alerta visual discreta si hay poco stock */}
          {stock > 0 && stock <= 3 && (
            <span className={styles.lowStockBadge}>¡Últimos {stock}!</span>
          )}
          {stock === 0 && (
            <span className={styles.outOfStockBadge}>Sin Stock</span>
          )}
        </div>

        {/* Información del Producto */}
        <div className={styles.info}>
          {categoria && <span className={styles.category}>{categoria.toUpperCase()}</span>}
          <h3 className={styles.title}>{nombre}</h3>
          <p className={styles.price}>${precio.toLocaleString()}</p>
        </div>
      </Link>

      {/* Botón de acción claro y accesible en la parte inferior */}
      <Link to={`/producto/${id}`} className={styles.actionButton}>
        Ver Producto
      </Link>
    </div>
  );
}

export default Item;
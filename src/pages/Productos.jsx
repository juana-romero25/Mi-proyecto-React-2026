import { useEffect, useState } from "react";
import Item from "../Components/Items/Item";
import styles from "./productos.module.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar productos");
        }
        return res.json();
      })
      .then((data) => {
        setProductos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className={styles.loading}>Cargando productos...</h2>;
  if (error) return <h2 className={styles.error}>{error}</h2>;

  return (
    <div className={styles.container}>
   
      <h2 className={styles.title}>Productos</h2>

      <div className={styles.grid}>
        {productos.map((p) => (
          <Item key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}

export default Productos;
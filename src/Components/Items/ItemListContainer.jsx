import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import styles from "./itemList.module.css"; // Podemos compartir estilos o usar los globales

function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true); // Estado inicial en verdadero

  useEffect(() => {
    fetch("/data/productos.json")
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setCargando(false); // Apagamos la carga cuando llegan los datos
      })
      .catch(err => {
        console.error(err);
        setCargando(false);
      });
  }, []);

  // Mensaje temporal elegante mientras cargan los productos
  if (cargando) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#666", letterSpacing: "1px" }}>
        <p>Cargando productos de Pet Store...</p>
      </div>
    );
  }

  return <ItemList productos={productos} />;
}

export default ItemListContainer;
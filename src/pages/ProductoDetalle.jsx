import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../cart/CartContext";

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((response) => response.json())
      .then((data) => {
        const prod = data.find((p) => p.id === Number(id));
        setProducto(prod);
      });
      
  }, [id]);

  if (!producto) {
    return <h2>Cargando detalle del producto...</h2>;
  }
  if (!producto.id) {
    return <h2>Producto no encontrado.</h2>;
  }

  return (
    <div>
      <h2>Detalle de producto{producto.nombre}</h2>
      <img src={producto.imagen} alt={producto.nombre} />
      <h3>${producto.precio}</h3>
      <p>{producto.descripcion}</p>

      <button onClick={() => addToCart(producto)}>Agregar al carrito</button>
    </div>
  );
}

export default ProductoDetalle;

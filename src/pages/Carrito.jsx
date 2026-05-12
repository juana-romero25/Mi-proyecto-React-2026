import { useContext } from "react";
import { CartContext } from "../cart/CartContext";

function Carrito() {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Carrito</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        cart.map(item => (
          <div key={item.id}>
            {item.nombre} - ${item.precio} x {item.cantidad}
          </div>
        ))
      )}
    </div>
  );
}

export default Carrito;
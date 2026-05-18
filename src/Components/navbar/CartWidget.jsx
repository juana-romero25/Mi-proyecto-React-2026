import { useContext } from "react";
import { CartContext } from "../../cart/CartContext";

function CartWidget() {
  const { totalItems } = useContext(CartContext);

  return (
    <div>
      carrito {totalItems}
    </div>
  );
}

export default CartWidget;
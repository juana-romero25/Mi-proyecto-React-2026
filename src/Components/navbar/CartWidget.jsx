import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function CartWidget() {
  const { totalItems } = useContext(CartContext);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "bold", color: "white" }}>
      🛒
      {totalItems > 0 && (
        <span style={{
          background: "#ffa502",
          color: "#fff",
          borderRadius: "50%",
          width: "22px",
          height: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          fontWeight: "bold",
        }}>
          {totalItems}
        </span>
      )}
    </div>
  );
}

export default CartWidget;

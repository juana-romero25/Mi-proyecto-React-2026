import { useContext } from "react";
import { CartContext } from "../cart/CartContext";

export const useCart = () => {
  return useContext(CartContext);
};
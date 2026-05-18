import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import styles from "./navbar.module.css";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
      
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/promos">Promos</Link>
        <Link to="/alta">Alta de Productos</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/carrito">Carrito</Link>
       
      </div>
     

      <CartWidget />
    </nav>
  );
}

export default NavBar;

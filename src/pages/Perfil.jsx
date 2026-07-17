import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Tag, Box, ShoppingCart, ShoppingBag } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import SEO from "../Components/common/SEO";
import styles from "./perfil.module.css";


export default function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const esAdmin = user?.rol === "administrador";

  return (
    <div className={styles.container}>
      <SEO titulo="Mi Perfil" />

      <div className={styles.card}>
        <User size={60} className={styles.icono} />
        <h2>Bienvenido {user?.nombre}</h2>
        
        <br />

        {esAdmin ? (
          /* 👑 VISTA EXCLUSIVA PARA EL ADMINISTRADOR */
          <div className={styles.adminPanel}>
            <h3>Panel de Administración</h3>

            <Link to="/admin/productos" className={styles.adminButton}>
              <Box size={18} />
              Gestionar Productos
            </Link>
            <br />

            <Link to="/admin/cupones" className={styles.adminButton}>
              <Tag size={18} />
              Gestionar Cupones
            </Link>
          </div>
        ) : (
          /* 🛒 VISTA EXCLUSIVA PARA CLIENTES COMUNES */
          <>
            <Link to="/productos" className={styles.adminButton}>
              <ShoppingBag size={18} />
              COMPRAR
            </Link>
            <br />
            
            <Link to="/carrito" className={styles.adminButton}>
              <ShoppingCart size={18} />
              MI CARRITO
            </Link>
          </>
        )}

        <br />
        <button onClick={handleLogout} className={styles.logoutButton}>
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
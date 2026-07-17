import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CartWidget from "./CartWidget";
import { useAuth } from "../../context/AuthContext";
import styles from "./navbar.module.css";
import {
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";

function NavBar() {
  // 🔑 Usamos "user" que es la variable real que viene de tu AuthContext
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMenuOpen(false);
  };

  // Si "user" tiene datos, significa que el usuario está logueado
  const estaLogueado = !!user;

  return (
    <nav className={styles.nav}>
      <button
        className={styles.menuToggle}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menú"
      >
        ☰
      </button>

      <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          INICIO
        </Link>
        <Link to="/productos" onClick={() => setMenuOpen(false)}>
          PRODUCTOS
        </Link>
        <Link to="/promo" onClick={() => setMenuOpen(false)}>
          PROMO DEL DIA
        </Link>
        <Link to="/contacto" onClick={() => setMenuOpen(false)}>
          CONTACTO
        </Link>
        <Link to="/nosotros" onClick={() => setMenuOpen(false)}>
          NOSOTROS
        </Link>
        
        {/* 👤 SECCIÓN PERFIL: Solo aparece si hay un usuario logueado */}
        {estaLogueado && (
          <Link to="/perfil" onClick={() => setMenuOpen(false)}>
            PERFIL
          </Link>
        )}
      </div> 

      <div className={styles.userSection}>
        {estaLogueado ? (
          /* 🟢 MOSTRAR SOLO "CERRAR SESIÓN" SI ESTÁ LOGUEADO */
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={18} />
            Cerrar sesión
          </button>
        ) : (
          /* 🔴 MOSTRAR "INGRESAR" Y "REGISTRARSE" SI NO HAY SESIÓN */
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <LogIn size={18} />
              Ingresar
            </Link>

            <Link to="/registro" onClick={() => setMenuOpen(false)}>
              <UserPlus size={18} />
              Registrarse
            </Link>
          </>
        )}

        <Link to="/carrito" className={styles.cartLink}>
          <CartWidget />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
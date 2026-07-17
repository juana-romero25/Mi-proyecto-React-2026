import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const ingresar = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/perfil");
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/invalid-credential":
          alert("Email o contraseña incorrectos");
          break;

        case "auth/user-not-found":
          alert("El usuario no existe");
          break;

        case "auth/wrong-password":
          alert("La contraseña es incorrecta");
          break;

        default:
          alert("Error al iniciar sesión");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🐾</div>
          <h2 className={styles.logoText}>Patitas Vetcare</h2>
        </div>

        <h2 className={styles.title}>Bienvenido a Patitas</h2>

        <p className={styles.subtitle}>
          Por favor, inicie sesión para acceder a su portal de gestión de
          mascotas.
        </p>

        <form onSubmit={ingresar}>
          <div className={styles.formGroup}>
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Iniciar Sesión
          </button>
        </form>

        <div className={styles.links}>
          <Link to="/recuperar-password">¿Olvidó su contraseña?</Link>

          <Link to="/registro">¿No tiene una cuenta? Regístrese</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

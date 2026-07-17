import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SEO from "../Components/common/SEO";
import styles from "./registro.module.css";

export default function Registro() {
  const { signup, error, setError } = useAuth();

  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setCargando(true);

    try {
      await signup(nombre, email, password);

      navigate("/login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Este email ya está registrado");
      } else if (err.code === "auth/invalid-email") {
        setError("El email no es válido");
      } else {
        setError("Error al registrarse");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.container}>
      <SEO titulo="Registro" />

      <div className={styles.card}>
        <h1 className={styles.mainTitle}>Crear Cuenta de Usuario</h1>

        <form onSubmit={handleSubmit}>
          <h2 className={styles.sectionTitle}>Información Personal</h2>

          <p className={styles.subtitle}>
            Proporciona tus datos básicos para la cuenta.
          </p>

          <div className={styles.inputGroup}>
            <label>Nombre Completo</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Correo Electrónico</label>
            <input
              type="email"
              placeholder="ejemplo@dominio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <h2 className={styles.sectionTitle}>Seguridad de la Cuenta</h2>

          <p className={styles.subtitle}>Configura tu contraseña segura.</p>

          <div className={styles.inputGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button} disabled={cargando}>
            {cargando ? "Registrando..." : "Registrarse"}
          </button>

          <p className={styles.loginText}>
            ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

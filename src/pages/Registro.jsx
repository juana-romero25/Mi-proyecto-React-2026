import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import styles from "./auth.module.css";

function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.nombre || !form.email || form.password.length < 6) {
      setError("Completa los datos. La contrasena debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      await register(form);
      navigate("/perfil");
    } catch (err) {
      setError("No se pudo crear la cuenta. Revisa la configuracion de Firebase.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Crear cuenta</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nombre
          <input
            className={styles.input}
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            autoComplete="name"
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </label>

        <label className={styles.label}>
          Contrasena
          <input
            className={styles.input}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Creando..." : "Registrarme"}
        </button>
      </form>

      <p className={styles.hint}>
        Ya tienes cuenta?{" "}
        <Link className={styles.link} to="/login">
          Inicia sesion
        </Link>
      </p>
    </section>
  );
}

export default Registro;

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import styles from "./auth.module.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/perfil";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Ingresa email y contrasena.");
      return;
    }

    try {
      setLoading(true);
      await login(form.email, form.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError("No se pudo iniciar sesion. Revisa tus datos o Firebase.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Iniciar sesion</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
            autoComplete="current-password"
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className={styles.hint}>
        No tienes cuenta?{" "}
        <Link className={styles.link} to="/registro">
          Registrate
        </Link>
      </p>
    </section>
  );
}

export default Login;

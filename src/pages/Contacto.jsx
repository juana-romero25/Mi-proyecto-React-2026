import { useState } from "react";
import styles from "./contacto.module.css";

import { Mail, Phone, Send, ShieldCheck } from "lucide-react";

function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [robot, setRobot] = useState(false);
  const [respuesta, setRespuesta] = useState("5");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!robot) {
      alert("Confirmá que no sos un robot");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setForm({
        nombre: "",
        email: "",
        mensaje: "",
      });

      setTimeout(() => setSuccess(false), 2500);
    }, 1500);
  };

  return (
    <section className={styles.contacto}>
      <div className={styles.overlay} />

      <div className={styles.contenido}>
        <h1>Contacto</h1>
        <p>Escribinos y te respondemos a la brevedad 🐾</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Tu email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="mensaje"
            placeholder="Tu mensaje"
            value={form.mensaje}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
          {success && <p className={styles.success}>✔ Mensaje enviado</p>}
        </form>
        <div className={styles.captcha}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={robot}
              onChange={() => setRobot(!robot)}
            />

            <ShieldCheck size={18} />
            No soy un robot
          </label>
          
        </div>
        <div className={styles.info}>
          <p>
            <Mail size={18} /> contacto@patitaspetstore.com
          </p>
          <p>
            <Phone size={18} /> +54 11 1234-5678
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contacto;

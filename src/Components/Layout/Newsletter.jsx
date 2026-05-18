import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./newsletter.module.css";

function Newsletter() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const closed = localStorage.getItem("newsletter_closed_until");
    const now = Date.now();

    if (!closed || now > Number(closed)) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  // ❌ cerrar normal (no mostrar más hoy)
  const handleCloseToday = () => {
    const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("newsletter_closed_until", tomorrow);

    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    alert("¡Suscripción exitosa!");
    setEmail("");
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>

      <div className={`${styles.modal} ${styles.bounceIn}`}>

        <button className={styles.close} onClick={handleClose}>
          <X size={18} />
        </button>

        <h2>📩 Newsletter</h2>
        <p>Recibí novedades y ofertas exclusivas</p>

        <form onSubmit={handleSubmit} className={styles.form}>

          <input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">
            Suscribirme
          </button>

        </form>

        <button className={styles.later} onClick={handleCloseToday}>
          No mostrar más hoy
        </button>

      </div>

    </div>
  );
}

export default Newsletter;
import styles from "./footer.module.css";
import Directorio from "./Directorio";

function Footer() {
  return (
    <footer className={styles.footer}>
      
      {/* 👥 EQUIPO */}
      <section className={styles.team}>
        <h2>Nuestro equipo</h2>
        <Directorio />
      </section>

      {/* 📌 INFO */}
      <section className={styles.info}>
        <p>© 2026 Patitas Pet Store 🐾</p>
        <p>Amamos a tus mascotas ❤️</p>
      </section>

    </footer>
  );
}

export default Footer;
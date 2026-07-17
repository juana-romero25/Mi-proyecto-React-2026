import { useEffect, useState } from "react";
import { obtenerEquipoFirestore } from "../../services/equipoService";
import styles from "./footer.module.css";

function Footer() {
  const [integrantes, setIntegrantes] = useState([]);

  useEffect(() => {
    async function cargarEquipo() {
      try {
        const equipo = await obtenerEquipoFirestore();
        setIntegrantes(equipo);
      } catch (error) {
        console.error("Error al cargar el equipo:", error);
      }
    }

    cargarEquipo();
  }, []);

  return (
    <footer className={styles.footer}>
      <section className={styles.team}>
        <div className={styles.teamInfo}>
          <h2 className={styles.h2}>PATITAS PET-STORE</h2>
          <p>
            Brindamos atención veterinaria de calidad, con amor y compromiso
            hacia tus mascotas.
          </p>
        </div>

        <div className={styles.cardsContainer}>
          {integrantes.map((integrante) => (
            <article key={integrante.id} className={styles.card}>
              <img
                src={integrante.imagen}
                alt={integrante.nombre}
                className={styles.foto}
              />

              <h3>{integrante.nombre}</h3>

              <p className={styles.rol}>{integrante.rol}</p>

              <a
                href={integrante.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedin}
              >
                LinkedIn
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.info}>
        <p>© 2026 Patitas Pet Store. Todos los derechos reservados.</p>
      </section>
    </footer>
  );
}

export default Footer;
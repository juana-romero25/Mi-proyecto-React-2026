import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { Mail } from "lucide-react";
import styles from "./nosotros.module.css";

function Nosotros() {
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
  const cargarEquipo = async () => {
    try {
      const snapshot = await getDocs(collection(db, "equipo"));

      const miembros = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEquipo(miembros);
    } catch (error) {
      console.error(error);
    }
  };

  cargarEquipo();
}, []);

 return (
    <section className={styles.nosotrosContainer}>
      <div className={styles.nosotrosHeader}>
        <h1 className={styles.nosotrosTitulo}>
          Conocé al equipo
          <br />
          detrás del producto
        </h1>

        <p className={styles.nosotrosDescripcion}>
          En Patitas Pet Store, nuestro equipo de profesionales apasionados trabaja diariamente con amor y dedicación para garantizar el bienestar de tu mascota, brindando siempre la mejor atención y asesoramiento personalizado.
        </p>
      </div>

      <div className={styles.equipoGrid}>
        {equipo.map((miembro) => (
          <div className={styles.miembroCard} key={miembro.id}>
            <div className={styles.imagenContainer}>
              <img
                src={miembro.imagen}
                alt={miembro.nombre}
                className={styles.miembroImagen}
              />
            </div>

            <div className={styles.miembroInfo}>
              <h3>{miembro.nombre}</h3>

              <p className={styles.miembroRol}>
                {miembro.rol}
              </p>

              <p className={styles.miembroDescripcion}>
                {miembro.descripcion}
              </p>

              <a
                href={`mailto:${miembro.email}`}
                className={styles.miembroEmail}
              >
                <Mail size={16} />
                {miembro.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Nosotros;
import { useEffect, useState } from "react";
import TarjetaContacto from "./TarjetaContacto";
import styles from "./directorio.module.css";

function Directorio() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/usuarios.json")
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar datos");
        return res.json();
      })
      .then(data => {
        setUsuarios(data);
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  // 👇 renderizado condicional
  if (cargando) return <p>Cargando equipo...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.grid}>
      {usuarios.map(user => (
        <TarjetaContacto key={user.id} {...user} />
      ))}
    </div>
  );
}

export default Directorio;
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import styles from "./gestionCupones.module.css";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function GestionCupones() {
  const [cupones, setCupones] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [descuento, setDescuento] = useState("");
  const [loading, setLoading] = useState(true);

  const cuponesCollection = collection(db, "cupones");

  // Obtener cupones
  const obtenerCupones = async () => {
    try {
      const data = await getDocs(cuponesCollection);
      const lista = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCupones(lista);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCupones();
  }, []);

  // Crear cupón
  const crearCupon = async (e) => {
    e.preventDefault();

    if (!codigo || !descuento) {
      alert("Completa todos los campos");
      return;
    }

    await addDoc(cuponesCollection, {
      codigo: codigo.toUpperCase(),
      descuento: Number(descuento),
    });

    setCodigo("");
    setDescuento("");
    obtenerCupones();
  };

  // Eliminar cupón
  const eliminarCupon = async (id) => {
    const cuponDoc = doc(db, "cupones", id);
    await deleteDoc(cuponDoc);
    obtenerCupones();
  };

  return (
    <div className={styles.container}>
      {/* ⬅️ BOTÓN PARA VOLVER AL PANEL DE ADMIN */}
      <div className={styles.backContainer}>
        <Link to="/perfil" className={styles.backButton}>
          <ArrowLeft size={18} />
          Volver al Panel
        </Link>
      </div>

      <h1>Gestión de Cupones</h1>

      <form onSubmit={crearCupon} className={styles.form}>
        <input
          type="text"
          placeholder="Código del cupón"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <input
          type="number"
          placeholder="Porcentaje descuento"
          value={descuento}
          onChange={(e) => setDescuento(e.target.value)}
        />

        <button type="submit">Crear cupón</button>
      </form>

      <h2>Cupones disponibles</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          {cupones.map((cupon) => (
            <div key={cupon.id} className={styles.card}>
              <p>
                Código:
                <strong>{cupon.codigo}</strong>
              </p>

              <p>
                Descuento:
                {cupon.descuento}%
              </p>

              <button onClick={() => eliminarCupon(cupon.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GestionCupones;
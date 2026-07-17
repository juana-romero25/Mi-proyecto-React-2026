import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import Item from "../Components/Items/Item";
import { db } from "../firebase/Firebase";

import styles from "./productos.module.css";


function Productos() {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    const obtenerProductos = async () => {

      try {

        const productosRef = collection(db, "productos");

        const snapshot = await getDocs(productosRef);


        const productosFirebase = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));


        setProductos(productosFirebase);


      } catch (err) {

        setError("Error al cargar productos");

        console.log(err);

      } finally {

        setLoading(false);

      }

    };


    obtenerProductos();

  }, []);



  if (loading)
    return <h2 className={styles.loading}>Cargando productos...</h2>;


  if (error)
    return <h2 className={styles.error}>{error}</h2>;



  return (

    <div className={styles.container}>

      <h2 className={styles.title}>
        Productos
      </h2>


      <div className={styles.grid}>

        {
          productos.map((p) => (

            <Item 
              key={p.id}
              {...p}
            />

          ))
        }

      </div>

    </div>

  );

}


export default Productos;
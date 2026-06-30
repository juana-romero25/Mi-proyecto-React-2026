// Importaciones clave para obtener un solo documento
import { getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebase/config';//revisa esta ruta para que sea correcta

//cambiar el useEffect
useEffect(() => {
        if (!id) return;

        const queryId = query(
            collection(db, "productos"),
            where("id", "==", Number(id))
        );

        getDocs(queryId)
            .then((resp) => {
                if (resp.empty) {
                    console.log("No se encontró el producto");
                    return;
                }

                setProducto(...resp.docs[0].data());
            })
            .catch((error) => {
                console.error("Error al cargar el producto:", error);
            });

    }, [id]);
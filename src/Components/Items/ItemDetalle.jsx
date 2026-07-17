import { getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebase/config';

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
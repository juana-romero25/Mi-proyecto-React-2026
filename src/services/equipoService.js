import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/Firebase";

const EQUIPO_COLLECTION = "equipo";

export async function obtenerEquipoFirestore() {
  const equipoQuery = query(
    collection(db, EQUIPO_COLLECTION),
    orderBy("nombre", "asc")
  );

  const snapshot = await getDocs(equipoQuery);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
}
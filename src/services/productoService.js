import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/Firebase";


const PRODUCTOS_COLLECTION = "productos";

export async function obtenerProductosFirestore() {
  const productosQuery = query(
    collection(db, PRODUCTOS_COLLECTION),
    orderBy("nombre", "asc"),
  );
  const snapshot = await getDocs(productosQuery);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
}

export async function crearProducto(producto) {
  const docRef = await addDoc(collection(db, PRODUCTOS_COLLECTION), producto);
  return { id: docRef.id, ...producto };
}

export async function actualizarProducto(id, producto) {
  await updateDoc(doc(db, PRODUCTOS_COLLECTION, id), producto);
  return { id, ...producto };
}

export async function eliminarProducto(id) {
  await deleteDoc(doc(db, PRODUCTOS_COLLECTION, id));
}

export async function obtenerProductosLocales() {
  const respuesta = await fetch("/data/productos.json");

  if (!respuesta.ok) {
    throw new Error("No se pudo cargar el catalogo local");
  }

  return respuesta.json();
}

export async function obtenerCatalogo() {
  try {
    const productosFirestore = await obtenerProductosFirestore();
    return productosFirestore.length > 0
      ? productosFirestore
      : await obtenerProductosLocales();
  } catch (error) {
    console.warn("Firestore no disponible, usando catalogo local.", error);
    return obtenerProductosLocales();
  }
}

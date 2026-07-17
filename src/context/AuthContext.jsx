import { createContext, useContext, useEffect, useState } from "react";

import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase/Firebase";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Detectar usuario logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      try {
        if (usuario) {
          const usuarioRef = doc(db, "usuarios", usuario.uid);

          const usuarioSnap = await getDoc(usuarioRef);

          if (usuarioSnap.exists()) {
            setUser({
              uid: usuario.uid,
              email: usuario.email,
              ...usuarioSnap.data(),
            });
          } else {
            // Si no existe el documento en Firestore
            // se crea automáticamente con rol usuario

            const nuevoUsuario = {
              email: usuario.email,
              rol: "usuario",
            };

            await setDoc(usuarioRef, nuevoUsuario);

            setUser({
              uid: usuario.uid,
              ...nuevoUsuario,
            });
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Registro
  const signup = async (nombre, email, password) => {
    try {
      setError("");

      const credenciales = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const usuario = credenciales.user;

      await setDoc(doc(db, "usuarios", usuario.uid), {
        nombre: nombre,
        email: usuario.email,
        rol: "usuario",
      });

      return credenciales;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        logout,
        error,
        setError,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

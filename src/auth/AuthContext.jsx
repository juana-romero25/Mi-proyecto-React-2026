import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/Firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setLoadingAuth(false);
    });

    return unsubscribe;
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const register = async ({ nombre, email, password }) => {
    const credencial = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    if (nombre) {
      await updateProfile(credencial.user, { displayName: nombre });
    }

    setUsuario({ ...credencial.user, displayName: nombre });
    return credencial;
  };

  const logout = () => signOut(auth);

  const value = useMemo(
    () => ({
      usuario,
      loadingAuth,
      isAuthenticated: Boolean(usuario),
      login,
      register,
      logout,
    }),
    [usuario, loadingAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return context;
}

import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";



function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.rol !== "administrador") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;

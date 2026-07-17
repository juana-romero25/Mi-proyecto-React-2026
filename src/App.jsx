import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import ProtectedRoute from "./Components/common/ProtectedRoute";
import AdminRoute from "./Components/common/AdminRoute";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import Admin from "./pages/Admin";
import Nosotros from "./pages/Nosotros";
import GestionProductos from "./Components/Admin/GestionProductos";
import GestionCupones from "./Components/Admin/GestionCupones";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/productos" element={<Productos />} />

        <Route path="/producto/:id" element={<ProductoDetalle />} />

        <Route path="/carrito" element={<Carrito />} />

        <Route path="/contacto" element={<Contacto />} />

        <Route path="/nosotros" element={<Nosotros />} />

        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        {/* Usuario logueado */}

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        {/* Administrador */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/productos"
          element={
            <AdminRoute>
              <GestionProductos />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/cupones"
          element={
            <AdminRoute>
              <GestionCupones />
            </AdminRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;

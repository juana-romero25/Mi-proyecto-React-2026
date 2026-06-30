import {Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import FormularioContainer from "./Components/Formulario/FormularioContainer";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/gestion" element={<Gestion />} />
         <Route path="/alta" element={<FormularioContainer />} />
         <Route path="/contacto" element={<Contacto />} />
           <Route path="/productosBD" element={<ProductosBD />} />
      </Routes>
    </Layout>
  );
}

export default App;

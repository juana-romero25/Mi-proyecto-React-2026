import { useState } from "react";
import FormularioProducto from "./FormularioProducto";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    descripcion: "",
    imagen: "",
  });
  const [imagenFile, setImagenFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm((prev) => ({ ...prev, [name]: value }));
  };

  const manejarCambioImagen = (evento) => {
    setImagenFile(evento.target.files[0]);
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setError("");
    setMensaje("");

    if (!datosForm.nombre.trim()) {
      setError("El nombre del producto es obligatorio.");
      return;
    }
    if (!datosForm.precio || Number(datosForm.precio) <= 0) {
      setError("El precio debe ser mayor a 0.");
      return;
    }

    setLoading(true);

    try {
      let imagenUrl = datosForm.imagen;

      // Si hay archivo de imagen, subirla a Imgbb
      if (imagenFile) {
        const apiKey = "1ac81cf4c3348932a5148cdffe3dfaee";
        const formData = new FormData();
        formData.append("image", imagenFile);

        const respuestaImgbb = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          { method: "POST", body: formData }
        );
        const datosImgbb = await respuestaImgbb.json();

        if (!datosImgbb.success) {
          throw new Error("Error al subir la imagen a Imgbb.");
        }
        imagenUrl = datosImgbb.data.url;
      }

      const productoCompleto = {
        nombre: datosForm.nombre.trim(),
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock) || 0,
        categoria: datosForm.categoria.trim(),
        descripcion: datosForm.descripcion.trim(),
        imagen: imagenUrl,
      };

      await addDoc(collection(db, "productos"), productoCompleto);

      setMensaje("✅ Producto agregado con éxito.");
      setDatosForm({ nombre: "", precio: "", stock: "", categoria: "", descripcion: "", imagen: "" });
      setImagenFile(null);
    } catch (err) {
      console.error(err);
      setError("Hubo un error al guardar el producto. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarImagen={manejarCambioImagen}
      loadingImg={loading}
      mensaje={mensaje}
      error={error}
    />
  );
}

export default FormularioContainer;

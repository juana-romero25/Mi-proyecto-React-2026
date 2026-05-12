import { useState } from "react";
import Formulario from "./Formulario";

function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });

  const [loadingImg, setLoadingImg] = useState(false);

  // 🧠 manejar inputs normales
  const manejarCambio = (e) => {
    setDatosForm({
      ...datosForm,
      [e.target.name]: e.target.value,
    });
  };

  // 📤 subir imagen a ImgBB
  const subirImagen = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = "TU_API_KEY_AQUI";

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.data.url;
  };

  // 📸 manejar selección de imagen
  const manejarImagen = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingImg(true);

    try {
      const url = await subirImagen(file);

      setDatosForm((prev) => ({
        ...prev,
        imagen: url,
      }));
    } catch (error) {
      console.error("Error subiendo imagen", error);
    } finally {
      setLoadingImg(false);
    }
  };

  // ✅ enviar formulario
  const manejarEnvio = (e) => {
    e.preventDefault();

    console.log("Producto completo:", datosForm);

    // 👉 después podés guardar en JSON server o API

    setDatosForm({
      nombre: "",
      precio: "",
      imagen: "",
    });
  };

  return (
    <Formulario
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarImagen={manejarImagen}
      loadingImg={loadingImg}
    />
  );
}

export default FormularioContainer;
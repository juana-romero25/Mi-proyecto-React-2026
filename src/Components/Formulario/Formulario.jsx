function Formulario({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarImagen,
  loadingImg,
}) {
  return (
    <form onSubmit={manejarEnvio}>
      
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={datosForm.nombre}
        onChange={manejarCambio}
      />

      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={datosForm.precio}
        onChange={manejarCambio}
      />

      {/* 📸 subir imagen */}
      <input
        type="file"
        accept="image/*"
        onChange={manejarImagen}
      />

      {/* ⏳ loading */}
      {loadingImg && <p>Subiendo imagen...</p>}

      {/* 👀 preview */}
      {datosForm.imagen && (
        <img
          src={datosForm.imagen}
          alt="preview"
          width="150"
        />
      )}

      <button type="submit">Guardar producto</button>
    </form>
  );
}

export default Formulario;
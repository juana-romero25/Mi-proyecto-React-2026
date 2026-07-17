import styles from "./formulario.module.css";

function FormularioProducto({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarImagen,
  loadingImg,
  mensaje,
  error,
}) {
  return (
    <form onSubmit={manejarEnvio} className={styles.form} noValidate>
      <h2 className={styles.titulo}>Alta de Producto</h2>

      <div className={styles.campo}>
        <label>Nombre *</label>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={datosForm.nombre}
          onChange={manejarCambio}
        />
      </div>

      <div className={styles.grid2}>
        <div className={styles.campo}>
          <label>Precio *</label>
          <input
            type="number"
            name="precio"
            placeholder="0.00"
            min="0.01"
            step="0.01"
            value={datosForm.precio}
            onChange={manejarCambio}
          />
        </div>

        <div className={styles.campo}>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="0"
            min="0"
            value={datosForm.stock}
            onChange={manejarCambio}
          />
        </div>
      </div>

      <div className={styles.campo}>
        <label>Categoría</label>
        <input
          type="text"
          name="categoria"
          placeholder="Ej: Alimento, Juguete..."
          value={datosForm.categoria}
          onChange={manejarCambio}
        />
      </div>

      <div className={styles.campo}>
        <label>Descripción</label>
        <textarea
          name="descripcion"
          placeholder="Descripción breve..."
          value={datosForm.descripcion}
          onChange={manejarCambio}
          rows={3}
        />
      </div>

      <div className={styles.campo}>
        <label>URL de imagen (opcional)</label>
        <input
          type="url"
          name="imagen"
          placeholder="https://..."
          value={datosForm.imagen}
          onChange={manejarCambio}
        />
      </div>

      <div className={styles.campo}>
        <label>O subí una imagen</label>
        <input type="file" accept="image/*" onChange={manejarImagen} />
      </div>

      {loadingImg && (
        <p className={styles.cargando}>⏳ Guardando producto...</p>
      )}

      {datosForm.imagen && (
        <img
          src={datosForm.imagen}
          alt="preview"
          className={styles.preview}
          onError={(e) => (e.target.style.display = "none")}
        />
      )}

      {error && <p className={styles.error}>{error}</p>}
      {mensaje && <p className={styles.exito}>{mensaje}</p>}

      <button type="submit" className={styles.btn} disabled={loadingImg}>
        {loadingImg ? "Guardando..." : "Guardar Producto"}
      </button>
    </form>
  );
}

export default FormularioProducto;

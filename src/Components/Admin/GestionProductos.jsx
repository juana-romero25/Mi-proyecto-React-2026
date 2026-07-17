import { useState, useEffect } from "react";
import {
  obtenerProductosFirestore,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../../services/productoService";
import styles from "./gestion.module.css";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ESTADO_INICIAL = {
  nombre: "",
  categoria: "",
  precio: "",
  stock: "",
  imagen: "",
  descripcion: "",
};

function GestionProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Formulario
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [editandoId, setEditandoId] = useState(null);
  const [erroresForm, setErroresForm] = useState({});

  // Modal confirmación de eliminación
  const [modalEliminar, setModalEliminar] = useState(null); // guarda el id a eliminar

  // Toast feedback
  const [toast, setToast] = useState("");

  const mostrarToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await obtenerProductosFirestore();
      setProductos(data);
    } catch (err) {
      setError("Error al cargar productos. Verificá la conexión con Firebase.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const validar = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = "El nombre es obligatorio.";
    if (!form.precio || Number(form.precio) <= 0)
      errs.precio = "El precio debe ser mayor a 0.";
    if (form.stock === "" || Number(form.stock) < 0)
      errs.stock = "El stock no puede ser negativo.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErroresForm((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validar();
    if (Object.keys(errs).length > 0) {
      setErroresForm(errs);
      return;
    }

    const productoData = {
      nombre: form.nombre.trim(),
      categoria: form.categoria.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
      imagen: form.imagen.trim(),
      descripcion: form.descripcion.trim(),
    };

    try {
      setGuardando(true);
      if (editandoId) {
        await actualizarProducto(editandoId, productoData);
        mostrarToast("✅ Producto actualizado correctamente.");
      } else {
        await crearProducto(productoData);
        mostrarToast("✅ Producto creado correctamente.");
      }
      setForm(ESTADO_INICIAL);
      setEditandoId(null);
      await cargarProductos();
    } catch (err) {
      setError("Error al guardar el producto. Intentá de nuevo.");
      console.error(err);
    } finally {
      setGuardando(false);
    }
  };

  const handleEditar = (prod) => {
    setForm({
      nombre: prod.nombre || "",
      categoria: prod.categoria || "",
      precio: prod.precio || "",
      stock: prod.stock || "",
      imagen: prod.imagen || "",
      descripcion: prod.descripcion || "",
    });
    setEditandoId(prod.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelarEdicion = () => {
    setForm(ESTADO_INICIAL);
    setEditandoId(null);
    setErroresForm({});
  };

  const confirmarEliminar = (id) => {
    setModalEliminar(id);
  };

  const handleEliminar = async () => {
    try {
      await eliminarProducto(modalEliminar);
      setProductos((prev) => prev.filter((p) => p.id !== modalEliminar));
      mostrarToast("🗑️ Producto eliminado.");
    } catch (err) {
      setError("Error al eliminar el producto.");
      console.error(err);
    } finally {
      setModalEliminar(null);
    }
  };

  return (
    <div className={styles.page}>
      {/* ⬅️ BOTÓN PARA VOLVER AL PANEL DE ADMIN */}
      <div className={styles.backContainer}>
        <Link to="/perfil" className={styles.backButton}>
          <ArrowLeft size={18} />
          Volver al Panel
        </Link>
      </div>

      <h1 className={styles.titulo}>Panel de Gestión de Productos</h1>

      {/* Toast */}
      {toast && <div className={styles.toast}>{toast}</div>}

      {/* Error global */}
      {error && <p className={styles.errorGlobal}>{error}</p>}

      {/* ── FORMULARIO ── */}
      <section className={styles.seccion}>
        <h2 className={styles.subtitulo}>
          {editandoId ? " Editar Producto" : " Agregar Producto"}
        </h2>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.grid2}>
            <div className={styles.campo}>
              <label>Nombre *</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre del producto"
              />
              {erroresForm.nombre && (
                <span className={styles.errorCampo}>{erroresForm.nombre}</span>
              )}
            </div>

            <div className={styles.campo}>
              <label>Categoría</label>
              <input
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                placeholder="Ej: Alimento, Juguete..."
              />
            </div>

            <div className={styles.campo}>
              <label>Precio *</label>
              <input
                name="precio"
                type="number"
                min="0.01"
                step="0.01"
                value={form.precio}
                onChange={handleChange}
                placeholder="0.00"
              />
              {erroresForm.precio && (
                <span className={styles.errorCampo}>{erroresForm.precio}</span>
              )}
            </div>

            <div className={styles.campo}>
              <label>Stock *</label>
              <input
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
              />
              {erroresForm.stock && (
                <span className={styles.errorCampo}>{erroresForm.stock}</span>
              )}
            </div>
          </div>

          <div className={styles.campo}>
            <label>URL de Imagen</label>
            <input
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              placeholder="https://..."
            />
            {form.imagen && (
              <img
                src={form.imagen}
                alt="preview"
                className={styles.preview}
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </div>

          <div className={styles.campo}>
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Descripción breve del producto..."
              rows={3}
            />
          </div>

          <div className={styles.botonesForm}>
            <button type="submit" className={styles.btnGuardar} disabled={guardando}>
              {guardando ? "Guardando..." : editandoId ? "Actualizar" : "Crear Producto"}
            </button>
            {editandoId && (
              <button
                type="button"
                className={styles.btnCancelar}
                onClick={handleCancelarEdicion}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      {/* ── LISTA ── */}
      <section className={styles.seccion}>
        <h2 className={styles.subtitulo}>📦 Productos en Firestore</h2>

        {loading ? (
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner} />
            <p>Cargando productos...</p>
          </div>
        ) : productos.length === 0 ? (
          <p className={styles.vacio}>No hay productos cargados aún.</p>
        ) : (
          <div className={styles.tabla}>
            <div className={styles.tablaHeader}>
              <span>Imagen</span>
              <span>Nombre</span>
              <span>Categoría</span>
              <span>Precio</span>
              <span>Stock</span>
              <span>Acciones</span>
            </div>

            {productos.map((prod) => (
              <div key={prod.id} className={styles.tablaFila}>
                <span>
                  {prod.imagen ? (
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      className={styles.miniImg}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    "—"
                  )}
                </span>
                <span>{prod.nombre}</span>
                <span>{prod.categoria || "—"}</span>
                <span>${Number(prod.precio).toFixed(2)}</span>
                <span>{prod.stock}</span>
                <span className={styles.acciones}>
                  <button
                    className={styles.btnEditar}
                    onClick={() => handleEditar(prod)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.btnEliminar}
                    onClick={() => confirmarEliminar(prod.id)}
                  >
                    Eliminar
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {modalEliminar && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>¿Eliminar producto?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className={styles.modalBotones}>
              <button className={styles.btnEliminar} onClick={handleEliminar}>
                Sí, eliminar
              </button>
              <button
                className={styles.btnCancelar}
                onClick={() => setModalEliminar(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionProductos;
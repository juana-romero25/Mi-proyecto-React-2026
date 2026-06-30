import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import FormularioContainer from '../FormularioProducto/FormularioContainer';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Gestion = () => {
    const [productos, setProductos] = useState([]);

    const estadoInicialForm = {
        nombre: "",
        categoria: "",
        precio: 0,
        stock: 0,
        imagen: ""
    };

    useEffect(() => {
        const cargarProductos = async () => {
            const productosRef = collection(db, "productos"); //Ajustar "productos" al nombre de tu colección
            const resp = await getDocs(productosRef);
            setProductos(
                resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };
        cargarProductos();
    }, []);

    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto ? ");
        if (confirmacion) {
            const docRef = doc(db, "productos", id);
            await deleteDoc(docRef);
            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setProductos(productos.filter(prod => prod.id !== id));
            alert("Producto eliminado.");
        }
    };

    return (
        <div>
            <h2>Gestión de Productos</h2>
            <hr />
            <FormularioContainer />
            <hr />
            <h3>Lista de Productos</h3>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        {prod.nombre} - ${prod.precio}
                        {/*acá agregamos los botones de acción */}
                        <button 
	                        onClick={() => handleDelete(prod.id)} 
	                        style={{ marginLeft: '10px' }}
	                      >
		                      Eliminar
		                    </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Gestion;
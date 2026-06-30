import { useState } from "react";
import FormularioProducto from "./FormularioProducto";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
    });

    // 1. Nuevo estado para el archivo de imagen
    const [imagenFile, setImagenFile] = useState(null);

    //Ejercicio Clase 6
    //Paso 1
    const [loading, setLoading] = useState(false);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    // 2. Nueva función para manejar el cambio del input de tipo "file"
    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        // Validamos que el usuario haya seleccionado una imagen
        if (!imagenFile) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }

        //Ejercicio Clase 6
        //Paso 2
        setLoading(true);
        console.log("Loading...");

        // --- Lógica para subir la imagen a Imgbb ---
        const apiKey = '1ac81cf4c3348932a5148cdffe3dfaee'; // 🚨 ¡Reemplazá esto con tu clave!
        const formData = new FormData();
        formData.append('image', imagenFile);

        try {
            console.log("Subiendo imagen a Imgbb...");

            const respuestaImgbb = await
                fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });

            const datosImgbb = await respuestaImgbb.json();

            if (datosImgbb.success) {
                console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);

                // Unimos la URL de la imagen con el resto de los datos del formulario
                const productoCompleto = {
                    ...datosForm,
                    // Agregamos la URL obtenida
                    imagen: datosImgbb.data.url
                };

                // Por el momento hacemos un console.log
                console.log('Enviando producto a Firebase:',
                    productoCompleto);

                // Obtenemos la instancia de la base de datos
                const db = getFirestore();
                // Apuntamos a la colección "productos" (si no existe, se crea)
                const productosCollection = collection(db, "productos");
                // Agregamos el nuevo documento a la colección
                await addDoc(productosCollection, productoCompleto);


            } else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        }

        //Ejercicio Clase 6
        //Paso 3
        finally {
            //Desactivar loading
            setLoading(false);
        }
    };

    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
            //Ejercicio Clase 6
            //Paso 4
            loading={loading}
        />
    );
}

export default FormularioContainer;
# Patitas Pet Store

E-commerce desarrollado con React y Firebase como proyecto final del curso "Primeros Pasos con ReactJS".

## Requisitos

* Node.js 18 o superior
* Cuenta en Firebase (Firestore + Auth)
* Cuenta en ImgBB (para almacenamiento de imágenes)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd app-react
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   # Firebase
  apiKey: "AIzaSyDlRuyGySuqnkZn2NZDi3Bo_R4o5zbOBiA",
  authDomain: "pet-store-01.firebaseapp.com",
  projectId: "pet-store-01",
  storageBucket: "pet-store-01.firebasestorage.app",
  messagingSenderId: "744037178522",
  appId: "1:744037178522:web:190757792822ade0539323"

   # ImgBB
   VITE_IMGBB_API_KEY=bf480c1d9b2474553a4826d33edbded5
   ```

4. Configurar Firebase:
   * Ir a [Firebase Console](https://console.firebase.google.com/).
   * Crear un proyecto.
   * Habilitar **Firestore Database** en modo prueba.
   * Habilitar **Authentication** con el método de Correo electrónico/Contraseña.
   * Copiar las credenciales al archivo `.env`.

5. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Scripts Disponibles

* `npm run dev`: Inicia el servidor de desarrollo.
* `npm run build`: Compila la aplicación para producción.
* `npm run preview`: Vista previa local de la compilación de producción.
* `npm run lint`: Ejecuta el linter para análisis de código.
* 
  ## Funcionalidades

* **Carrito de compras:** Implementado con Context API para persistencia y control de estado global.
* **Autenticación:** Registro e inicio de sesión de usuarios mediante Firebase Auth.
* **Panel de Administración (CRUD):** Gestión de productos, miembros de equipo, categorías y cupones de descuento.
* **Diseño Responsivo:** Interfaz adaptada a dispositivos móviles y de escritorio.
* **SEO:** Integración de metatags con React Helmet.
* **Gestión de Imágenes:** Carga dinámica a través de la API de ImgBB.

## Despliegue

Para desplegar en plataformas como Vercel o Netlify:
1. Conectar el repositorio de GitHub.
2. Configurar las variables de entorno (`.env`) en la plataforma.
3. Comando de build: `npm run build`
4. Directorio de salida: `dist`

## Tecnologías Utilizadas

* React 19
* Vite
* Firebase (Firestore + Authentication)
* React Router DOM
* React Icons
* React Helmet Async

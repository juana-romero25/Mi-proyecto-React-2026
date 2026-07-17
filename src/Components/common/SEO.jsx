import { Helmet } from "react-helmet-async";

export default function SEO({ titulo, descripcion }) {
  const nombreSitio = "Patitas Pet Store";
  const tituloCompleto = titulo ? `${titulo} | ${nombreSitio}` : nombreSitio;

  return (
    <Helmet>
      <title>{tituloCompleto}</title>
      <meta
        name="description"
        content={descripcion || "Tienda online de productos para mascotas"}
      />
      <meta property="og:title" content={tituloCompleto} />
      <meta
        property="og:description"
        content={descripcion || "Tienda online de productos para mascotas"}
      />
    </Helmet>
  );
}

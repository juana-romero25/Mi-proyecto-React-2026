import styles from "./tarjeta.module.css";

function TarjetaContacto({ nombre, puesto, email, foto }) {
  return (
    <div className={styles.card}>
      <img src={foto} alt={nombre} />

      <h4>{nombre}</h4>
      <p>{puesto}</p>

      <div className={styles.email}>
        📧 <span>{email}</span>
      </div>
    </div>
  );
}

export default TarjetaContacto;
import { useState } from "react";
import styles from "./contacto.module.css";

import { Mail, Phone, Send, ShieldCheck } from "lucide-react";
import {
  Clock3,
  MapPin,
  CalendarDays,
  CircleOff,
} from "lucide-react";

function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [robot, setRobot] = useState(false);
  const [respuesta, setRespuesta] = useState("5");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!robot) {
      alert("Confirmá que no sos un robot");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setForm({
        nombre: "",
        email: "",
        mensaje: "",
      });

      setTimeout(() => setSuccess(false), 2500);
    }, 1500);
  };

  return (
    <>
    <section className={styles.contacto}>
      <div className={styles.overlay} />

      <div className={styles.contenido}>
        <h1>Contacto</h1>
        <p>Escribinos y te respondemos a la brevedad 🐾</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Tu email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="mensaje"
            placeholder="Tu mensaje"
            value={form.mensaje}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
          {success && <p className={styles.success}>✔ Mensaje enviado</p>}
        </form>
        <div className={styles.captcha}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={robot}
              onChange={() => setRobot(!robot)}
            />

            <ShieldCheck size={18} />
            No soy un robot
          </label>
          
        </div>
        <div className={styles.info}>
          <p>
            <Mail size={18} /> contacto@patitaspetstore.com
          </p>
          <p>
            <Phone size={18} /> +54 11 1234-5678
          </p>
        </div>
      </div>
    </section>

    <section className={styles.infoSection}>

  <div className={styles.horariosCard}>
    <h2>
      <Clock3 size={28} />
      Horarios de Atención
    </h2>

    <div className={styles.horarioItem}>
      <CalendarDays size={22} />
      <div>
        <strong>Lunes a Viernes</strong>
        <p>09:00 - 18:00</p>
      </div>
    </div>

    <div className={styles.horarioItem}>
      <CalendarDays size={22} />
      <div>
        <strong>Sábados</strong>
        <p>10:00 - 14:00</p>
      </div>
    </div>

    <div className={styles.horarioItem}>
      <CircleOff size={22} />
      <div>
        <strong>Domingos</strong>
        <p>Cerrado</p>
      </div>
    </div>

    <div className={styles.direccion}>
      <MapPin size={24}/>
      <span>
        Av. Siempre Viva 1234<br/>
        Buenos Aires, Argentina
      </span>
    </div>

  </div>


  <div className={styles.mapaCard}>

    <h2>
      <MapPin size={28}/>
      Encuéntranos aquí
    </h2>

    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.3201219100333!2d-58.36075158806656!3d-34.82304296900227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32b45ba029a7b%3A0x2ac9c4b8949a4f22!2sLuis%20Viale%201942%2C%20B1849IFJ%20Burzaco%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2sus!4v1784266412350!5m2!1ses!2sus"></iframe>
  </div>

</section>
</>
  );
}

export default Contacto;

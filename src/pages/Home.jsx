import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Truck, CreditCard, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./home.module.css";

const slides = [
  {
    id: 1,
    imagen: "/multimedia/banner1.webp",
  },
  {
    id: 2,
    imagen: "/multimedia/banner2.webp",
  },
  {
    id: 3,
    imagen: "/multimedia/banner3.webp",
  },
];

function Home() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  // autoplay
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [index, paused]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // swipe mobile
  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;

    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  return (
    <div
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* SLIDER */}
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div className={styles.slide} key={slide.id}>
            <img src={slide.imagen} alt="banner" />
            <div className={styles.overlay}></div>
          </div>
        ))}
      </div>

      {/* BOTONES */}
      <button className={styles.prev} onClick={prevSlide}>
        <ChevronLeft size={36} />
      </button>

      <button className={styles.next} onClick={nextSlide}>
        <ChevronRight size={36} />
      </button>

      {/* DOTS */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? styles.active : ""}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {/* BENEFICIOS */}
      <section className={styles.beneficios}>
        <div className={styles.item}>
          <span className={styles.icon}>
            <Truck size={32} />
          </span>
          <div>
            <h3>Enviamos tu compra</h3>
            <p>Rápido a todo el país</p>
          </div>
        </div>

        <div className={styles.item}>
          <span className={styles.icon}>
            <CreditCard size={32} />
          </span>
          <div>
            <h3>Pagá como quieras</h3>
            <p>Tarjetas de crédito o efectivo</p>
          </div>
        </div>

        <div className={styles.item}>
          <span className={styles.icon}>
            <ShieldCheck size={32} />
          </span>
          <div>
            <h3>Comprá con seguridad</h3>
            <p>Tus datos siempre protegidos</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
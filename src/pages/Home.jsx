import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
      {/* SLIDES */}
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div className={styles.slide} key={slide.id}>
            <img src={slide.imagen} alt={slide.titulo} />

            <div className={styles.overlay}>
              <h1>{slide.titulo}</h1>
              <p>{slide.texto}</p>

             
            </div>
          </div>
        ))}
      </div>

      {/* BOTONES */}
      <button className={styles.prev} onClick={prevSlide}>‹</button>
      <button className={styles.next} onClick={nextSlide}>›</button>

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
    </div>
  );
}

export default Home;
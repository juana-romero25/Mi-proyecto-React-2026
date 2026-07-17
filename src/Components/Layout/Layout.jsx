import Header from "./Header";
import Footer from "./Footer";
import NavBar from "../navbar/NavBar";
import styles from "./layout.module.css";
import Newsletter from "../Layout/Newsletter";
import Productos from "../../pages/Productos";
import Promo from "../../pages/Promo";

function Layout({ children }) {
  return (
    <>
      <Header />
      <NavBar />
      <main className={styles.main}>{children}</main>
      <Promo />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Layout;

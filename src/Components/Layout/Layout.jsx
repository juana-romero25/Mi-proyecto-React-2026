import Header from "./Header";
import Footer from "./Footer";
import NavBar from "../navbar/NavBar";
import styles from "./layout.module.css";
import Newsletter from "../Layout/Newsletter";

function Layout({ children }) {
  return (
    <>
      <Header />
      <NavBar />
      <main className={styles.main}>{children}</main>
      <Newsletter/>
      <Footer />
    </>
  );
}

export default Layout;
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "../navbar/NavBar";

function Layout({ children }) {
  return (
    <>
      <Header />
      <NavBar />
      <main style={{ padding: "20px" }}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
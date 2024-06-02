import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.js";
import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;

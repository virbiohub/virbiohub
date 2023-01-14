import React, { useEffect } from "react";
import Routes from "./routes/Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import generateId from "./utils/helpers/generateId";
import "./App.css";

function App() {
  useEffect(() => {
    generateId();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Routes />

      <Footer />
    </div>
  );
}

export default App;

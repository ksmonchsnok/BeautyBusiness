import React from "react";
import "./style.css";
import Route from "../src/route/route.js";
import Footer from "./components/footer/footer";

export default function App() {
  return (
    <div id="App" className="App">
      <div id="page-container">
        <header>
        <div id="content-wrap">

          <Route />
          </div>
        </header>
        <footer id="footer">
          <Footer />
        </footer>
    </div>
    </div>
  );
}

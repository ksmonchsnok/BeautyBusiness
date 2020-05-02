import React from "react";
import "./style.css";
import Route from "../src/route/route.js";
import Footer from "./components/footer/footer";

export default function App() {
  return (
    <div id="App">
      <div id="page-container">
        <Route />
        <div id="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import "./style.css";
import { BrowserRouter } from "react-router-dom";
import Route from "../src/route/route.js";
import Footer from "./components/footer/footer";

export default function App() {
  return (
    <div id="App" className="App">
       <BrowserRouter> 
       <header>
        <Route />
      </header>
      <footer>
        <Footer />
      </footer>
      </BrowserRouter>
    </div>
  );
}

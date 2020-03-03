import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

const AppProject = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(<AppProject />, document.getElementById("root"));
serviceWorker.unregister();

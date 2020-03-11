
import React, { Component } from "react";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../../pages/login/login.js";
import Menu from "../menu/menu.js";

export default class header extends Component {
  render() {
    return (
      <div id="Header">
        <Login />

        <div className="head">
          <div className="container">
            <Menu />
          </div>
        </div>
      </div>
    );
  }
}

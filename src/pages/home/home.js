import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/navbar/navbar.js";
// import Headder from "../../components/header/header";
import Position from "../nearby/position.js";
import Intro from "../../components/intro/intro.js";
import Web from "../web/web.js";
import FindPosition from "../nearby/find-position.js";
import Recommend from "../../components/recommend/recommend.js";
import Promotions from "../../components/recommend/promote.js";

export default class Home extends Component {
  render() {
    return (
      <div id="Home-page" history={this.props.history}>
        <Navbar />
        <Intro />

        <div className="container" style={{ marginTop: "1rem" }}>
          <Recommend history={this.props.history} />
          <FindPosition history={this.props.history} />
          <Web />
          <Position />

          <Promotions />
        </div>
      </div>
    );
  }
}

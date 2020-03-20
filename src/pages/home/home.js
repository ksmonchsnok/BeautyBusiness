import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header/header.js";
import Recommend from "../../components/recommend/recommend2.js";

export default class Home extends Component {
  render() {
    return (
      <div id="Home-page" history={this.props.history}>
        <Header />
        <div className="container" style={{ marginTop: "10em" }}>
          <Recommend history={this.props.history} />
        </div>
      </div>
    );
  }
}

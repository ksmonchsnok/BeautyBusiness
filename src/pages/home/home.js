import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header/header.js";
import Recommend from "../../components/recommend/recommend.js";
import Footer from "../../components/footer/footer.js";

export default class Home extends Component {
  render() {
    return (
      <div id="Home-page">
        {/* <div className="jumbotron jumbotron-fluid" style={{background:"transparent",marginTop:"-3.5rem"}}> */}
        <Header />
        <div className="container-fluid" style={{ marginTop: "10em" }}>
          <Recommend />
        </div>
        <Footer/>
      </div>
    );
  }
}

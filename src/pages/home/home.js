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
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import { BackTop } from "antd";
import "antd/dist/antd.css";
import { UpOutlined } from "@ant-design/icons";

export default class Home extends Component {
  render() {
    const style = {
      height: 40,
      width: 40,
      lineHeight: "40px",
      borderRadius: 4,
      backgroundColor: "#F69220",
      color: "#fff",
      textAlign: "center",
      fontSize: 14,
    };

    return (
      <div
        id="Home-page"
        history={this.props.history}
        style={{ marginBottom: "6rem" }}
      >
        <Navbar />
        <Intro />
        <Position />
        <div style={{ height: "auto", padding: 8 }}>
          <div className="container" style={{ marginTop: "1rem" }}>
            <ScrollAnimation animateIn="bounceInLeft">
              <section>
                <Recommend history={this.props.history} />
              </section>
            </ScrollAnimation>

            {/* <ScrollAnimation animateIn="bounceInRight">
              <section>
                <FindPosition history={this.props.history} />
              </section>
            </ScrollAnimation> */}

            {/* <ScrollAnimation animateIn="bounceInLeft">
              <section>
                <Promotions history={this.props.history} />
              </section>
            </ScrollAnimation> */}

            <ScrollAnimation animateIn="bounceInRight">
              <section>
                <Web history={this.props.history} />
              </section>
            </ScrollAnimation>
          </div>
          <BackTop>
            <div style={style}>
              <UpOutlined />{" "}
            </div>
          </BackTop>
        </div>
      </div>
    );
  }
}

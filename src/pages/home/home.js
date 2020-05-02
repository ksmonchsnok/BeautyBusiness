import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/navbar/navbar.js";
import Position from "../nearby/position.js";
import Intro from "../../components/intro/intro.js";
import Web from "../web/web.js";
import FindPosition from "../nearby/find-position.js";
import Recommend from "../../components/recommend/recommend.js";
import Promotions from "../../components/recommend/promote.js";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
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
        style={{ marginBottom: "1rem" }}
      >
        <Navbar />
        <Intro />
        <Position />
        <div style={{ height: "auto", padding: 8 }}>
          <div className="container" style={{ marginTop: "1rem" }}>
            <ScrollAnimation animateIn="bounceInLeft">
              <div class="animated bounce delay-2s">
                <Recommend history={this.props.history} />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animateIn="bounceInRight">
              <section>
                <Web history={this.props.history} />
              </section>
            </ScrollAnimation>
          </div>
          {/* <ScrollAnimation animateIn="bounceInRight">
            <section>
              <FindPosition history={this.props.history} />
            </section>
          </ScrollAnimation> */}

          {/* <ScrollAnimation animateIn="bounceInLeft">
            <section>
              <Promotions history={this.props.history} />
            </section>
          </ScrollAnimation>
 */}
          <BackTop>
            <div style={style}>
              <UpOutlined />
            </div>
          </BackTop>
        </div>
      </div>
    );
  }
}

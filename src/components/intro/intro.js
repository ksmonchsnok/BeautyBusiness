import React, { Component } from "react";
import "../../style.css";
import intro1 from "../../assets/image/bg.jpg";
import intro2 from "../../assets/image/beautysalonjpg.jpg";
import intro3 from "../../assets/image/salon.jpg";

class intro extends Component {
  render() {
    return (
      <div id="intro" style={{ marginTop: "-6.2rem" }}>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={intro1} class="d-block w-100" alt="" />
            </div>
            <div class="carousel-item">
              <img src={intro2} class="d-block w-100" alt="" />
            </div>
            <div class="carousel-item">
              <img src={intro3} class="d-block w-100" alt="" />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}

export default intro;

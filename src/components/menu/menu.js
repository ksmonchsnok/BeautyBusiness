import React, { Component } from "react";
import "../../style.css";
import { NavLink } from "react-router-dom";

import search from "../../assets/icon/search.png";
import near from "../../assets/icon/near.png";
import home from "../../assets/icon/home.png";
import AllStore from "../../assets/icon/listall.png";
import rating from "../../assets/icon/rating.png";
import contact from "../../assets/icon/contact.png";

export default class Menu extends Component {
  render() {
    return (
      <div id="Menu">
        <div
          className="navbar-menu row d-flex align-content-center align-middle flex-wrap mx-auto"
          style={{
            border: "0.3px solid Black",
            boxShadow: "5px 5px 5px LightGray"
          }}
        >
          <div className="col-6 col-md-2 ">
            <NavLink
              exact
              to="/Admin"
              activeClassName="is-active"
              className="nav-link link-menu"
            >
              <img src={home} alt="home" style={{ margin: "-1rem" }} />
              <br />
              หน้าหลัก
            </NavLink>
          </div>

          <div className="col-6 col-md-2">
            <NavLink
              to="/Manager"
              activeClassName="is-active"
              className="nav-link link-menu"
            >
              <img src={AllStore} alt="type" style={{ margin: "-1rem" }} />
              <br />
              ธุรกิจทั้งหมด
            </NavLink>
          </div>

          <div className="col-6 col-md-2">
            <NavLink
              to="/Nearby"
              activeClassName="is-active"
              className="nav-link link-menu"
            >
              <img src={near} alt="near" style={{ margin: "-1rem" }} />
              <br />
              ใกล้เคียง
            </NavLink>
          </div>

          <div className="col-6 col-md-2">
            <NavLink
              to="/User"
              activeClassName="is-active"
              className="nav-link link-menu"
            >
              <img src={contact} alt="contact" style={{ margin: "-1rem" }} />
              <br />
              ติดต่อเรา
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

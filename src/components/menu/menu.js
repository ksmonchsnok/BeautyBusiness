import React, { Component } from "react";
import "../../style.css";
import { NavLink } from "react-router-dom";

import near from "../../assets/icon/near.png";
import home from "../../assets/icon/home.png";
import contact from "../../assets/icon/contact.png";
import createStore from "../../assets/icon/createStore.png";

export default class Menu extends Component {
  render() {
    return (
      <div id="Menu">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div
              className="navbar-menu"
              style={{
                border: "0.3px solid Black",
                boxShadow: "5px 5px 5px LightGray"
              }}
            >
              <div className="col-6 col-xs-6 col-sm-6 col-md-3 col-lg-3">
                <NavLink
                  to="/AllStores"
                  activeClassName="is-active"
                  className="nav-link link-menu"
                >
                  <img src={home} alt="type" style={{ margin: "-1rem" }} />
                  <br />
                  ธุรกิจทั้งหมด
                </NavLink>
              </div>

              <div className="col-6 col-xs-6 col-sm-6 col-md-3 col-lg-3">
                <NavLink
                  to="/Nearby"
                  activeClassName="is-active"
                  className="nav-link link-menu"
                >
                  <img src={near} alt="near" style={{ margin: "-1rem" }} />
                  <br />
                  ธุรกิจใกล้เคียง
                </NavLink>
              </div>

              <div className="col-6 col-xs-6 col-sm-6 col-md-3 col-lg-3">
                <NavLink
                  to="/Regis-Store"
                  activeClassName="is-active"
                  className="nav-link link-menu"
                >
                  <img
                    src={createStore}
                    alt="contact"
                    style={{ margin: "-1rem" }}
                  />
                  <br />
                  สร้างธุรกิจ
                </NavLink>
              </div>
              <div className="col-6 col-xs-6 col-sm-6 col-md-3 col-lg-3">
                <NavLink
                  exact
                  to="/Contact"
                  activeClassName="is-active"
                  className="nav-link link-menu"
                >
                  <img src={contact} alt="home" style={{ margin: "-1rem" }} />
                  <br />
                  ติดต่อเรา
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

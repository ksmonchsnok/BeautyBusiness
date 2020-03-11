import React, { Component } from "react";
import "../../style.css";
import { NavLink } from "react-router-dom";

import search from "../../assets/icon/search.png";
import near from "../../assets/icon/near.png";
import home from "../../assets/icon/home.png";
import listall from "../../assets/icon/listall.png";
import rating from "../../assets/icon/rating.png";
import contact from "../../assets/icon/contact.png";

export default class Menu extends Component {
  render() {
    return (
      <div
        id="Menu"
        className="container d-flex justify-content-center"
      >
        <div className="navbar row  mx-auto"  style={{ border: "0.3px solid Black",boxShadow: "5px 5px 5px LightGray"}}>
          <div className="col-6 col-md-2 ">
            <NavLink
              exact
              to="/"
              activeClassName="is-active"
              className="nav-link link-menu"
            >
              <img src={home} alt="home" />
              <br />
              <small style={{textAlign:"center  !important"}}>หน้าหลัก</small>
            </NavLink>
          </div>
          <div className="col-6 col-md-2">
            <NavLink
              to="/listall"
              activeClassName="is-active"
              className="nav-link link-menu"
            >
              <img src={listall} alt="type" />
              <br />
              <small style={{textAlign:"center  !important"}}>ร้านทั้งหมด</small>
            </NavLink>
          </div>

          <div className="col-6 col-md-2">
            <NavLink
              to="/rating"
              activeClassName="is-active"
              className="nav-link link-menu"
            >
              <img src={rating} alt="star" />
              <br />
              <small style={{textAlign:"center  !important"}}> แนะนำ</small>
            </NavLink>
          </div>

          <div className="col-6 col-md-2">
            <NavLink
              to="/nearby"
              activeClassName="is-active"
              className="nav-link link-menu"
            >
              <img src={near} alt="near" />
              <br />
              <small style={{textAlign:"center  !important"}}>ใกล้เคียง</small>
            </NavLink>
          </div>

          <div className="col-6 col-md-2">
            <NavLink
              to="/search"
              activeClassName="is-active"
              className="nav-link link-menu"
            >
              <img src={search} alt="search" />
              <br />
              <small style={{textAlign:"center  !important"}}> ค้นหา</small>
            </NavLink>
          </div>

          <div className="col-6 col-md-2">
            <NavLink
              to="/contact"
              activeClassName="is-active"
              className="nav-link link-menu"
            >
              <img src={contact} alt="contact" />
              <br />
              <small style={{textAlign:"center  !important"}}> ติดต่อเรา </small>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

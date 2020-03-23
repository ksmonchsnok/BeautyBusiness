import React, { Component } from "react";
import "../../style.css";
import { NavLink } from "react-router-dom";
import users from "../../assets/icon/users.png";
import setting from "../../assets/icon/setting.png";
import edit from "../../assets/icon/edit.png";
import logout from "../../assets/icon/logout.png";

import PopupLogin from "../../components/popup/popupLogin.js";

export default class navbar extends Component {
  constructor() {
    super();
    this.state = {
      showPopupLogin: false
    };
  }

  showPopupLogin = () => {
    this.setState({
      showPopupLogin: !this.state.showPopupLogin
    });
  };

  onClickHome = () => {
    //    window.open("/","_self");
    //    this.props.history.push("/" + window.location.hash);
  };

  onClickUpdateUser = () => {
    window.open("/user", "_self");
    // this.props.history.push("/user");
  };
  render() {
    const showPopupLogin = this.state.showPopupLogin;

    return (
      <div id="Navbar" style={{ marginTop: "-0.5rem", marginBottom: "10rem" }}>
        <nav className="fixed-top  navbar navbar-dark bg-dark navbar-expand-lg ">
          <NavLink exact to="/" className="navbar-brand">
            Beauty Business
          </NavLink>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                หน้าหลัก
              </NavLink>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <div className="nav justify-content-end">
              <div className="nav-item dropdown">
                <div
                  className="nav-link"
                  id="setting"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <button
                    type="button"
                    className="btn btn-dark but"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={this.showPopupLogin}
                  >
                    <img src={setting} />
                  </button>
                </div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={{ marginLeft: "-5rem" }}
                >
                  <div className="dropdown-item">
                    {" "}
                    <img
                      src={users}
                      alt="user"
                      style={{ marginRight: "7px" }}
                    />
                    Name User
                  </div>
                  <a
                    className="dropdown-item"
                    href
                    onClick={this.onClickUpdateUser}
                  >
                    {" "}
                    <img src={edit} alt="user" style={{ marginRight: "7px" }} />
                    แก้ไขข้อมูลผู้ใช้
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href>
                    <img
                      src={logout}
                      alt="user"
                      style={{ marginRight: "7px" }}
                    />
                    Log Out
                  </a>
                </div>
              </div>
            </div>
          </form>
        </nav>
      </div>
    );
  }
}

import React, { Component } from "react";
import "../../style.css";
import { NavLink } from "react-router-dom";
import user from "../../assets/icon/user.png";
import setting from "../../assets/icon/setting.png";
import edit from "../../assets/icon/edit.png";
import logout from "../../assets/icon/logout.png";
import users from "../../assets/icon/users.png";
import store from "../../assets/icon/store.png";

import PopupLogin from "../../components/popup/popupLogin.js";
import Logo from "../../assets/logo/logo.png"

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
    this.props.history.push("/");
  };
  render() {
    const showPopupLogin = this.state.showPopupLogin;

    return (
      <div id="Navbar" style={{ marginTop: "-0.5rem", marginBottom: "10rem" }}>
        <nav
          className="fixed-top navbar navbar-dark  navbar-expand-lg"
          style={{ backgroundColor: "#343a40" }}
        >
          <NavLink exact to="/" className="navbar-brand">
           <img src={Logo} className="logoNav" alt="Logo" />
           {/* Beauty Business */}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink exact to="/" className="nav-link">
                  หน้าหลัก
                </NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <div className="nav align-self-center justify-content-end">
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

                    <a className="dropdown-item" href>
                      {" "}
                      <img
                        src={edit}
                        alt="user"
                        style={{ marginRight: "7px" }}
                      />
                      แก้ไขข้อมูลผู้ใช้
                    </a>
                    <a className="dropdown-item" href>
                      {" "}
                      <img
                        src={store}
                        alt="user"
                        style={{ marginRight: "7px" }}
                      />
                      แก้ไขข้อมูลธุรกิจ
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

                <button
                  type="button"
                  className="btn btn-dark but"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={this.showPopupLogin}
                >
                  <img src={user} />
                  &nbsp; Sing In
                </button>

                <PopupLogin
                  // confirm={() => this.onClickReject()}
                  aria-labelledby="contained-modal-title-vcenter"
                  className="modal-dialog"
                  id="popUpLogin"
                  isVisible={showPopupLogin}
                  closePopup={this.showPopupLogin}
                />
              </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

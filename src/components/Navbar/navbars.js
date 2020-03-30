import React, { Component } from "react";
import "../../style.css";
import { NavLink } from "react-router-dom";
import user from "../../assets/icon/user.png";
import users from "../../assets/icon/users.png";
import setting from "../../assets/icon/setting.png";
import edit from "../../assets/icon/edit.png";
import logout from "../../assets/icon/logout.png";
import "firebase/auth";
import swal from "sweetalert";
import firebase from "firebase/app";
import PopupLogin from "../../components/popup/popupLogin.js";
import Logo from "../../assets/logo/logo.png";
import { withRouter } from "react-router-dom";

class navbar extends Component {
  constructor() {
    super();
    this.state = {
      tempLocal: {},
      showPopupLogin: false,
      setimgShow: "",
      setFullName: "",
      showlogInAndSignIn: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user
        });
      }
      setTimeout(() => {
        this.setUserLogin();
      }, 1000);
    });
  }

  async setUserLogin() {
    setTimeout(() => {
      let checkSigninAndOut = JSON.parse(localStorage.getItem("ObjUser"));
      if (checkSigninAndOut) {
        this.setState({
          setimgShow: checkSigninAndOut.imageUrl,
          setFullName:
            checkSigninAndOut.Firstname + "-" + checkSigninAndOut.Lastname,
          showlogInAndSignIn: true
        });
      } else {
        this.setState({
          showlogInAndSignIn: false
        });
      }
    }, 500);
  }

  showPopupLogin = () => {
    this.setState({
      showPopupLogin: !this.state.showPopupLogin
    });
  };

  onClickHome = () => {
    this.props.history.push("/");
  };

  onClickEditProfile = event => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/Register",
      state: { mode: "EditUser" }
    });
  };

  OnLogout = () => {
    swal({
      title: "Log out",
      text: "ํYou want Continue or not?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal("Log out Success", {
          icon: "success"
        });
        firebase
          .auth()
          .signOut()
          .then(function() {
            // Sign-out successful.
            localStorage.removeItem("ObjUser");
            window.location.reload();
          })
          .catch(function(error) {
            // An error happened.
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  render() {
    const showPopupLogin = this.state.showPopupLogin;

    return (
      <div id="Navbar" style={{ marginTop: "-0.5rem", marginBottom: "10rem" }}>
        <nav className="fixed-top  navbar navbar-dark bg-dark navbar-expand-lg ">
          <NavLink exact to="/" className="navbar-brand">
            <img src={Logo} className="logoNav" alt="Logo" />
          </NavLink>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                หน้าหลัก
              </NavLink>
            </li>
          </ul>
          {this.state.showlogInAndSignIn === true ? (
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
                      // onClick={this.showPopupLogin}
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
                      onClick={this.onClickEditProfile}
                    >
                      {" "}
                      <img
                        src={edit}
                        alt="user"
                        style={{ marginRight: "7px" }}
                      />
                      แก้ไขข้อมูลผู้ใช้
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href onClick={this.OnLogout}>
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
          ) : (
            <button
              type="button"
              className="btn btn-dark but"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={this.showPopupLogin}
              style={{ height: "60px" }}
              history={this.props}
            >
              <img src={user} alt="sign in" />
              &nbsp; Sing In
            </button>
          )}
        </nav>

        <PopupLogin
          aria-labelledby="contained-modal-title-vcenter"
          className="modal-dialog"
          id="popUpLogin"
          isVisible={showPopupLogin}
          closePopup={this.showPopupLogin}
          history={this.props}
        />
      </div>
    );
  }
}

export default withRouter(navbar);

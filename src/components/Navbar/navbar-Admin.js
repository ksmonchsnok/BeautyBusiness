import React, { Component } from "react";
import "../../style.css";
import { NavLink } from "react-router-dom";
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
      showlogInAndSignIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
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
          showlogInAndSignIn: true,
        });
      } else {
        this.setState({
          showlogInAndSignIn: false,
        });
      }
    }, 500);
  }

  showPopupLogin = () => {
    this.setState({
      showPopupLogin: !this.state.showPopupLogin,
    });
  };

  OnLogout = () => {
    swal({
      title: "Log out",
      text: "Please Confirm Logout.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Log out Success", {
          icon: "success",
        });

        this.props.history.push("/LoginForAdmin");

        // firebase
        //   .auth()
        //   .signOut()
        //   .then(function() {
        //     // Sign-out successful.
        //     this.props.history.push("/LoginForAdmin");
        //   })
        //   .catch(function(error) {
        //     // An error happened.
        //   });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  render() {
    return (
      <div id="Navbar" style={{ marginTop: "-0.5rem", marginBottom: "10rem" }}>
        <nav className="fixed-top navbar navbar-dark bg-dark navbar-expand-lg ">
          <NavLink exact to="/AdminPage" className="navbar-brand">
            <img src={Logo} className="logoNav" alt="Logo" />
          </NavLink>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"></li>
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
                    style={{ margin: "-1rem" }}
                  >
                    <img src={setting} />
                  </button>
                </div>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <div className="dropdown-item">
                    {" "}
                    <img
                      src={users}
                      alt="user"
                      style={{ marginRight: "7px" }}
                    />
                    Admin
                  </div>

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
        </nav>
      </div>
    );
  }
}
export default withRouter(navbar);

import React, { Component } from "react";
import "../../style.css";
import user from "../../assets/icon/user.png";
import PopupLogin from "../../components/popup/popupLogin.js";
import firebase from "firebase/app";
import setting from "../../assets/icon/setting.png";
import edit from "../../assets/icon/edit.png";
import logout from "../../assets/icon/logout.png";
import users from "../../assets/icon/users.png";
import store from "../../assets/icon/store.png";
import "firebase/auth";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      tempLocal: {},
      showPopupLogin: false,
      setimgShow: "",
      setFullName: "",
      showlogInAndSignIn: false,
      showlogInAndSignInFb: false,
      showlogInAndSignInGoogle: false,
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
      let checkSigninAndOutfb = JSON.parse(localStorage.getItem("FB-Login"));
      let checkSigninAndOutgoogle = JSON.parse(
        localStorage.getItem("Google-login")
      );
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

      if (checkSigninAndOutfb) {
        this.setState({
          setimgShow: checkSigninAndOutfb.picture.data.url,
          setFullName: checkSigninAndOutfb.name,
          showlogInAndSignInFb: true,
        });
      } else {
        this.setState({
          showlogInAndSignInFb: false,
        });
      }

      if (checkSigninAndOutgoogle) {
        this.setState({
          setimgShow: checkSigninAndOutgoogle.profileObj.imageUrl,
          setFullName: checkSigninAndOutgoogle.profileObj.name,
          showlogInAndSignInGoogle: true,
        });
      } else {
        this.setState({
          showlogInAndSignInGoogle: false,
        });
      }
    }, 100);
  }
  showPopupLogin = () => {
    this.setState({
      showPopupLogin: !this.state.showPopupLogin,
    });
  };

  onClickEditProfile = (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/Register",
      state: { mode: "EditUser" },
    });
  };

  onClickEditStore = (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/Manager",
      state: { mode: "edit" },
    });
  };

  OnLogout() {
    swal({
      title: "Log out",
      text: "ํYou want Continue or not?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Log out Success", {
          icon: "success",
        });
        firebase
          .auth()
          .signOut()
          .then(function () {
            // Sign-out successful.
            localStorage.removeItem("ObjUser");
            localStorage.removeItem("FB-Login");
            localStorage.removeItem("Google-login");
          })
          .catch(function (error) {
            // An error happened.
          });
      } else {
        swal("ผิดพลาด");
      }
    });
  }

  render() {
    const showPopupLogin = this.state.showPopupLogin;
    return (
      <div id="Login" history={this.props} style={{ marginBottom: "-9rem" }}>
        <div className="nav justify-content-end">
          {this.state.showlogInAndSignIn === true ||
          this.state.showlogInAndSignInFb === true ||
          this.state.showlogInAndSignInGoogle === true ? (
            <form className="form-inline my-2 my-lg-0" history={this.props}>
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
                      className="btn btn-dark"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <img
                        src={setting}
                        style={{ marginLeft: "-0.9rem", marginTop: "-0.5rem" }}
                      />
                    </button>
                  </div>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                    style={{ marginLeft: "-9rem" }}
                  >
                    <div className="dropdown-item">
                      {" "}
                      <img
                        src={users}
                        alt="user"
                        style={{ marginRight: "7px" }}
                      />
                      {this.state.setFullName}
                    </div>

                    <a
                      className="dropdown-item"
                      href
                      onClick={this.onClickEditProfile}
                      history={this.props.history}
                    >
                      {" "}
                      <img
                        src={edit}
                        alt="user"
                        style={{ marginRight: "7px" }}
                      />
                      แก้ไขข้อมูลผู้ใช้
                    </a>
                    <a
                      className="dropdown-item"
                      href
                      onClick={this.onClickEditStore}
                      history={this.props.history}
                    >
                      {" "}
                      <img
                        src={store}
                        alt="user"
                        style={{ marginRight: "7px" }}
                      />
                      แก้ไขข้อมูลธุรกิจ
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" onClick={this.OnLogout} href>
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

          <PopupLogin
            aria-labelledby="contained-modal-title-vcenter"
            className="modal-dialog"
            id="popUpLogin"
            isVisible={showPopupLogin}
            closePopup={this.showPopupLogin}
            history={this.props}
          />
        </div>
        <hr style={{ border: "0.5px solid Black" }} />
      </div>
    );
  }
}
export default withRouter(Login);

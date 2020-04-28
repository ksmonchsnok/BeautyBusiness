import React, { Component } from "react";
import "../../style.css";
import { NavLink } from "react-router-dom";
import user from "../../assets/icon/user2.png";
import users from "../../assets/icon/users.png";
import setting from "../../assets/icon/setting.png";
import edit from "../../assets/icon/edit.png";
import logout from "../../assets/icon/logout.png";
import store from "../../assets/icon/store.png";
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
      showlogInAndSignInFb: false,
      showlogInAndSignInGoogle: false,
      setlogInFacebook: {},
      setlogInGoogle: {},
      checkTypeUser: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    let checkSigninAndOutgoogle = JSON.parse(
      localStorage.getItem("Google-login")
    );

    let checkSigninAndOutfb = JSON.parse(localStorage.getItem("FB-Login"));

    if (checkSigninAndOutgoogle && !prevState.showlogInAndSignIn) {
      if (prevState.setlogInGoogle !== checkSigninAndOutgoogle.profileObj) {
        this.checkLoginGL(checkSigninAndOutgoogle);
      }
    }

    if (checkSigninAndOutfb && !prevState.showlogInAndSignIn) {
      if (prevState.setlogInFacebook !== checkSigninAndOutfb) {
        this.checkLoginFB(checkSigninAndOutfb);
      }
    }
  }

  componentDidMount() {
    let checkSigninAndOut = JSON.parse(localStorage.getItem("ObjUser"));
    let checkSigninAndOutfb = JSON.parse(localStorage.getItem("FB-Login"));
    let checkSigninAndOutgoogle = JSON.parse(
      localStorage.getItem("Google-login")
    );

    if (checkSigninAndOut) {
      this.checkLogin(checkSigninAndOut);
    } else if (checkSigninAndOutfb) {
      this.checkLoginFB(checkSigninAndOutfb);
    } else if (checkSigninAndOutgoogle) {
      this.checkLoginGL(checkSigninAndOutgoogle);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
        });
      }
      setTimeout(() => {
        this.setUserLogin();
      }, 100);
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
    }, 0);
  }

  checkLogin = (e) => {
    firebase
      .database()
      .ref(`Store/${e.MemberId}`)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          this.setState({ checkTypeUser: true });
        }
      });
    this.setState({
      setimgShow: e.imageUrl,
      setFullName: e.Firstname + "-" + e.Lastname,
      showlogInAndSignIn: true,
    });
  };

  checkLoginGL = (e) => {
    this.setState({
      setimgShow: e.profileObj.imageUrl,
      setFullName: e.profileObj.name,
      showlogInAndSignIn: true,
    });
  };

  checkLoginFB = (e) => {
    this.setState({
      setimgShow: e.picture.data.url,
      setFullName: e.name,
      showlogInAndSignIn: true,
    });
  };

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
      text: "You want Continue or not?",
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
            window.location.reload();
            window.open("/", "_self", localStorage.removeItem("FB-Login"));
            // this.props.history.push("/");
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
      <div id="Navbar" style={{ marginTop: "-0.5rem", marginBottom: "12rem" }}>
        <nav className="fixed-top  navbar navbar-dark bg-dark navbar-expand-lg ">
          <a className="navbar-brand" href="#">
            {" "}
            <NavLink exact to="/" className="navbar-brand">
              <img src={Logo} className="logoNav" alt="Logo" />
            </NavLink>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ marginRight: "0.5rem" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav" style={{ marginLeft: "2rem" }}>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href
                  onClick={() => this.props.history.push("/")}
                >
                  หน้าหลัก
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href
                  onClick={() => this.props.history.push("/Nearby")}
                >
                  ค้นหาธุรกิจใกล้เคียง
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href
                  onClick={() => this.props.history.push("/AllStores")}
                >
                  ธุรกิจทั้งหมด
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href
                  onClick={() => this.props.history.push("/Contact")}
                >
                  ติดต่อเรา
                </a>
              </li>
            </ul>
          </div>

          {this.state.showlogInAndSignIn === true ||
          this.state.showlogInAndSignInFb === true ||
          this.state.showlogInAndSignInGoogle === true ? (
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
                    <a href data-toggle="modal" data-target="#exampleModal">
                      <img src={setting} />
                    </a>
                  </div>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                    style={{ marginRight: "1.5rem" }}
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
                    >
                      {" "}
                      <img
                        src={edit}
                        alt="user"
                        style={{ marginRight: "7px" }}
                      />
                      แก้ไขข้อมูลผู้ใช้
                    </a>
                    {this.state.checkTypeUser ? (
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
                    ) : null}
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
            <div className="nav-link">
              <a
                href
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={this.showPopupLogin}
                history={this.props}
              >
                <img src={user} alt="sign in" />
              </a>
            </div>
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

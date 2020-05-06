import React, { Component } from "react";
import "../../style.css";
import { NavLink } from "react-router-dom";
import user from "../../assets/icon/user2.png";
import users from "../../assets/icon/users.png";
import setting from "../../assets/icon/setting.png";
import edit from "../../assets/icon/edit.png";
import logout from "../../assets/icon/logout.png";
import store from "../../assets/icon/store.png";
import discount from "../../assets/icon/rating.png";
import "firebase/auth";
import swal from "sweetalert";
import firebase from "firebase/app";
import PopupLogin from "../../components/popup/popupLogin.js";
import Logo from "../../assets/logo/logo2.jpg";
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
      checkCreateBusinese: false,
      checkBusiness: false,
      FB: JSON.parse(localStorage.getItem("FB-Login")),
      GL: JSON.parse(localStorage.getItem("Google-login")),
      EP: JSON.parse(localStorage.getItem("ObjUser")),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    setTimeout(() => {
      let checkSigninAndOut = JSON.parse(localStorage.getItem("ObjUser"));

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
      if (!prevState.checkCreateBusinese && checkSigninAndOut) {
        firebase
          .database()
          .ref(`store/${checkSigninAndOut.member_id}`)
          .once("value")
          .then((snapshot) => {
            if (snapshot.val()) {
              this.setState({ checkBusiness: true });
            }
          });
        if (checkSigninAndOut.member_type == "ผู้ให้บริการ") {
          this.setState({ checkCreateBusinese: true });
        }
      } else if (!prevState.checkCreateBusinese && checkSigninAndOutgoogle) {
      } else if (!prevState.checkCreateBusinese && checkSigninAndOutfb) {
      }
    }, 200);
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

    if (checkSigninAndOut) {
      firebase
        .database()
        .ref(`store/${checkSigninAndOut.member_id}`)
        .once("value")
        .then((snapshot) => {
          if (snapshot.val()) {
            this.setState({ checkBusiness: true });
          }
        });
      if (checkSigninAndOut.member_type == "ผู้ให้บริการ") {
        this.setState({ checkCreateBusinese: true });
      }
    } else if (checkSigninAndOut) {
    } else if (checkSigninAndOut) {
    }
  }

  checkHaveBusiness() {
    swal("คุณมีธุรกิจแล้ว", "", "warning");
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
          setFullName: checkSigninAndOut.username,
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
          setFullName: checkSigninAndOutgoogle.profileObj.givenName,
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
      .ref(`store/${e.member_id}`)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          this.setState({ checkTypeUser: true });
        }
      });
    this.setState({
      setimgShow: e.image,
      setFullName: e.firstname,
      showlogInAndSignIn: true,
    });
  };

  checkLoginGL = (e) => {
    this.setState({
      setimgShow: e.profileObj.imageUrl,
      setFullName: e.profileObj.givenName,
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

  onClickViewDiscountCode = (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/DiscountCode",
      state: { mode: "ViewDiscount" },
    });
  };

  onClickEditStore = (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: "/Manager",
      state: { mode: "userEditStore" },
    });
  };

  OnLogout() {
    swal({
      title: "Log Out Success",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // swal("Log out Success", {
        //   icon: "success",
        // });
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
        // swal("ผิดพลาด");
      }
    });
  }

  render() {
    const showPopupLogin = this.state.showPopupLogin;

    return (
      <div id="Navbar">
        <nav className="navbar navbar-dark bg-dark navbar-expand-xl fixed-top">
          <div className="container">
            <div class="col-6 col-lg-5" id="logo">
              <a className="navbar-brand" href="#">
                {" "}
                <NavLink exact to="/" className="navbar-brand">
                  <img src={Logo} className="logoNav" alt="Logo" />
                </NavLink>
              </a>
            </div>

            <div className="row">
              <span class="d-sm-block d-md-block d-lg-block d-xl-none">
                <ul class="navbar-nav">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </ul>
              </span>

              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a
                      className="nav-link text-center"
                      href
                      onClick={() => this.props.history.push("/")}
                    >
                      หน้าหลัก
                    </a>
                    <hr class="d-sm-block d-md-block d-lg-block d-xl-none" />
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-center"
                      href
                      onClick={() => this.props.history.push("/AllStores")}
                      style={{ fontSize: "1.6rem" }}
                    >
                      ธุรกิจทั้งหมด
                    </a>
                    <hr class="d-sm-block d-md-block d-lg-block d-xl-none" />
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-center"
                      href
                      onClick={() => this.props.history.push("/Nearby")}
                    >
                      ค้นหาธุรกิจใกล้เคียง
                    </a>
                    <hr class="d-sm-block d-md-block d-lg-block d-xl-none" />
                  </li>

                  {this.state.checkCreateBusinese ? (
                    <li className="nav-item">
                      {this.state.checkBusiness ? (
                        <span
                          onClick={this.checkHaveBusiness}
                          className="is-active"
                          className="nav-link link-menu"
                          style={{
                            marginTop: "-8px",
                            fontFamily:
                              "Conv_DB Helvethaica X Bd v3.2 !important",
                          }}
                        >
                          <a className="nav-link text-center" href>
                            สร้างธุรกิจของคุณ
                          </a>
                          <hr class="d-sm-block d-md-block d-lg-block d-xl-none" />
                        </span>
                      ) : (
                        <a
                          className="nav-link text-center"
                          href
                          onClick={() =>
                            this.props.history.push("/Regis-Store")
                          }
                        >
                          สร้างธุรกิจของคุณ
                        </a>
                      )}
                    </li>
                  ) : null}

                  <li className="nav-item">
                    <a
                      className="nav-link text-center"
                      href
                      onClick={() => this.props.history.push("/Contact")}
                    >
                      ติดต่อเรา
                    </a>
                    <hr class="d-sm-block d-md-block d-lg-block d-xl-none" />
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
                          <img
                            id="icon-login"
                            src={this.state.setimgShow}
                            style={{ width: "63px", height: "63px" }}
                          />
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
                        {this.state.checkTypeUser === false && (
                          <a
                            className="dropdown-item"
                            href
                            onClick={this.onClickViewDiscountCode}
                          >
                            {" "}
                            <img
                              src={discount}
                              alt="discount"
                              style={{ marginRight: "7px" }}
                            />
                            รหัสส่วนลดของคุณ
                          </a>
                        )}
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
                        <a
                          className="dropdown-item"
                          href
                          onClick={this.OnLogout}
                        >
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
              <PopupLogin
                aria-labelledby="contained-modal-title-vcenter"
                className="modal-dialog"
                id="popUpLogin"
                isVisible={showPopupLogin}
                closePopup={this.showPopupLogin}
                history={this.props}
              />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(navbar);

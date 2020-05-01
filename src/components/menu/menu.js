import React, { Component } from "react";
import "../../style.css";
import { NavLink } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import near from "../../assets/icon/near.png";
import home from "../../assets/icon/home.png";
import contact from "../../assets/icon/contact.png";
import createStore from "../../assets/icon/createStore.png";
import swal from "sweetalert";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkCreateBusinese: false,
      checkBusiness: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    setTimeout(() => {
      let checkSigninAndOut = JSON.parse(localStorage.getItem("ObjUser"));
      let checkSigninAndOutgoogle = JSON.parse(
        localStorage.getItem("Google-login")
      );
      let checkSigninAndOutfb = JSON.parse(localStorage.getItem("FB-Login"));

      if (!prevState.checkCreateBusinese && checkSigninAndOut) {
        firebase
          .database()
          .ref(`Store/${checkSigninAndOut.MemberId}`)
          .once("value")
          .then((snapshot) => {
            if (snapshot.val()) {
              this.setState({ checkBusiness: true });
            }
          });
        if (checkSigninAndOut.MemberType == "ผู้ให้บริการ") {
          this.setState({ checkCreateBusinese: true });
        }
      } else if (!prevState.checkCreateBusinese && checkSigninAndOutgoogle) {
      } else if (!prevState.checkCreateBusinese && checkSigninAndOutfb) {
      }
    }, 200);
  }
  componentDidMount() {
    setTimeout(() => {
      let checkSigninAndOut = JSON.parse(localStorage.getItem("ObjUser"));
      let checkSigninAndOutgoogle = JSON.parse(
        localStorage.getItem("Google-login")
      );
      let checkSigninAndOutfb = JSON.parse(localStorage.getItem("FB-Login"));
      if (checkSigninAndOut) {
        firebase
          .database()
          .ref(`Store/${checkSigninAndOut.MemberId}`)
          .once("value")
          .then((snapshot) => {
            if (snapshot.val()) {
              this.setState({ checkBusiness: true });
            }
          });
        if (checkSigninAndOut.MemberType == "ผู้ให้บริการ") {
          this.setState({ checkCreateBusinese: true });
        }
      } else if (checkSigninAndOut) {
      } else if (checkSigninAndOut) {
      }
    }, 500);
  }

  checkHaveBusiness() {
    swal("คุณมีธุรกิจแล้ว");
  }

  render() {
    return (
      <div id="Menu">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div
              className="col navbar-menu d-flex justify-content-center"
              style={{
                border: "0.3px solid Black",
                boxShadow: "5px 5px 5px LightGray",
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
              {this.state.checkCreateBusinese ? (
                <div className="col-6 col-xs-6 col-sm-6 col-md-3 col-lg-3">
                  {this.state.checkBusiness ? (
                    <span
                      onClick={this.checkHaveBusiness}
                      activeClassName="is-active"
                      className="nav-link link-menu"
                    >
                      <img
                        src={createStore}
                        alt="contact"
                        style={{ margin: "-1rem", cursor: "pointer" }}
                      />
                      <br />
                      สร้างธุรกิจ
                    </span>
                  ) : (
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
                  )}
                </div>
              ) : null}

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

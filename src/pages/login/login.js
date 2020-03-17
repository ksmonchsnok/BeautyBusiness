import React, { Component } from "react";
import "../../style.css";
import user from "../../assets/icon/user.png";
import PopupLogin from "../../components/popup/popupLogin.js";

export default class Login extends Component {
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

  render() {
    const showPopupLogin = this.state.showPopupLogin;
    return (
      <div id="Login" style={{ marginBottom: "-6.1rem" }}>
        <div className="nav justify-content-end">
          <button
            type="button"
            className="btn btn-dark but"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={this.showPopupLogin}
          >
            <img src={user} alt="sign in" />
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
        <hr style={{ border: "0.5px solid Black" }} />
      </div>
    );
  }
}

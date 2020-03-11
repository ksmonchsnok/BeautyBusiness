import React, { Component } from "react";
import "../../style.css";
import Modal from "react-bootstrap4-modal";
import Facebook from "../../pages/login/facebook.js";
// import Google from "../login-google/google.js";

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisble: false,
      loadingLogin: false
    };
  }
  onClickCancelLogin = () => {
    this.setState(this.props.closePopup);
  };

  onClickConfirmLogin = () => {
    this.setState({ loadingReject: false }, this.props.closePopup);
    this.props.confirm();
  };

  render() {
    const isVisible = this.props.isVisible;
    const { loadingLogin } = this.state;

    return (
      <div id="Popup-Login">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          visible={isVisible}
          onClickBackdrop={this.props.Popup}
        >
          <div className="modal-header">
            <h5 className="modal-title">Log In | Sing In</h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.props.closePopup}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body log">
            <div className="nav justify-content-center">
              <div className="nav-item llog">
                <Facebook />
              </div>
              <div className="nav-item llog">{/* <Google /> */}</div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              id="bt-CancelLogin"
              type="button"
              className="onClickCancelLogin"
              onClick={this.onClickCancelLogin}
            >
              Cancel
            </button>
            <button
              id="bt-ConfirmLogin"
              type="button"
              className="bottonConfirmLogin"
              // onClick={this.onClickConfirmReject}
              disabled={loadingLogin}
            >
              {loadingLogin && (
                <span
                  className="spinner-border spinner-border-sm"
                  style={{ marginRight: "1rem" }}
                />
              )}
              Sign In
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

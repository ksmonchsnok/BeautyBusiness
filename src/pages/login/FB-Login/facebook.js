import React, { Component } from "react";
import "../../../style.css";
import FacebookLogin from "react-facebook-login";
import firebase from "firebase/app";
import "firebase/auth";
import { withRouter } from "react-router-dom";

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedStatus: false,
      auth: false,
      MemberId: "",
      name: "",
      email: "",
      picture: "",
    };
  }

  componentClicked = () => {
    console.log("Login With Facebook");
  };

  responseFacebook = (response) => {
    console.log(response);
    if (response.status !== "unknown") {
      let auth = response;
      localStorage.setItem("FB-Login", JSON.stringify(auth));
      this.setState({
        auth: true,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
      });
    }
  };

  loggedOut = () => {
    this.setState({
      loggedStatus: false,
    });
  };

  render() {
    let facebookData;

    this.state.auth
      ? (facebookData = (
          <div
            style={{
              width: "400px",
              margin: "auto",
              background: "#f4f4f4",
              padding: "20px",
              color: "#000",
            }}
          >
            <img src={this.state.picture} alt={this.state.name} />
            <h6>Welcome : {this.state.name}!</h6>
          </div>
        ))
      : (facebookData = (
          <FacebookLogin
            appId="186461882774241"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            class="fb-login-button"
            data-width="250"
            data-height="45"
            data-size="medium"
            data-button-type="login_with"
            data-layout="default"
            data-auto-logout-link="true"
            scope="public_profile,email"
            icon="fa-facebook"
          />
        ));

    return <div>{facebookData}</div>;
  }
}

export default withRouter(Facebook);

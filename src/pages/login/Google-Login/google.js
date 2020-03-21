import React, { Component } from "react";

export default class Google extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      userID: "",
      name: "",
      email: "",
      picture: ""
    };
  }
  componentClicked = () => {
    console.log("Login With Google");
  };
  responseGoogle = response => {
    console.log(response);
    if (response.status !== "unknown") {
      let auth = response;
      localStorage.setItem("Google-Login", JSON.stringify(auth));
      this.setState({
        auth: true,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url
      });
    }
  };

  render() {
    let google;
    if (this.state.isLoggedIn) {
      google = null;
    } else {
      this.state.auth
        ? (google = <div>Hi {this.state.name}</div>)
        : (google = (
            <div
              className="g-signin2"
              data-onsuccess="onSignIn"
              data-theme="Light"
              data-width="260"
              data-height="45"
              data-longtitle="true"
            />
          ));
    }
    return <div id="google">{google}</div>;
  }
}

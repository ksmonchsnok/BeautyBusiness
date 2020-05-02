import React, { Component } from "react";
import GoogleLogin from "react-google-login";

export default class Google extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      MemberId: "",
      name: "",
      email: "",
      picture: "",
    };
  }

  responseGoogle = (response) => {
    if (response.status !== "unknown") {
      let res = response;
      let auth = res;
      localStorage.setItem("Google-login", JSON.stringify(auth));
      this.setState({
        auth: true,
        MemberId: auth.tokenId,
        name: auth.profileObj.givenName,
        email: auth.profileObj.email,
        picture: auth.profileObj.imageUrl,
      });
    }
  };

  render() {
    let GoogleData;
    this.state.auth
      ? (GoogleData = (
          <div
            style={{
              width: "400px",
              margin: "auto",
              background: "#f4f4f4",
              padding: "20px",
              paddingRight: "10px",
              color: "#000",
            }}
          >
            <img src={this.state.picture} alt={this.state.name} />
            <h6>Welcome : {this.state.name}!</h6>
          </div>
        ))
      : (GoogleData = (
          <GoogleLogin
            clientId="640455590718-69op7a21nk76thp0pmcbnf34u8ccb0kc.apps.googleusercontent.com"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            className="g-signin2"
            data-onsuccess="onSignIn"
            data-theme="Light"
            data-width="270"
            data-height="45"
            data-longtitle="true"
          >
            {" "}
            <h6 style={{ marginLeft: "8px", marginRight: "15px" }}>
              LOGIN WITH GOOGLE
            </h6>
          </GoogleLogin>
        ));

    return <div>{GoogleData}</div>;
  }
}

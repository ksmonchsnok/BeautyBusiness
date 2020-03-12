import React, { Component } from "react";
import "../../style.css";
import FacebookLogin from "react-facebook-login";

export default class Facebook extends Component {
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
    console.log("Login With Facebook");
  };
  responseFacebook = response => {
    console.log(response);
    if(response.status !== "unknown"){
      let auth = response;
      localStorage.setItem("FB-Login", JSON.stringify(auth));
      this.setState({
        auth : true,
        name : response.name,
        email : response.email,
        picture : response.picture.data.url
        
      })
    }
    
  };

  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
    fbContent = null;
    } else {
    this.state.auth
      ? (fbContent = <div>Hi {this.state.name}</div>)
      : (fbContent = (
          <FacebookLogin
            appId="186461882774241"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            class="fb-login-button"
            data-size="large"
            data-width="300"
            data-height="45"
            data-button-type="login_with"
            data-button-type="login_with"
            data-auto-logout-link="true"
            data-use-continue-as="false"
            scope="public_profile,email"
            onlogin={this.checkLoginState}
            icon="fa-facebook"
          />
        
        ));
      }
    return <div id="Facebook">{fbContent}</div>;
  }
}

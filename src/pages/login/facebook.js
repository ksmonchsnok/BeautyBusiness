import React, { Component } from "react";
import "../../style.css";
import FacebookLoginBtn from "react-facebook-login";

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

  render() {
    let fbContent;
    this.state.auth ? fbContent = (
      <div></div>
    ) : fbContent = (
      <FacebookLogin
    appId="186461882774241"
    autoLoad={true}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook} />
    );
    return(
      <div></div>
    )
    }
  }

//     // if (this.state.isLoggedIn) {
//     //   fbContent = null;
//     // } else {
//     //   fbContent = (
//     //     <div
//     //       scope="public_profile,email"
//     //       onlogin={this.checkLoginState}
//     //       class="fb-login-button"
//     //       data-size="large"
//     //       data-width="300"
//     //       data-height="45"
//     //       data-button-type="login_with"
//     //       data-auto-logout-link="true"
//     //       data-use-continue-as="false"
//     //       autoLoad={true}
//     //     />
//     //   );
//     // }
//     return <div id="facebook">{fbContent}</div>;
//   }
// }
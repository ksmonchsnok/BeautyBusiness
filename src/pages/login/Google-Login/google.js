import React, { Component } from "react";
import GoogleLogin from 'react-google-login';

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

responseGoogle = (response) => {    
    let res = response;
    let auth = res.profileObj;
    let token = res.uc.id_token
    localStorage.setItem("FB-Google", JSON.stringify(auth,token));

  }
      render() {
        return (
  
             <GoogleLogin
                  clientId="640455590718-69op7a21nk76thp0pmcbnf34u8ccb0kc.apps.googleusercontent.com"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle} 
                  className="g-signin2"
                  data-onsuccess="onSignIn"
                  data-theme="Light"
                  data-width="260"
                  data-height="45"
                  data-longtitle="true"
                >  LOGIN WITH GOOGLE 
              </GoogleLogin>

            ) 
        }
    }

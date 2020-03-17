import React, { Component } from "react";

class Google extends Component {
  render() {
    return (
      <div id="google">
        <div
          className="g-signin2"
          data-onsuccess="onSignIn"
          data-theme="Light"
          data-width="300"
          data-height="45"
          data-longtitle="true"
        />
      </div>
    );
  }
}
export default Google;
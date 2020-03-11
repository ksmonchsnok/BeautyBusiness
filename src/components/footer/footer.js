import React, { Component } from "react";
import "../../style.css";

export default class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <div className="wrapper site-footer">
          <div className="footer-secondary grid__item inline-list">
            <div className="nav justify-content-center link-footer">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-md-4 ">
                    <a href="#" itemProp="url">
                      © BEAUTY BUSINESS
                    </a>
                  </div>
                  <div className="col-lg-4  col-md-4 ">
                    <a href="https://www.facebook.com/papadagon" itemProp="url">
                      FACEBOOK
                    </a>
                  </div>

                  <div className="col-lg-4  col-md-4 ">
                    <a
                      href="https://www.instagram.com/kplynnn/?hl=th"
                      itemProp="url"
                    >
                      CONTACT
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

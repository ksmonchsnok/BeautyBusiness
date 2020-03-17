import React, { Component } from "react";
import "../../style.css";

export default class Footer extends Component {
  render() {
    return (
      <div id="footer" style={{ marginTop: "3rem" }}>
        <div className="wrapper site-footer align-self-center">
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
                    <a href="#" itemProp="url">
                      CONTACT
                    </a>
                  </div>

                  <div className="col-lg-4  col-md-4 ">
                    <a href="#" itemProp="url">
                      BACK TO TOP
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

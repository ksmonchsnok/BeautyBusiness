import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Form, Input, Tooltip, Button, Upload, message } from "antd";

export default class ManagePromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <div
        id="Manage-Promotion"
        style={{ marginTop: "3rem", marginLeft: "1rem", marginBottom: "5rem" }}
      >
        <div className="container">
          <h2>Promotion</h2>
          <form>
            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promotion Name"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                />
              </div>
            </div>
          </form>
          <hr style={{ margin: "3rem 0 3rem 0" }} />
          <h2>ส่วนลดบริการ</h2>
          <form>
            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Discount Name"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                />
              </div>
            </div>
          </form>
          <div
            className="col d-flex justify-content-center"
            style={{ marginTop: "3rem" }}
          >
            <button
              type="button"
              className="btn btn-danger "
              style={{ marginRight: "2rem" }}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary ">
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

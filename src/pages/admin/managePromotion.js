import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Form, Input, Tooltip, Button, Upload, message, Radio } from "antd";

export default class ManagePromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Promotion: false,
      Discount: false
    };
  }

  onChangePromotion = e => {
    // console.log("radio checked", e.target.value);
    this.setState({
      Promotion: e.target.value
    });
  };

  onChangeDiscount = e => {
    // console.log("radio checked", e.target.value);
    this.setState({
      Discount: e.target.value
    });
  };
  render() {
    return (
      <div
        id="Manage-Promotion"
        style={{ marginTop: "3rem", marginLeft: "1rem", marginBottom: "5rem" }}
      >
        <div className="container">
          {" "}
          <div className="row">
            <h2>Promotion</h2>
            <Radio.Group
              onChange={this.onChangePromotion}
              value={this.state.Promotion}
              style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
            >
              <Radio value={true}>มี</Radio>
              <Radio value={false}>ไม่มี</Radio>
            </Radio.Group>
          </div>
          {this.state.Promotion === true && (
            <span>
              <form>
                <div className="form-row">
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Promotion Name"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="textbox"
                      className="form-control"
                      placeholder="Description"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                </div>
              </form>
              <form style={{ marginTop: "2rem" }}>
                <div className="form-row">
                  <div className="col-ms-12 col-sm-12 col-md-4 col-lg-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Amount Promotion"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Start Date"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="End Date"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                </div>
              </form>
            </span>
          )}
          <hr style={{ margin: "3rem 0 3rem 0" }} />
          <div className="row">
            <h2>ส่วนลดบริการ</h2>
            <Radio.Group
              onChange={this.onChangeDiscount}
              value={this.state.Discount}
              style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
            >
              <Radio value={true}>มี</Radio>
              <Radio value={false}>ไม่มี</Radio>
            </Radio.Group>
          </div>
          {this.state.Discount === true && (
            <span>
              <form>
                <div className="form-row">
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Discount Name"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="textbox"
                      className="form-control"
                      placeholder="Description"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                </div>
              </form>
              <form style={{ marginTop: "2rem" }}>
                <div className="form-row">
                  <div className="col-ms-12 col-sm-12 col-md-4 col-lg-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Amount Description"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Start Date"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="End Date"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                </div>
              </form>
            </span>
          )}
          <div
            className="col d-flex justify-content-center"
            style={{ marginTop: "6rem" }}
          >
            <button
              type="button"
              className="btn btn-danger "
              style={{ marginRight: "2rem" }}
              onClick={() => window.history.back()}
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

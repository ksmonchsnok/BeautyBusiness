import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Radio, Select } from "antd";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import swal from "sweetalert";
import Navbar from "../../components/navbar/navbar-Admin.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ManagePromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Promotion: false,
      Discount: false,
      data: [],
      startDatePromotion: new Date(),
      endDatePromotion: new Date(),
      startDateDiscount: new Date(),
      endDateDiscount: new Date(),
    };
  }

  async componentDidMount() {
    await this.onGetItemp();
  }
  onGetItemp() {
    setTimeout(() => {
      let ref = firebase.database().ref("Store");
      ref.once("value").then((snapshot) => {
        const data = snapshot.val();
        if (typeof data === "object" && data !== null && data !== undefined) {
          let arr = [];
          var key = Object.keys(data);
          let arr1 = Object.values(data);
          for (let i = 0; i < arr1.length; i++) {
            arr[key[i]] = arr1[i];
          }
          this.setState({ data: arr });
        } else {
          this.setState({ data });
        }
      });
    }, 1000);
  }

  onChangePromotion = (e) => {
    // console.log("radio checked", e.target.value);
    this.setState({
      Promotion: e.target.value,
    });
  };

  onChangeDiscount = (e) => {
    // console.log("radio checked", e.target.value);
    this.setState({
      Discount: e.target.value,
    });
  };

  onStartDatePromotionChange = (date) => {
    this.setState({
      startDatePromotion: date,
    });
  };

  onEndDatePromotionChange = (date) => {
    this.setState({
      endDatePromotion: date,
    });
  };

  onStartDateDiscountChange = (date) => {
    this.setState({
      startDateDiscount: date,
    });
  };

  onEndDateDiscountChange = (date) => {
    this.setState({
      endDateDiscount: date,
    });
  };

  render() {
    const { Option } = Select;

    function onChange(value) {
      console.log(`selected ${value}`);
    }

    function onSearch(val) {
      console.log("search:", val);
    }
    return (
      <div
        id="Manage-Promotion"
        style={{ marginTop: "3rem", marginLeft: "1rem", marginBottom: "5rem" }}
      >
        <Navbar />
        <div className="container">
          <div className="row" style={{ marginBottom: "2rem" }}>
            <h2>ธุรกิจ</h2>

            <Select
              showSearch
              style={{ width: 200, marginLeft: "1.5rem", height: "2rem" }}
              placeholder="Select a Business"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.data &&
                this.state.data.map((d) => {
                  return <Option value={d.Name}>{d.Name}</Option>;
                })}
            </Select>
          </div>
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
                    <DatePicker
                      name="StartDate"
                      selected={this.state.startDatePromotion}
                      onChange={this.onStartDatePromotionChange}
                      placeholder="Start Date"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <DatePicker
                      name="EndDate"
                      selected={this.state.endDatePromotion}
                      onChange={this.onEndDatePromotionChange}
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
                    <DatePicker
                      name="StartDate"
                      selected={this.state.startDateDiscount}
                      onChange={this.onStartDateDiscountChange}
                      placeholder="Start Date"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <DatePicker
                      name="EndDate"
                      selected={this.state.endDateDiscount}
                      onChange={this.onEndDateDiscountChange}
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

function mapStateToProps({ firebase }) {
  return {
    Store: firebase.ordered.Store,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/Store" }]),
  connect(mapStateToProps)
);

export default enhance(ManagePromotion);

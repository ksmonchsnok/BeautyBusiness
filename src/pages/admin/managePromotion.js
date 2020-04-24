import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Radio, Select, Input } from "antd";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import swal from "sweetalert";
import Navbar from "../../components/navbar/navbar-Admin.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class ManagePromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "",
      loading: false,
      Promotion: false,
      Discount: false,
      businessName: "",
      promotionName: "",
      promotionDescrip: "",
      promotionAmount: 0,
      discountName: "",
      discountDescrip: "",
      discountAmount: 0,
      businessList: [],
      businessId: "",
      startDatePromotion: new Date(),
      endDatePromotion: new Date(),
      startDateDiscount: new Date(),
      endDateDiscount: new Date(),
    };
  }

  async componentDidMount() {
    this.setBusinessList();
    if (this.props.location.state) {
      if (this.props.location.state.mode === "edit") {
        let obj = await this.props.location.state.obj;
        this.setState({
          mode: "edit",
          Promotion: obj.Promotion,
          Discount: obj.Discount,
          businessId: obj.businessId,
          businessName: obj.businessName,
          promotionName: obj.promotionName,
          promotionDescrip: obj.promotionDescrip,
          promotionAmount: obj.promotionAmount,
          discountName: obj.discountName,
          discountDescrip: obj.discountDescrip,
          discountAmount: obj.discountAmount,
          startDatePromotion: new Date(obj.startDatePromotion),
          endDatePromotion: new Date(obj.endDatePromotion),
          startDateDiscount: new Date(obj.startDateDiscount),
          endDateDiscount: new Date(obj.endDateDiscount),
        });
      }
    }
  }
  setBusinessList() {
    let business = [];
    let checkUserPromotion = [];
    firebase
      .database()
      .ref("Promotion")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          checkUserPromotion = Object.values(snapshot.val());
        }
      });
    setTimeout(() => {
      firebase
        .database()
        .ref("Store")
        .once("value")
        .then((snapshot) => {
          if (snapshot.val()) {
            let data = Object.values(snapshot.val());
            let index = "";
            let arr = data;
            for (let i = 0; i < checkUserPromotion.length; i++) {
              index = data.findIndex(
                (v) => v.businessId === checkUserPromotion[i].userOfStoreId
              );
              arr.splice(index, 1);
              data = arr;
            }
            data.forEach((v) => {
              business.push({ value: v.userOfStoreId, label: v.Name });
            });
            this.setState({ businessList: business });
          }
        });
    }, 500);
  }

  onChangePromotion = (e) => {
    this.setState({
      Promotion: e.target.value,
    });
  };

  onChangeDiscount = (e) => {
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

  setBusinessName = (e) => {
    console.log(e);
    console.log(this.state.businessList);
    this.state.businessList.forEach((v) => {
      if (v.value === e) {
        console.log(v);
        this.setState({
          businessId: e,
          businessName: v.label,
        });
      }
    });
  };
  onClickSave() {
    if (this.state !== null && this.state.businessId) {
      setTimeout(() => {
        if (this.state.mode === "edit") {
          const setItemInsert = firebase.database().ref(`Promotion`);
          let newState = {
            Promotion: this.state.Promotion,
            Discount: this.state.Discount,
            promotionName: this.state.promotionName,
            promotionDescrip: this.state.promotionDescrip,
            promotionAmount: this.state.promotionAmount,
            discountName: this.state.discountName,
            discountDescrip: this.state.discountDescrip,
            discountAmount: this.state.discountAmount,
            startDatePromotion: this.state.startDatePromotion,
            endDatePromotion: this.state.endDatePromotion,
            startDateDiscount: this.state.startDateDiscount,
            endDateDiscount: this.state.endDateDiscount,
          };
          setItemInsert.child(this.state.businessId).update(newState);
          swal({
            title: "You want Update User",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              swal("Update User Success", {
                icon: "success",
              });
              this.onClickCancel();
            } else {
              swal("Your imaginary file is safe!");
            }
          });
        } else {
          const setItemInsert = firebase
            .database()
            .ref(`Promotion/${this.state.businessId}`);
          let newState = {
            Promotion: this.state.Promotion,
            Discount: this.state.Discount,
            businessId: this.state.businessId,
            businessName: this.state.businessName,
            promotionName: this.state.promotionName,
            promotionDescrip: this.state.promotionDescrip,
            promotionAmount: this.state.promotionAmount,
            discountName: this.state.discountName,
            discountDescrip: this.state.discountDescrip,
            discountAmount: this.state.discountAmount,
            startDatePromotion: moment(this.state.startDatePromotion).format(),
            endDatePromotion: moment(this.state.endDatePromotion).format(),
            startDateDiscount: moment(this.state.startDateDiscount).format(),
            endDateDiscount: moment(this.state.endDateDiscount).format(),
          };
          setItemInsert.set(newState);
          swal({
            title: "Create promotion Success",
            text: "ํYou want Continue or not?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                swal("Create promotion", {
                  icon: "success",
                });
                this.onClickCancel();
              } else {
                // swal("Your imaginary file is safe!");
              }
            })
            .catch(function (error) {
              swal("ผิดพลาด!", "ร้านมีโปรโมชั่นอยู่แล้ว", "error");
            });
        }
      }, 1000);
    } else {
      swal("ผิดพลาด", "กรุณากรอกข้อมูลให้ครบ", "error");
      return;
    }
  }
  onClickCancel = () => {
    window.history.back();
  };
  render() {
    const { Option } = Select;
    console.log(this.state.businessList);

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
          <div style={{ marginBottom: "2rem" }}>
            <h2>ธุรกิจ</h2>
            {this.state.mode === "edit" && this.state.businessName !== "" ? (
              <Input
                style={{ width: 300, marginLeft: "1.5rem", height: "2rem" }}
                value={this.state.businessName}
                whitespace={true}
                disabled
              />
            ) : (
              <Select
                showSearch
                style={{ width: 200, marginLeft: "1.5rem", height: "2rem" }}
                placeholder="Select a Business"
                optionFilterProp="children"
                onChange={this.setBusinessName}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {this.state.businessList.map((d, index) => {
                  return (
                    <Option key={index} value={d.value}>
                      {d.label}
                    </Option>
                  );
                })}
              </Select>
            )}
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
                      value={this.state.promotionName}
                      onChange={(e) =>
                        this.setState({ promotionName: e.target.value })
                      }
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="textbox"
                      className="form-control"
                      placeholder="Description"
                      value={this.state.promotionDescrip}
                      onChange={(e) =>
                        this.setState({ promotionDescrip: e.target.value })
                      }
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
                      value={this.state.promotionAmount}
                      onChange={(e) =>
                        this.setState({ promotionAmount: e.target.value })
                      }
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <label>Start Date : &emsp;</label>

                    <DatePicker
                      className="datePic"
                      name="StartDate"
                      selected={this.state.startDatePromotion}
                      onChange={this.onStartDatePromotionChange}
                      placeholder="Start Date"
                      dateFormat="dd/MM/yyyy"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <label>End Date : &emsp;&nbsp;</label>
                    <DatePicker
                      className="datePic"
                      name="EndDate"
                      selected={this.state.endDatePromotion}
                      onChange={this.onEndDatePromotionChange}
                      placeholder="End Date"
                      dateFormat="dd/MM/yyyy"
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
                      value={this.state.discountName}
                      onChange={(e) =>
                        this.setState({ discountName: e.target.value })
                      }
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="textbox"
                      className="form-control"
                      placeholder="Description"
                      value={this.state.discountDescrip}
                      onChange={(e) =>
                        this.setState({ discountDescrip: e.target.value })
                      }
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
                      value={this.state.discountAmount}
                      onChange={(e) =>
                        this.setState({ discountAmount: e.target.value })
                      }
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <label>Start Date :&emsp;</label>
                    <DatePicker
                      className="datePic"
                      name="StartDate"
                      selected={this.state.startDateDiscount}
                      onChange={this.onStartDateDiscountChange}
                      placeholder="Start Date"
                      dateFormat="dd/MM/yyyy"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <label>End Date :&emsp;&nbsp;</label>

                    <DatePicker
                      className="datePic"
                      name="EndDate"
                      selected={this.state.endDateDiscount}
                      onChange={this.onEndDateDiscountChange}
                      dateFormat="dd/MM/yyyy"
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
            <button
              type="button"
              className="btn btn-primary "
              onClick={() => this.onClickSave()}
            >
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

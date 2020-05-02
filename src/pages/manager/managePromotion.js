import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Radio } from "antd";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import swal from "sweetalert";
import Navbar from "../../components/navbar/navbar.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class ManagePromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      data: [],
    };
  }

  async componentDidMount() {
    await this.onGetItemp();
  }
  onGetItemp = () => {
    setTimeout(() => {
      let ObjUser = JSON.parse(localStorage.getItem("ObjUser"));
      this.setState({ businessId: ObjUser.MemberId });
      if (this.props.history.state) {
        if (this.props.history.state.mode === "edit") {
          let ref = firebase.database().ref(`Promotion/${ObjUser.MemberId}`);
          ref.once("value").then((snapshot) => {
            if (snapshot.val()) {
              const data = snapshot.val();
              this.setState({
                mode: "edit",
                Promotion: data.Promotion,
                Discount: data.Discount,
                businessId: data.businessId,
                businessName: data.businessName,
                promotionName: data.promotionName,
                promotionDescrip: data.promotionDescrip,
                promotionAmount: data.promotionAmount,
                discountName: data.discountName,
                discountDescrip: data.discountDescrip,
                discountAmount: data.discountAmount,
                startDatePromotion: new Date(data.startDatePromotion),
                endDatePromotion: new Date(data.endDatePromotion),
                startDateDiscount: new Date(data.startDateDiscount),
                endDateDiscount: new Date(data.endDateDiscount),
                loadingData: false,
                data,
              });
            } else {
              this.setState({ loadingData: false });
            }
          });
        }
      }
    }, 1000);
  };

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
  onClickSave = () => {
    setTimeout(() => {
      if (this.state.mode === "edit" && this.state.data) {
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
              swal("Your imaginary file is safe!");
            }
          })
          .catch(function (error) {
            swal("ผิดพลาด!", "ร้านมีโปรโมชั่นอยู่แล้ว", "error");
          });
      }
    }, 1000);
    // if (this.state !== null&&this.state.dataใสำ) {

    // } else {
    //   swal("ผิดพลาด", "กรุณากรอกข้อมูลให้ครบ", "error");
    //   return;
    // }
  };
  onClickCancel = () => {
    window.location.reload();
  };

  render() {
    return (
      <div
        id="Manage-Promotion"
        style={{
          marginLeft: "1rem",
          marginBottom: "5rem",
          marginTop: "-8rem",
        }}
      >
        <Navbar />
        <div className="container">
          <div className="row">
            <h2>Promotion</h2>
            <Radio.Group
              onChange={this.onChangePromotion}
              value={this.state.Promotion}
              style={{ marginLeft: "1.5rem" }}
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
                      placeholder="End Date"
                      dateFormat="dd/MM/yyyy"
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

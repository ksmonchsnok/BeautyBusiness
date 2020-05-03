import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Radio } from "antd";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import swal from "sweetalert";
import Navbar from "../../components/navbar/navbar-Admin.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class Managepromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      promotion_status: false,
      discount_status: false,
      store_name: "",
      promotion_name: "",
      promotion_description: "",
      amount_promotion: 0,
      discount_name: "",
      discount_description: "",
      amount_discount: 0,
      businessList: [],
      store_id: "",
      startdate_promotion: new Date(),
      enddate_promotion: new Date(),
      startdate_discount: new Date(),
      enddate_discount: new Date(),
      data: [],
    };
  }

  async componentDidMount() {
    await this.onGetItemp();
  }
  onGetItemp = () => {
    setTimeout(() => {
      let ObjUser = JSON.parse(localStorage.getItem("ObjUser"));
      this.setState({ store_id: ObjUser.member_id });
      if (this.props.history.state) {
        if (this.props.history.state.mode === "userEditStore") {
          let refStore = firebase.database().ref(`store/${ObjUser.member_id}`);
          refStore.once("value").then((snapshot) => {
            if (snapshot.val()) {
              const data = snapshot.val();
              this.setState({
                store_name: data.store_name,
              });
            } else {
              this.setState({ loadingData: false });
            }
          });
          let ref = firebase.database().ref(`promotion/${ObjUser.member_id}`);
          ref.once("value").then((snapshot) => {
            if (snapshot.val()) {
              const data = snapshot.val();
              this.setState({
                mode: "edit",
                promotion_status: data.promotion_status
                  ? data.promotion_status
                  : false,
                store_id: data.store_id,
                store_name: data.store_name,
                promotion_name: data.promotion_name,
                promotion_description: data.promotion_description,
                amount_promotion: data.amount_promotion,
                startdate_promotion: !data.promotion_status
                  ? new Date()
                  : new Date(data.startdate_promotion),
                enddate_promotion: !data.promotion_status
                  ? new Date()
                  : new Date(data.enddate_promotion),
                loadingData: false,
                data,
              });
            } else {
              this.setState({ loadingData: false });
            }
          });
          let refDis = firebase.database().ref(`discount/${ObjUser.member_id}`);
          refDis.once("value").then((snapshot) => {
            if (snapshot.val()) {
              const data = snapshot.val();
              this.setState({
                discount_status: data.discount_status
                  ? data.discount_status
                  : false,
                discount_name: data.discount_name,
                store_id: data.store_id,
                store_name: data.store_name,
                discount_description: data.discount_description,
                amount_discount: data.amount_discount,
                startdate_discount: !data.discount_status
                  ? new Date()
                  : new Date(data.startdate_discount),
                enddate_discount: !data.discount_status
                  ? new Date()
                  : new Date(data.enddate_discount),
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

  onChangepromotion = (e) => {
    this.setState({
      promotion_status: e.target.value,
    });
  };

  onChangediscount = (e) => {
    this.setState({
      discount_status: e.target.value,
    });
  };

  onstartdate_promotionChange = (date) => {
    this.setState({
      startdate_promotion: date,
    });
  };

  onenddate_promotionChange = (date) => {
    this.setState({
      enddate_promotion: date,
    });
  };

  onstartdate_discountChange = (date) => {
    this.setState({
      startdate_discount: date,
    });
  };

  onenddate_discountChange = (date) => {
    this.setState({
      enddate_discount: date,
    });
  };
  onClickSave = () => {
    setTimeout(() => {
      if (this.state.mode === "edit" && this.state.data) {
        const setItemInsert = firebase.database().ref(`promotion`);
        let newState = {
          promotion_status: this.state.promotion_status,
          store_id: this.state.store_id,
          store_name: this.state.store_name,
          promotion_name: !this.state.promotion_status
            ? null
            : this.state.promotion_name,
          promotion_description: !this.state.promotion_status
            ? null
            : this.state.promotion_description,
          amount_promotion: !this.state.promotion_status
            ? null
            : this.state.amount_promotion,
          startdate_promotion: !this.state.promotion_status
            ? null
            : moment(this.state.startdate_promotion).format(),
          enddate_promotion: !this.state.promotion_status
            ? null
            : moment(this.state.enddate_promotion).format(),
        };
        setItemInsert.child(this.state.store_id).update(newState);
        const setdiscountInsert = firebase.database().ref(`discount`);
        let newStateDis = {
          discount_status: this.state.discount_status,
          store_id: this.state.store_id,
          store_name: this.state.store_name,
          discount_name: !this.state.discount_status
            ? null
            : this.state.discount_name,
          discount_description: !this.state.discount_status
            ? null
            : this.state.discount_description,
          amount_discount: !this.state.discount_status
            ? null
            : this.state.amount_discount,
          startdate_discount: !this.state.discount_status
            ? null
            : moment(this.state.startdate_discount).format(),
          enddate_discount: !this.state.discount_status
            ? null
            : moment(this.state.enddate_discount).format(),
        };
        setdiscountInsert.child(this.state.store_id).update(newStateDis);
        const updateStore = firebase.database().ref(`store`);
        let editStore = {
          promotion_status: this.state.promotion_status,
          discount_status: this.state.discount_status,
        };
        updateStore.child(this.state.store_id).update(editStore);
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
          .ref(`promotion/${this.state.store_id}`);
        let newState = {
          promotion_status: this.state.promotion_status,
          store_id: this.state.store_id,
          store_name: this.state.store_name,
          promotion_name: !this.state.promotion_status
            ? null
            : this.state.promotion_name,
          promotion_description: !this.state.promotion_status
            ? null
            : this.state.promotion_description,
          amount_promotion: !this.state.promotion_status
            ? null
            : this.state.amount_promotion,
          startdate_promotion: !this.state.promotion_status
            ? null
            : moment(this.state.startdate_promotion).format(),
          enddate_promotion: !this.state.promotion_status
            ? null
            : moment(this.state.enddate_promotion).format(),
        };
        setItemInsert.set(newState);
        const setdiscountInsert = firebase
          .database()
          .ref(`discount/${this.state.store_id}`);
        let newStateDis = {
          discount_status: this.state.discount_status,
          store_id: this.state.store_id,
          store_name: this.state.store_name,
          discount_name: !this.state.discount_status
            ? null
            : this.state.discount_name,
          discount_description: !this.state.discount_status
            ? null
            : this.state.discount_description,
          amount_discount: !this.state.discount_status
            ? null
            : this.state.amount_discount,
          startdate_discount: !this.state.discount_status
            ? null
            : moment(this.state.startdate_discount).format(),
          enddate_discount: !this.state.discount_status
            ? null
            : moment(this.state.enddate_discount).format(),
        };
        setdiscountInsert.set(newStateDis);
        const updateStore = firebase.database().ref(`store`);
        let editStore = {
          promotion_status: this.state.promotion_status,
          discount_status: this.state.discount_status,
        };
        updateStore.child(this.state.store_id).update(editStore);
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
  };
  onClickCancel = () => {
    window.location.reload();
  };

  render() {
    return (
      <div
        id="Manage-promotion"
        style={{ marginLeft: "1rem", marginBottom: "5rem", marginTop: "-9rem" }}
      >
        <Navbar />
        <div className="container" style={{ height: "66vh" }}>
          <div className="row">
            <h2>promotion</h2>
            <Radio.Group
              onChange={this.onChangepromotion}
              value={this.state.promotion_status}
              style={{ marginLeft: "1.5rem" }}
            >
              <Radio value={true} name={true}>
                มี
              </Radio>
              <Radio value={false} name={false}>
                ไม่มี
              </Radio>
            </Radio.Group>
          </div>
          {this.state.promotion_status === true && (
            <span>
              <form>
                <div className="form-row">
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="promotion Name"
                      value={this.state.promotion_name}
                      onChange={(e) =>
                        this.setState({ promotion_name: e.target.value })
                      }
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="textbox"
                      className="form-control"
                      placeholder="Description"
                      value={this.state.promotion_description}
                      onChange={(e) =>
                        this.setState({ promotion_description: e.target.value })
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
                      placeholder="Amount promotion"
                      value={this.state.amount_promotion}
                      onChange={(e) =>
                        this.setState({ amount_promotion: e.target.value })
                      }
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <label>Start Date : &emsp;</label>

                    <DatePicker
                      className="datePic"
                      name="StartDate"
                      selected={this.state.startdate_promotion}
                      onChange={this.onstartdate_promotionChange}
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
                      selected={this.state.enddate_promotion}
                      onChange={this.onenddate_promotionChange}
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
              onChange={this.onChangediscount}
              value={this.state.discount_status}
              style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
            >
                <Radio value={true} name={true}>
                มี
              </Radio>
              <Radio value={false} name={false}>
                ไม่มี
              </Radio>
            </Radio.Group>
          </div>
          {this.state.discount_status === true && (
            <span>
              <form>
                <div className="form-row">
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="discount Name"
                      value={this.state.discount_name}
                      onChange={(e) =>
                        this.setState({ discount_name: e.target.value })
                      }
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="textbox"
                      className="form-control"
                      placeholder="Description"
                      value={this.state.discount_description}
                      onChange={(e) =>
                        this.setState({ discount_description: e.target.value })
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
                      value={this.state.amount_discount}
                      onChange={(e) =>
                        this.setState({ amount_discount: e.target.value })
                      }
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <label>Start Date :&emsp;</label>
                    <DatePicker
                      className="datePic"
                      name="StartDate"
                      selected={this.state.startdate_discount}
                      onChange={this.onstartdate_discountChange}
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
                      selected={this.state.enddate_discount}
                      onChange={this.onenddate_discountChange}
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
    Store: firebase.ordered.store,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/store" }]),
  connect(mapStateToProps)
);

export default enhance(Managepromotion);

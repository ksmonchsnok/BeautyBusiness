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

class Managepromotion_status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "",
      loading: false,
      promotion_status: false,
      store_id_status: false,
      store_name: "",
      promotion_name: "",
      promotion_description: "",
      amount_promotion: 0,
      store_id_statusName: "",
      store_id_statusDescrip: "",
      store_id_statusAmount: 0,
      businessList: [],
      store_id: "",
      startdate_promotion: new Date(),
      enddate_promotion: new Date(),
      startDatestore_id_status: new Date(),
      endDatestore_id_status: new Date(),
    };
  }

  async componentDidMount() {
    this.setBusinessList();
    if (this.props.location.state) {
      if (this.props.location.state.mode === "edit") {
        let obj = await this.props.location.state.obj;
        this.setState({
          mode: "edit",
          promotion_status: obj.promotion_status ? obj.promotion_status : false,
          store_id_status: obj.store_id_status ? obj.store_id_status : false,
          store_id: obj.store_id,
          store_name: obj.store_name,
          promotion_name: obj.promotion_name,
          promotion_description: obj.promotion_statusDescrip,
          amount_promotion: obj.amount_promotion,
          store_id_statusName: obj.store_id_statusName,
          store_id_statusDescrip: obj.store_id_statusDescrip,
          store_id_statusAmount: obj.store_id_statusAmount,
          startdate_promotion: !obj.promotion_status
            ? new Date()
            : new Date(obj.startdate_promotion),
          enddate_promotion: !obj.promotion_status
            ? new Date()
            : new Date(obj.enddate_promotion),
          startDatestore_id_status: !obj.store_id_status
            ? new Date()
            : new Date(obj.startDatestore_id_status),
          endDatestore_id_status: !obj.store_id_status
            ? new Date()
            : new Date(obj.endDatestore_id_status),
        });
      }
    }
  }
  setBusinessList = () => {
    let business = [];
    let checkUserpromotion_status = [];
    let checkUserstore_id_status = [];
    firebase
      .database()
      .ref("promotion_status")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          checkUserpromotion_status = Object.values(snapshot.val());
        }
      });
    firebase
      .database()
      .ref("store_id_status")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          checkUserstore_id_status = Object.values(snapshot.val());
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
            for (let i = 0; i < checkUserpromotion_status.length; i++) {
              index = data.findIndex(
                (v) =>
                  v.store_id === checkUserpromotion_status[i].store_id &&
                  (checkUserpromotion_status[i].promotion_status ||
                    checkUserstore_id_status[i].store_id_status)
              );
              if (index > -1) {
                arr.splice(index, 1);
              }
              data = arr;
            }
            data.forEach((v) => {
              business.push({ value: v.store_id, label: v.Name });
            });
            this.setState({ businessList: business });
          }
        });
    }, 500);
  };

  onChangepromotion_status = (e) => {
    this.setState({
      promotion_status: e.target.value,
    });
  };

  onChangestore_id_status = (e) => {
    this.setState({
      store_id_status: e.target.value,
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

  onStartDatestore_id_statusChange = (date) => {
    this.setState({
      startDatestore_id_status: date,
    });
  };

  onEndDatestore_id_statusChange = (date) => {
    this.setState({
      endDatestore_id_status: date,
    });
  };

  setstore_name = (e) => {
    this.state.businessList.forEach((v) => {
      if (v.value === e) {
        this.setState({
          store_id: e,
          store_name: v.label,
        });
      }
    });
  };
  onClickSave = () => {
    if (this.state !== null && this.state.store_id) {
      setTimeout(() => {
        if (this.state.mode === "edit") {
          const setItemInsert = firebase.database().ref(`promotion_status`);
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
          const setstore_id_statusInsert = firebase
            .database()
            .ref(`store_id_status`);
          let newStateDis = {
            store_id_status: this.state.store_id_status,
            store_id: this.state.store_id,
            store_name: this.state.store_name,
            store_id_statusName: !this.state.store_id_status
              ? null
              : this.state.store_id_statusName,
            store_id_statusDescrip: !this.state.store_id_status
              ? null
              : this.state.store_id_statusDescrip,
            store_id_statusAmount: !this.state.store_id_status
              ? null
              : this.state.store_id_statusAmount,
            startDatestore_id_status: !this.state.store_id_status
              ? null
              : moment(this.state.startDatestore_id_status).format(),
            endDatestore_id_status: !this.state.store_id_status
              ? null
              : moment(this.state.endDatestore_id_status).format(),
          };
          setstore_id_statusInsert
            .child(this.state.store_id)
            .update(newStateDis);
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
            .ref(`promotion_status/${this.state.store_id}`);
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
          const setstore_id_statusInsert = firebase
            .database()
            .ref(`store_id_status/${this.state.store_id}`);
          let newStateDis = {
            store_id_status: this.state.store_id_status,
            store_id: this.state.store_id,
            store_name: this.state.store_name,
            store_id_statusName: !this.state.store_id_status
              ? null
              : this.state.store_id_statusName,
            store_id_statusDescrip: !this.state.store_id_status
              ? null
              : this.state.store_id_statusDescrip,
            store_id_statusAmount: !this.state.store_id_status
              ? null
              : this.state.store_id_statusAmount,
            startDatestore_id_status: !this.state.store_id_status
              ? null
              : moment(this.state.startDatestore_id_status).format(),
            endDatestore_id_status: !this.state.store_id_status
              ? null
              : moment(this.state.endDatestore_id_status).format(),
          };
          setstore_id_statusInsert.set(newStateDis);
          swal({
            title: "Create promotion_status Success",
            text: "ํYou want Continue or not?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                swal("Create promotion_status", {
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
  };
  onClickCancel = () => {
    window.history.back();
  };
  render() {
    const { Option } = Select;
    // console.log(this.state.businessList);

    function onChange(value) {
      console.log(`selected ${value}`);
    }

    function onSearch(val) {
      console.log("search:", val);
    }

    console.log(this.state.store_name);

    return (
      <div
        id="Manage-promotion_status"
        style={{ marginTop: "3rem", marginLeft: "1rem", marginBottom: "5rem" }}
      >
        <Navbar />

        <div className="container">
          <div style={{ marginBottom: "2rem" }}>
            <h2>ธุรกิจ</h2>
            {this.state.mode === "edit" && this.state.store_name !== "" ? (
              <Input
                style={{ width: 300, marginLeft: "1.5rem", height: "2rem" }}
                value={this.state.store_name}
                whitespace={true}
                disabled
              />
            ) : (
              <Select
                showSearch
                style={{ width: 200, marginLeft: "1.5rem", height: "2rem" }}
                placeholder="Select a Business"
                optionFilterProp="children"
                onChange={this.setstore_name}
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
            <h2>promotion_status</h2>
            <Radio.Group
              onChange={this.onChangepromotion_status}
              value={this.state.promotion_status}
              style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
            >
              <Radio value={true}>มี</Radio>
              <Radio value={false}>ไม่มี</Radio>
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
                      placeholder="promotion_status Name"
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
                      placeholder="Amount promotion_status"
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
              onChange={this.onChangestore_id_status}
              value={this.state.store_id_status}
              style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
            >
              <Radio value={true}>มี</Radio>
              <Radio value={false}>ไม่มี</Radio>
            </Radio.Group>
          </div>
          {this.state.store_id_status === true && (
            <span>
              <form>
                <div className="form-row">
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="store_id_status Name"
                      value={this.state.store_id_statusName}
                      onChange={(e) =>
                        this.setState({ store_id_statusName: e.target.value })
                      }
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="textbox"
                      className="form-control"
                      placeholder="Description"
                      value={this.state.store_id_statusDescrip}
                      onChange={(e) =>
                        this.setState({
                          store_id_statusDescrip: e.target.value,
                        })
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
                      value={this.state.store_id_statusAmount}
                      onChange={(e) =>
                        this.setState({ store_id_statusAmount: e.target.value })
                      }
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                  <div className="col-ms-6 col-sm-6 col-md-4 col-lg-4">
                    <label>Start Date :&emsp;</label>
                    <DatePicker
                      className="datePic"
                      name="StartDate"
                      selected={this.state.startDatestore_id_status}
                      onChange={this.onStartDatestore_id_statusChange}
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
                      selected={this.state.endDatestore_id_status}
                      onChange={this.onEndDatestore_id_statusChange}
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
    Store: firebase.ordered.store,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/store" }]),
  connect(mapStateToProps)
);

export default enhance(Managepromotion_status);

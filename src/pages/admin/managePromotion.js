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
      enddate_promotion: new Date(moment().add("days", 1).format()),
      startdate_discount: new Date(),
      enddate_discount: new Date(moment().add("days", 1).format()),
      setDiscount_list: [],
      discount_List: [],
      checkEditDiscount: false,
    };
  }

  async componentDidMount() {
    console.log(this.props.location.state);
    this.setBusinessList();
    if (this.props.location.state) {
      if (this.props.location.state.mode === "edit") {
        this.setState({ store_id: this.props.location.state.store_id });
        firebase
          .database()
          .ref(`promotion/${this.props.location.state.store_id}`)
          .once("value")
          .then((snapshot) => {
            if (snapshot.val()) {
              let obj = snapshot.val();
              console.log(obj);
              this.setState({
                mode: "edit",
                promotion_status: obj.promotion_status
                  ? obj.promotion_status
                  : false,
                store_name: obj.store_name,
                promotion_name: obj.promotion_name,
                promotion_description: obj.promotion_description,
                amount_promotion: obj.amount_promotion,
                startdate_promotion: !obj.promotion_status
                  ? new Date()
                  : new Date(obj.startdate_promotion),
                enddate_promotion: !obj.promotion_status
                  ? new Date()
                  : new Date(obj.enddate_promotion),
              });
            }
          });
        firebase
          .database()
          .ref(`discount/${this.props.location.state.store_id}`)
          .once("value")
          .then((snapshot) => {
            if (snapshot.val()) {
              let obj = snapshot.val();
              this.setState({
                mode: "edit",
                discount_status: obj.discount_status
                  ? obj.discount_status
                  : false,
                discount_List: obj.discount_List,
                setDiscount_list: obj.discount_List ? obj.discount_List : [],
              });
            }
          });
      }
    }
  }
  setBusinessList = () => {
    let business = [];
    let checkUserpromotion_status = [];
    let checkUserdiscount_status = [];
    firebase
      .database()
      .ref("promotion")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          checkUserpromotion_status = Object.values(snapshot.val());
        }
      });
    firebase
      .database()
      .ref("discount")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          checkUserdiscount_status = Object.values(snapshot.val());
        }
      });
    setTimeout(() => {
      firebase
        .database()
        .ref("store")
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
                    checkUserdiscount_status[i].discount_status)
              );
              if (index > -1) {
                arr.splice(index, 1);
              }
              data = arr;
            }
            data.forEach((v) => {
              business.push({ value: v.store_id, label: v.store_name });
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

  onChangediscount_status = (e) => {
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
    console.log(this.state);
    if (this.state !== null && this.state.store_id) {
      setTimeout(() => {
        if (this.state.mode === "edit") {
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
          const updateStore = firebase.database().ref("store");
          let editStore = {
            promotion_status: this.state.promotion_status,
            discount_status: this.state.discount_status,
          };
          updateStore.child(this.state.store_id).update(editStore);
          const setdiscount_Insert = firebase.database().ref(`discount`);
          let newStateDis = {
            discount_status: this.state.discount_List
              ? this.state.discount_status
              : false,
            store_id: this.state.store_id,
            store_name: this.state.store_name,
            discount_List: this.state.discount_List
              ? this.state.discount_List
              : [],
          };
          setdiscount_Insert.child(this.state.store_id).update(newStateDis);
          swal({
            title: "Update Promotion And Discout Success",
            icon: "success",
            buttons: true,
            dangerMode: false,
          }).then((willDelete) => {
            if (willDelete) {
              // swal("Update User Success", {
              //   icon: "success",
              // });
              this.onClickCancel();
            } else {
              // swal("Your imaginary file is safe!");
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
          const updateStore = firebase.database().ref("store");
          let editStore = {
            promotion_status: this.state.promotion_status,
            discount_status: this.state.discount_status,
          };
          updateStore.child(this.state.store_id).update(editStore);
          const setdiscount_Insert = firebase
            .database()
            .ref(`discount/${this.state.store_id}`);
          let newStateDis = {
            discount_status: this.state.discount_List
              ? this.state.discount_status
              : false,
            store_id: this.state.store_id,
            store_name: this.state.store_name,
            discount_List: this.state.discount_List
              ? this.state.discount_List
              : [],
          };
          setdiscount_Insert.set(newStateDis);
          swal({
            title: "Create Promotion And Discount Success",
            text: "",
            icon: "success",
            buttons: true,
            dangerMode: false,
          })
            .then((willDelete) => {
              if (willDelete) {
                // swal("Create Promotion", {
                //   icon: "success",
                // });
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

  addDiscount = () => {
    this.state.setDiscount_list.push({
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
    });

    this.setState({
      discount_List: this.state.setDiscount_list,
      discount_name: "",
      discount_description: "",
      amount_discount: "",
      startdate_discount: new Date(),
      enddate_discount: new Date(moment().add("days", 1).format()),
    });
  };

  handleDeleteDiscountList = (e, i) => {
    let arr = this.state.discount_List;
    arr.splice(i, 1);
    this.setState({ discount_List: arr });
  };
  handleEditDiscountList = (e, i) => {
    this.setState({
      indexDiscountList: i,
      checkEditDiscount: true,
      discount_name: e.discount_name,
      discount_description: e.discount_description,
      amount_discount: e.amount_discount,
      startdate_discount: new Date(e.startdate_discount),
      enddate_discount: new Date(e.enddate_discount),
    });
  };
  EditDiscountList = () => {
    let tempArr = this.state.discount_List;
    for (let i = 0; i < tempArr.length; i++) {
      if (i === this.state.indexDiscountList) {
        tempArr[i].discount_name = this.state.discount_name;
        tempArr[i].discount_description = this.state.discount_description;
        tempArr[i].amount_discount = this.state.amount_discount;
        tempArr[i].startdate_discount = moment(
          this.state.startdate_discount
        ).format();
        tempArr[i].enddate_discount = moment(
          this.state.enddate_discount
        ).format();
      }
    }
    this.setState({
      discount_List: tempArr,
      discount_name: "",
      discount_description: "",
      amount_discount: "",
      startdate_discount: new Date(),
      enddate_discount: new Date(moment().add("days", 1).format()),
      checkEditDiscount: false,
    });
  };
  render() {
    const { discount_List } = this.state;
    return (
      <div
        id="Manage-Promotion"
        style={{
          marginTop: "3rem",
          marginLeft: "1rem",
          marginBottom: "10em",
        }}
      >
        <Navbar />

        <div className="container">
          <div className="row" style={{ marginBottom: "3em" }}>
            <h1>
              ธุรกิจ :: <u>{this.state.store_name}</u>
            </h1>
            {/* {this.state.mode === "edit" && this.state.store_name !== "" ? (
              <Input
                style={{ width: 300, marginLeft: "1.5rem", height: "2rem" }}
                value={this.state.store_name}
                whitespace={true}
                disabled
              />
            ) : (
              <Select
                showSearch
                style={{ width: "20%", marginLeft: "1.5rem", height: "2rem" }}
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
            )} */}
          </div>
          <div className="row">
            <h2>promotion_status</h2>
            <Radio.Group
              onChange={this.onChangepromotion_status}
              value={this.state.promotion_status}
              style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
            >
              <Radio value={true} name={"true"}>
                มี
              </Radio>
              <Radio value={false} name={"false"}>
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
                      placeholder="Promotion Name"
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
                      placeholder="Amount Promotion"
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
              onChange={this.onChangediscount_status}
              value={this.state.discount_status}
              style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
            >
              <Radio value={true} name={"true"}>
                มี
              </Radio>
              <Radio value={false} name={"false"}>
                ไม่มี
              </Radio>
            </Radio.Group>
          </div>
          {this.state.discount_status === true && (
            <span>
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginLeft: "2rem" }}
                onClick={this.addDiscount}
              >
                เพิ่มส่วนลดบริการ
              </button>
              <form>
                <div className="form-row">
                  <div className="col-ms-12 col-sm-12 col-md-6 col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Discount Name"
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
                        this.setState({
                          discount_description: e.target.value,
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
                      dateFormat="dd/MM/yyyy"
                      placeholder="End Date"
                      style={{ marginBottom: "0.5rem" }}
                    />
                  </div>
                </div>
              </form>
              {this.state.checkEditDiscount ? (
                <button
                  type="button"
                  className="btn btn-warning"
                  style={{ marginLeft: "2rem" }}
                  onClick={this.EditDiscountList}
                >
                  แก้ไขลดบริการ
                </button>
              ) : null}
              <div id="Promotion-List">
                <div style={{ marginTop: "3rem", marginBottom: "4rem" }}>
                  <h2>รายการส่วนลดทั้งหมด</h2>{" "}
                  <div className="row">
                    {" "}
                    <div
                      className="col d-flex justify-content-start"
                      style={{ marginBottom: "2rem", marginTop: "1rem" }}
                    >
                      {/* <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.onClickCreatepromotion}
                  >
                    Create Promotion And Discount
                  </Button> */}
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Discount Name</th>
                          <th scope="col">Discount Description</th>
                          <th scope="col">Amount Discount</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {discount_List
                          ? discount_List.map((d, index) => {
                              return (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>
                                    {d.discount_name ? d.discount_name : "-"}
                                  </td>
                                  <td>
                                    {d.discount_description
                                      ? d.discount_description
                                      : "-"}
                                  </td>
                                  <td>
                                    {d.amount_discount
                                      ? d.amount_discount
                                      : "-"}
                                  </td>
                                  <td>
                                    <a href>
                                      <ion-icon
                                        name="create-outline"
                                        size="large"
                                        onClick={() =>
                                          this.handleEditDiscountList(d, index)
                                        }
                                      ></ion-icon>
                                    </a>
                                  </td>
                                  <td>
                                    <a href>
                                      <ion-icon
                                        size="large"
                                        name="trash-outline"
                                        onClick={() =>
                                          this.handleDeleteDiscountList(
                                            d,
                                            index
                                          )
                                        }
                                      ></ion-icon>
                                    </a>
                                  </td>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                  {/* {loadingData && (
                <div className="d-flex justify-content-center row col ">
                  <span
                    className="spinner-border text-dark"
                    style={{
                      marginTop: "3rem",
                      marginBottom: "2rem",
                      width: "10rem",
                      height: "10rem",
                    }}
                    role="status"
                  />
                </div>
              )} */}
                </div>
              </div>
            </span>
          )}
          {/* style={{ height: "100vh" }} */}

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

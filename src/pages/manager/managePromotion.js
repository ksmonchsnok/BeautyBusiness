import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Radio, Button } from "antd";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import swal from "sweetalert";
import Navbar from "../../components/navbar/navbar.js";
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
      enddate_promotion: new Date(moment().add("days", 1).format()),
      startdate_discount: new Date(),
      enddate_discount: new Date(moment().add("days", 1).format()),
      data: [],
      arrpromotion: [],
      arrdiscount_status: [],
      loadingData: false,
      setDiscount_list: [],
      discount_List: [],
      checkEditDiscount: false,
    };
  }

  async componentDidMount() {
    await this.onGetItemp();
    await this.onGetItemppromotion();
  }

  onGetItemppromotion = () => {
    this.setState({
      data: [],
      loadingData: true,
      arrpromotion: [],
      arrdiscount_status: [],
    });
    let arr = [];
    let arrDIs = [];
    setTimeout(() => {
      let ref = firebase.database().ref("promotion");
      ref.once("value").then((snapshot) => {
        let data = [];
        if (snapshot.val()) {
          data = Object.values(snapshot.val());
        }

        let refStore = firebase.database().ref("discount");
        refStore.once("value").then((snapshot) => {
          if (snapshot.val()) {
            const dataDis = Object.values(snapshot.val());
            if (data.length > 0) {
              if (
                typeof data === "object" &&
                data !== null &&
                data !== undefined
              ) {
                var key = Object.keys(data);
                let arr1 = Object.values(data);
                for (let i = 0; i < arr1.length; i++) {
                  arr[key[i]] = arr1[i];
                }
              }
            }
            if (dataDis.length > 0) {
              if (
                typeof dataDis === "object" &&
                dataDis !== null &&
                dataDis !== undefined
              ) {
                var keyd = Object.keys(dataDis);
                let arrdiscount_status = Object.values(dataDis);
                for (let i = 0; i < arrdiscount_status.length; i++) {
                  arrDIs[keyd[i]] = arrdiscount_status[i];
                }
              }
            }
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < arrDIs.length; j++) {
                if (arr[i].store_id === arrDIs[j].store_id) {
                  arr[i].discount_status = arrDIs[j].discount_status;
                  arr[i].discount_name = arrDIs[j].discount_name;
                  arr[i].discount_description = arrDIs[j].discount_description;
                  arr[i].amount_discount = arrDIs[j].amount_discount;
                  arr[i].startdate_discount = arrDIs[j].startdate_discount;
                  arr[i].enddate_discount = arrDIs[j].enddate_discount;
                }
              }
            }
            this.setState({ data: arr, loadingData: false });
          } else {
            this.setState({ loadingData: false });
          }
        });
      });
    }, 1000);
  };

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
                mode: "edit",
                discount_status: data.discount_status
                  ? data.discount_status
                  : false,
                discount_List: data.discount_List,
                setDiscount_list: data.discount_List ? data.discount_List : [],
              });
            } else {
              this.setState({ loadingData: false });
            }
          });
        }
      }
    }, 1000);
  };

  handleEdit = (obj) => {
    swal({
      title: "Please Confirm to Edit ?",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.history.push("/managePromotionAnddiscount", {
          obj,
          mode: "edit",
        });
      } else {
        return;
      }
    });
  };

  handleDelete = (d, index) => {
    swal({
      title: "Please Confirm to Delete ?",
      icon: "error",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        firebase.remove(`promotion/${d.store_id}`);
        firebase.remove(`discount/${d.store_id}`);
        this.onGetItemppromotion();
      } else {
        return;
      }
    });
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
          discount_status: this.state.discount_List
            ? this.state.discount_status
            : false,
          store_id: this.state.store_id,
          store_name: this.state.store_name,
          discount_List: this.state.discount_List
            ? this.state.discount_List
            : [],
        };
        setdiscountInsert.child(this.state.store_id).update(newStateDis);
        const updateStore = firebase.database().ref(`store`);
        let editStore = {
          promotion_status: this.state.promotion_status,
          discount_status: this.state.discount_status,
        };
        updateStore.child(this.state.store_id).update(editStore);
        swal({
          title: "Update Success",
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
        const setdiscountInsert = firebase
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
        setdiscountInsert.set(newStateDis);
        const updateStore = firebase.database().ref(`store`);
        let editStore = {
          promotion_status: this.state.promotion_status,
          discount_status: this.state.discount_status,
        };
        updateStore.child(this.state.store_id).update(editStore);
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
  };
  onClickCancel = () => {
    window.location.reload();
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
        id="Manage-promotion"
        style={{
          marginLeft: "1rem",
          marginBottom: "5rem",
          marginTop: "-9rem",
          height: "300vh",
        }}
      >
        <Navbar />
        <h1 style={{ marginBottom: "3rem" }}>Promotion And Discount</h1>

        <div className="container" style={{ height: "100vh" }}>
          <div className="row">
            <h2>โปรโมชั่น</h2>
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
              style={{ marginLeft: "1.5rem" }}
            >
              <Radio value={true} name={true}>
                มี
              </Radio>
              <Radio value={false} name={false}>
                ไม่มี
              </Radio>
            </Radio.Group>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginLeft: "2rem" }}
              onClick={this.addDiscount}
            >
              เพิ่มส่วนลดบริการ
            </button>
          </div>
          {this.state.discount_status === true && (
            <span>
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

import React, { Component } from "react";
import "../../style.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Navbar from "../../components/navbar/navbar.js";
import swal from "sweetalert";
import firebase from "firebase";
import moment from "moment";

class StoreDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Store: [],
      loadingData: false,
      pormotion: {},
      discont: {},
      dataStore: {},
      checkDiscount: false,
      checkdisCountRequest: 0,
      discountList: [],
    };
  }

  componentDidMount() {
    this.Data();
  }

  Data = () => {
    this.setState({ Store: this.props.history.location.state });
    setTimeout(() => {
      let ref = firebase
        .database()
        .ref(`promotion/${this.state.Store[0].store_id}`);
      ref.once("value").then((snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          this.setState({ loadingData: false, pormotion: data });
        } else {
          this.setState({ loadingData: false });
        }
      });
      let refDis = firebase
        .database()
        .ref(`discount/${this.state.Store[0].store_id}`);
      refDis.once("value").then((snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          let cDate = new Date().getTime();
          let arr = [];
          if (data.discount_List) {
            data.discount_List.forEach((v) => {
              let sDate = new Date(v.startdate_discount).getTime();
              let eDate = new Date(v.enddate_discount).getTime();
              if (cDate >= sDate && cDate <= eDate) {
                this.checkDiscount = true;
                arr.push(v);
              }
            });
          }
          this.setState({
            loadingData: false,
            discountList: arr,
            discont: data,
            checkdisCountRequest: data.amount_discount,
          });
        } else {
          this.setState({ loadingData: false });
        }
      });
    }, 500);
  };

  onclickBack = () => {
    window.history.back();
  };

  onClickDiscount = (e, i) => {
    let alertWarringCount = true;
    let username = "";
    let obj = JSON.parse(localStorage.getItem("ObjUser"));
    let checkSigninAndOutgoogle = JSON.parse(
      localStorage.getItem("Google-login")
    );
    let checkSigninAndOutfb = JSON.parse(localStorage.getItem("FB-Login"));

    if (obj) {
      username = obj.firstname + "-" + obj.lastname;
    } else if (checkSigninAndOutgoogle) {
      username = checkSigninAndOutgoogle.e.profileObj.name;
    } else if (checkSigninAndOutfb) {
      username = checkSigninAndOutfb.name;
    }
    if (obj || checkSigninAndOutfb || checkSigninAndOutgoogle) {
      let GenCode = Math.random().toString(26).substring(2, 10).toUpperCase();
      if (e.amount_discount > 0) {
        let setdiscount_Insert = firebase
          .database()
          .ref(`discount/${this.state.Store[0].store_id}`);
        setdiscount_Insert.once("value").then((snapshot) => {
          if (snapshot.val()) {
            let temp = [];
            let tempArr = snapshot.val().discount_List;
            for (let index = 0; index < tempArr.length; index++) {
              if (index === i) {
                tempArr[index].amount_discount = e.amount_discount - 1;
              }
              temp = tempArr;
            }
            let newStateDis = {
              discount_List: temp,
            };
            setdiscount_Insert.update(newStateDis);
            this.Data();
          }
        });
        alertWarringCount = true;
      } else {
        alertWarringCount = false;
      }
      setTimeout(() => {
        if (alertWarringCount) {
          const setReport = firebase.database().ref(`report`);
          let newReport = {
            report_id: this.state.discont.store_id,
            discount_code: GenCode,
            store_name: this.state.discont.store_name,
            username: username,
            status_code: false,
            startdate_discount: e.startdate_discount,
            enddate_discount: e.enddate_discount,
          };
          setReport.push(newReport);
          if (obj || checkSigninAndOutfb || checkSigninAndOutgoogle) {
            swal({
              title: "You want Discount",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                swal(
                  "รหัสส่วนลดบริการ",
                  `Code : ${GenCode}  วันหมดอายุ : ${moment(
                    e.enddate_discount
                  ).format("DD/MM/YYYY")}`,
                  "success",
                  {
                    icon: "success",
                  }
                );
              } else {
                swal("ยกเลิก");
              }
            });
          } else {
            swal(
              "Warning",
              "กรุณาเข้าสู่ระบบเพื่อขอรหัสส่วนลดบริการ",
              "warning"
            );
          }
        } else {
          swal(
            "Warning",
            "โควต้าส่วนลดเต็มแล้วไม่สามารถขอรหัสส่วนลดได้",
            "warning"
          );
        }
      }, 100);
    } else {
      swal("Warning", "กรุณาเข้าสู่ระบบเพื่อขอรหัสส่วนลดบริการ", "warning");
    }
  };

  render() {
    const item = this.state.Store.map((value) => (
      <div key={value.store_id}>
        <h1
          className="text-center"
          style={{ paddingBottom: 2 + "rem", paddingTop: 3 + "rem" }}
        >
          {value.store_name}
        </h1>

        <img
          className="card-img-top img-fluid rounded mx-auto d-block"
          src={value.imageUrl}
          alt="image"
          aria-hidden="true"
        />
        <h3
          className="text-center"
          style={{ paddingBottom: 2 + "rem", paddingTop: 4 + "rem" }}
        >
          รายละเอียดร้านค้า
        </h3>
        <li className="list-group-item">
          <p style={{ marginTop: 1 + "rem" }}>
            เวลา ::{" "}
            <div class="badge badge-success" style={{ fontSize: "16px" }}>
              {value.open} น.
            </div>
          </p>
          <p>โทร :: {value.phone}</p>
          <p>ที่อยู่ :: {value.address}</p>
          <p>
            ติดต่อ ::{" "}
            <a href={value.social} style={{ color: "#F69220" }}>
              {" "}
              Facebook
            </a>
          </p>

          <div className="row col-6">
            {value.type.map((el) => (
              <h5 style={{ marginRight: 5 }}>
                <span className="badge badge-warning">{el}</span>
              </h5>
            ))}
          </div>
        </li>

        <h3
          className="text-center"
          style={{ paddingBottom: 2 + "rem", paddingTop: 4 + "rem" }}
        >
          โปรโมชั่นและส่วนลดบริการของธุรกิจ
        </h3>

        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 d-flex justify-content-center">
            <h3>
              โปรโมชั่น ::{" "}
              {this.state.pormotion.promotion_name
                ? this.state.pormotion.promotion_name
                : "ไม่มี"}
            </h3>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 d-flex justify-content-center">
            <h3>
              รายละเอียดโปรโมชั่น ::{" "}
              {this.state.pormotion.promotion_description
                ? this.state.pormotion.promotion_description
                : "ไม่มี"}
            </h3>
          </div>
        </div>
        {this.checkDiscount ? (
          <li className="list-group-item">
            <div className="container">
              {this.state.discountList.length > 0
                ? this.state.discountList.map((e, i) => {
                    return (
                      <div>
                        <div className="row ">
                          <div className="col-xs-12 col-sm-12 col-md-6 d-flex justify-content-center">
                            <h3>
                              ส่วนลดบริการ ::{" "}
                              {e.discount_name ? e.discount_name : "ไม่มี"}
                            </h3>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 d-flex justify-content-center">
                            <h3>
                              รายละเอียดส่วนลด ::{" "}
                              {e.discount_description
                                ? e.discount_description
                                : "ไม่มี"}
                            </h3>
                          </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => this.onClickDiscount(e, i)}
                            style={{ marginTop: "2rem" }}
                          >
                            คลิกขอโค้ดส่วนลด
                          </button>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </li>
        ) : null}
      </div>
    ));
    return (
      <div id="Store-Detail">
        <Navbar />
        <div className="">
          {" "}
          <div
            className="jumbotron"
            style={{ backgroundColor: "transparent", marginBottom: "5rem" }}
          >
            <div className="row marginDetail">
              <div className="col-8 ">{item}</div>
            </div>
            <div className="row justify-content-start col-xs-12 col-sm-3 col-md-2">
              <button
                type="button"
                onClick={this.onclickBack}
                className="btn btn-dark btn-block"
                style={{ marginBottom: "4rem" }}
              >
                ย้อนกลับ
              </button>
            </div>
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
export default enhance(StoreDetail);

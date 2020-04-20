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
      dataStore: {},
      checkDiscount: false,
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
        .ref(`Promotion/${this.state.Store[0].userOfStoreId}`);
      ref.once("value").then((snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          console.log(data);
          let cDate = new Date().getTime();
          let sDate = new Date(data.startDateDiscount).getTime();
          let eDate = new Date(data.endDateDiscount).getTime();
          if (cDate >= sDate && cDate <= eDate) {
            this.checkDiscount = true;
          } else {
            this.checkDiscount = false;
          }
          this.setState({ loadingData: false, pormotion: data });
        } else {
          this.setState({ loadingData: false });
        }
      });
    }, 500);
  };

  onClickBack = () => {
    window.history.back();
  };

  onClickDiscount = () => {
    let CustomerName = "";
    let obj = JSON.parse(localStorage.getItem("ObjUser"));
    let checkSigninAndOutgoogle = JSON.parse(
      localStorage.getItem("Google-login")
    );
    let checkSigninAndOutfb = JSON.parse(localStorage.getItem("FB-Login"));

    if (obj) {
      CustomerName = obj.Firstname + "-" + obj.Lastname;
    } else if (checkSigninAndOutgoogle) {
      CustomerName = checkSigninAndOutgoogle.e.profileObj.name;
    } else if (checkSigninAndOutfb) {
      CustomerName = checkSigninAndOutfb.name;
    }
    const GenCode = Math.random().toString(26).substring(2, 10).toUpperCase();
    let setItemInsert = firebase
      .database()
      .ref(`Store/${this.state.Store[0].userOfStoreId}`);
    setItemInsert.once("value").then((snapshot) => {
      if (snapshot.val()) {
        this.setState({ dataStore: snapshot.val() });
      }
    });
    setTimeout(() => {
      let newState = {};
      if (!this.state.dataStore.disCountRequest) {
        newState = {
          disCountRequest: 1,
        };
      } else if (this.state.dataStore.disCountRequest) {
        newState = {
          disCountRequest: this.state.dataStore.disCountRequest * 1 + 1,
        };
      }
      setItemInsert.update(newState);
      const setReport = firebase.database().ref(`Report`);
      let newReport = {
        ReportId: this.state.pormotion.businessId,
        discountCode: GenCode,
        businessName: this.state.pormotion.businessName,
        customerName: CustomerName,
        startDate: this.state.pormotion.startDateDiscount,
        endDate: this.state.pormotion.endDateDiscount,
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
                this.state.pormotion.endDateDiscount
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
        swal("Warning", "กรุณาเข้าสู่ระบบเพื่อขอรหัสส่วนลดบริการ", "warning");
      }
    }, 100);
  };

  render() {
    const item = this.state.Store.map((value) => (
      <div key={value.userOfStoreId}>
        <h1
          className="text-center"
          style={{ paddingBottom: 2 + "rem", paddingTop: 3 + "rem" }}
        >
          {value.Name}
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
              {value.Open} น.
            </div>
          </p>
          <p>โทร :: {value.Phone}</p>
          <p>ที่อยู่ :: {value.Address}</p>
          <p>
            ติดต่อ :: <a href={value.Ref}> Facebook</a>
          </p>

          <div className="row col-6">
            {value.Type.map((el) => (
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
        {this.checkDiscount ? (
          <li className="list-group-item">
            <div className="container">
              {" "}
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 d-flex justify-content-center">
                  <h6>โปรโมชั่น :: {this.state.pormotion.promotionName}</h6>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 d-flex justify-content-center">
                  <h6>
                    รายละเอียดโปรโมชั่น ::{" "}
                    {this.state.pormotion.promotionDescrip}
                  </h6>
                </div>
              </div>
              <div className="row ">
                <div className="col-xs-12 col-sm-12 col-md-6 d-flex justify-content-center">
                  <h6>ส่วนลดบริการ :: {this.state.pormotion.discountName}</h6>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 d-flex justify-content-center">
                  <h6>
                    รายละเอียดส่วนลด :: {this.state.pormotion.discountDescrip}
                  </h6>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.onClickDiscount}
                  style={{ marginTop: "2rem" }}
                >
                  คลิกขอโค้ดส่วนลด
                </button>
              </div>
            </div>
          </li>
        ) : null}
      </div>
    ));

    return (
      <div id="Store-Detail">
        <Navbar />
        <div className="container">
          {" "}
          <div
            className="jumbotron"
            style={{ backgroundColor: "#EBF5FF", marginBottom: "5rem" }}
          >
            <div className="row marginDetail">
              <div className="col-8 ">{item}</div>
            </div>
          </div>
          <div className="container row justify-content-start col-xs-12 col-sm-3 col-md-2">
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
export default enhance(StoreDetail);

import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import moment from "moment";
import Navbar from "../../components/navbar/navbar.js";
import swal from "sweetalert";
import "antd/dist/antd.css";
import { Tag } from "antd";

class DiscountCode extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mode: "",
      data: [],
      reportList: [],
    };
  }

  async componentDidMount() {
    let ObjUser = await JSON.parse(localStorage.getItem("ObjUser"));
    let checkSigninAndOutgoogle = await JSON.parse(
      localStorage.getItem("Google-login")
    );

    let checkSigninAndOutfb = await JSON.parse(
      localStorage.getItem("FB-Login")
    );

    let ref = firebase.database().ref("report");
    ref.once("value").then((snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val());
        if (ObjUser) {
          let arrUser = data.filter((v) => v.report_id === ObjUser.member_id);
          let cDate = new Date().getTime();
          for (let i = 0; i < arrUser.length; i++) {
            let eDate = new Date(arrUser[i].enddate_discount).getTime();
            if (cDate > eDate && !arrUser[i].status_code) {
              arrUser[i].expireDate = true;
            }
          }
          this.setState({ loadingData: false, reportList: arrUser });
        } else if (checkSigninAndOutgoogle) {
          let arrGoogle = data.filter(
            (v) => v.report_id === checkSigninAndOutgoogle.profileObj.googleId
          );
          console.log(arrGoogle);
          let cDate = new Date().getTime();
          for (let i = 0; i < arrGoogle.length; i++) {
            let eDate = new Date(arrGoogle[i].enddate_discount).getTime();
            if (cDate > eDate && !arrGoogle[i].status_code) {
              arrGoogle[i].expireDate = true;
            }
          }
          this.setState({ loadingData: false, reportList: arrGoogle });
        } else if (checkSigninAndOutfb) {
          let arrFB = data.filter(
            (v) => v.report_id === checkSigninAndOutfb.id
          );
          console.log(arrFB);
          let cDate = new Date().getTime();
          for (let i = 0; i < arrFB.length; i++) {
            let eDate = new Date(arrFB[i].enddate_discount).getTime();
            if (cDate > eDate && !arrFB[i].status_code) {
              arrFB[i].expireDate = true;
            }
          }
          this.setState({ loadingData: false, reportList: arrFB });
        }
      } else {
        this.setState({ loadingData: false });
      }
    });
  }

  render() {
    const { loadingData } = this.state;

    return (
      <div id="Discount-Code" style={{ height: "100vh" }}>
        <div style={{ marginTop: "4rem", marginBottom: "3rem" }}></div>
        <Navbar />
        <h1 className="container">Discount Code Report</h1>

        {!loadingData && (
          <div className="container table-responsive">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Discount Code</th>
                  <th scope="col">Business Name</th>
                  <th scope="col">UserName</th>

                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Status Code</th>
                </tr>
              </thead>
              <tbody>
                {this.state.reportList &&
                  this.state.reportList.map((d, index) => {
                    console.log(d);
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{d.discount_code}</td>
                        <td>{d.store_name}</td>
                        <td>{d.username}</td>

                        <td>
                          {moment(d.startdate_discount).format("DD/MM/YYYY")}
                        </td>
                        <td>
                          {moment(d.enddate_discount).format("DD/MM/YYYY")}
                        </td>
                        <td>
                          {d.expireDate ? (
                            <Tag color="volcano">Expire</Tag>
                          ) : d.status_code ? (
                            <Tag color="green">Active</Tag>
                          ) : (
                            <Tag color="blue">InActive</Tag>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        {loadingData && (
          <div className="d-flex justify-content-center row col ">
            <span
              className="spinner-border text-dark"
              style={{
                marginTop: "6rem",
                marginBottom: "2rem",
                width: "10rem",
                height: "10rem",
              }}
              role="status"
            />
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps({ firebase }) {
  return {
    Discount: firebase.ordered.discount,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/discount" }]),
  connect(mapStateToProps)
);
export default enhance(DiscountCode);

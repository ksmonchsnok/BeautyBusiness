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
    let ref = firebase.database().ref("report");
    ref.once("value").then((snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val());
        let arr = data.filter((v) => v.report_id === ObjUser.member_id);
        let cDate = new Date().getTime();
        for (let i = 0; i < arr.length; i++) {
          let eDate = new Date(arr[i].enddate_discount).getTime();
          if (cDate > eDate && !arr[i].status_code) {
            arr[i].expireDate = true;
          }
        }
        this.setState({ loadingData: false, reportList: arr });
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
                  <th scope="col">Status Code</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
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
                          {d.expireDate
                            ? "Expire"
                            : d.status_code
                            ? "Active"
                            : "InActive"}
                        </td>
                        <td>
                          {moment(d.startdate_discount).format("DD/MM/YYYY")}
                        </td>
                        <td>
                          {moment(d.enddate_discount).format("DD/MM/YYYY")}
                        </td>
                        {/* <td>
                          {d.status_code === true && (
                            <Tag color="green">in Active</Tag>
                          )}
                          {d.status_code === true && (
                            <Tag color="volcano">Active </Tag>
                          )}
                        </td> */}
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

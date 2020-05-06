import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import moment from "moment";
import "antd/dist/antd.css";
import { Switch } from "antd";
import swal from "sweetalert";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingData: false,
      reportList: [],
      setStatusList: [],
    };
  }

  async componentDidMount() {
    let ObjUser = await JSON.parse(localStorage.getItem("ObjUser"));
    let ref = firebase.database().ref("report");
    ref.once("value").then((snapshot) => {
      if (snapshot.val()) {
        let data = Object.values(snapshot.val());
        let dataKey = snapshot.val();
        let tempArr = [];
        var key = Object.keys(dataKey);
        let arr1 = Object.values(dataKey);
        let cDate = new Date().getTime();
        for (let i = 0; i < arr1.length; i++) {
          if (data[i].report_id === ObjUser.member_id) {
            tempArr.push({ key: key[i], value: arr1[i] });
          }
        }
        let arr = data.filter((v) => v.report_id === ObjUser.member_id);
        for (let i = 0; i < arr.length; i++) {
          let eDate = new Date(arr[i].enddate_discount).getTime();
          if (cDate > eDate) {
            arr[i].expireDate = true;
          }
        }
        this.setState({
          loadingData: false,
          reportList: arr,
          setStatusList: tempArr,
        });
      } else {
        this.setState({ loadingData: false });
      }
    });
  }
  onChangeStatusCode = (checked, d, index) => {
    let cDate = new Date().getTime();
    let eDate = new Date(d.enddate_discount).getTime();
    console.log(d);
    if (cDate > eDate) {
      swal("Warning", "รหัสส่วนลดหมดอายุแล้ว", "warning");
    } else {
      let data = this.state.setStatusList;
      let setId = data[index].key;
      const updateReport = firebase.database().ref("report");
      let editStore = {
        status_code: checked,
      };
      updateReport.child(setId).update(editStore);
      this.setState({ status: checked });
    }
  };

  render() {
    const { loadingData } = this.state;

    return (
      <div id="Report" style={{ height: "100vh" }}>
        <div style={{ marginTop: "4rem", marginBottom: "3rem" }}></div>
        <h2 className="container">Discount Code Report</h2>

        {!loadingData && (
          <div className="container table-responsive">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Discount Code</th>
                  <th scope="col">Business Name</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Status Discount</th>
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
                          {d.expireDate && !d.status_code ? (
                            <Switch
                              name="status_code"
                              checkedChildren="Active"
                              unCheckedChildren="Expire"
                              disabled
                              defaultChecked={false}
                            ></Switch>
                          ) : d.expireDate && d.status_code ? (
                            <Switch
                              name="status_code"
                              checkedChildren="Active"
                              unCheckedChildren="Expire"
                              disabled
                              defaultChecked={true}
                            ></Switch>
                          ) : (
                            <Switch
                              name="status_code"
                              value={d.status_code}
                              checkedChildren="Active"
                              unCheckedChildren="inActive"
                              onChange={(checked) =>
                                this.onChangeStatusCode(checked, d, index)
                              }
                              defaultChecked={d.status_code}
                            ></Switch>
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
    Store: firebase.ordered.store,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/store" }]),
  connect(mapStateToProps)
);
export default enhance(Report);

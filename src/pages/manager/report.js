import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import moment from "moment";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingData: false,
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
        this.setState({ loadingData: false, reportList: arr });
      } else {
        this.setState({ loadingData: false });
      }
    });
  }

  render() {
    const { loadingData } = this.state;

    return (
      <div id="Report">
        <div style={{ marginTop: "4rem", marginBottom: "3rem" }}></div>
        <h2 className="container">Discount Report ของธุรกิจ </h2>

        {!loadingData && (
          <div className="container table-responsive">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Discount Code</th>
                  <th scope="col">Business Name</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.reportList &&
                  this.state.reportList.map((d, index) => {
                    return (
                      <tr key={index}>
                        {/* <th scope="row"></th> */}
                        <td>{d.discount_code}</td>
                        <td>{d.store_name}</td>
                        <td>{d.username}</td>
                        <td>
                          {moment(d.startdate_discount).format("DD/MM/YYYY")}
                        </td>
                        <td>
                          {moment(d.enddate_discount).format("DD/MM/YYYY")}
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
                marginTop: "3rem",
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

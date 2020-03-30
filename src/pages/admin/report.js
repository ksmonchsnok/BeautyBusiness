import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import swal from "sweetalert";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingData: false
    };
  }

  render() {
    return (
      <div id="Report">
        <div style={{ marginTop: "4rem", marginBottom: "3rem" }}>
          <h2>Promotion Report</h2>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Promotion Code</th>
                <th scope="col">Promotion Name</th>
                <th scope="col">Business Name</th>
                <th scope="col">User Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <h2>Discount Report</h2>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Discount Code</th>
              <th scope="col">Discount Name</th>
              <th scope="col">Business Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}
function mapStateToProps({ firebase }) {
  return {
    Store: firebase.ordered.Store
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/Store" }]),
  connect(mapStateToProps)
);
export default enhance(Report);

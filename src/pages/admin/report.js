import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import swal from "sweetalert";
import moment from "moment";
class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingData: false,
    };
  }
  async componentDidMount() {
    await this.onGetItempReport();
  }

  onGetItempReport() {
    this.setState({ data: [], loadingData: true });
    setTimeout(() => {
      let ref = firebase.database().ref("Report");
      ref.once("value").then((snapshot) => {
        if (snapshot.val()) {
          const data = Object.values(snapshot.val());
          console.log(data);
          if (typeof data === "object" && data !== null && data !== undefined) {
            let arr = [];
            var key = Object.keys(data);
            let arr1 = Object.values(data);
            for (let i = 0; i < arr1.length; i++) {
              arr[key[i]] = arr1[i];
            }
            this.setState({ data: arr });
          } else {
            this.setState({ data });
          }
          this.setState({ loadingData: false });
        } else {
          this.setState({ loadingData: false });
        }
      });
    }, 1000);
  }
  render() {
    const { loadingData } = this.state;

    return (
      <div id="Report">
        <div style={{ marginTop: "4rem", marginBottom: "3rem" }}></div>
        <h2>Discount Report</h2>

        {!loadingData && (
          <div class="table-responsive">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Discount Code</th>
                  <th scope="col">Business Name</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data &&
                  this.state.data.map((d, index) => {
                    return (
                      <tr key={index}>
                        {/* <th scope="row"></th> */}
                        <td>{d.discountCode}</td>
                        <td>{d.businessName}</td>
                        <td>{d.customerName}</td>
                        <td>{moment(d.startDate).format("DD/MM/YYYY")}</td>
                        <td>{moment(d.endDate).format("DD/MM/YYYY")}</td>
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
    Store: firebase.ordered.Store,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/Store" }]),
  connect(mapStateToProps)
);
export default enhance(Report);

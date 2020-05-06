import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import moment from "moment";
import "antd/dist/antd.css";
import { Tag } from "antd";

import { Pie } from "react-chartjs-2";

class report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      store: [],
      member: [],
      loadingData: false,
      chartData: {
        labels: [
          "จำนวนผู้ใช้ทั้งหมดในระบบ",
          "จำนวนธุรกิจทั้งหมดในระบบ",
          "จำนวนผู้ใช้บริการ",
          "จำนวนเจ้าของกิจการ",
        ],
        datasets: [
          {
            label: "Population",
            data: [10, 8, 2, 8],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
          },
        ],
      },
    };
  }
  async componentDidMount() {
    await this.onGetItempReport();
    await this.renderChart();
    await this.onGetItempStore();
    await this.onGetItempStore();
  }

  onGetItempReport() {
    this.setState({ data: [], loadingData: true });
    setTimeout(() => {
      let ref = firebase.database().ref("report");
      ref.once("value").then((snapshot) => {
        if (snapshot.val()) {
          const data = Object.values(snapshot.val());
          if (typeof data === "object" && data !== null && data !== undefined) {
            let arr = [];
            var key = Object.keys(data);
            let arr1 = Object.values(data);
            let cDate = new Date().getTime();
            for (let i = 0; i < arr1.length; i++) {
              let eDate = new Date(arr1[i].enddate_discount).getTime();
              if (cDate > eDate && !arr1[i].status_code) {
                arr1[i].expireDate = true;
              }
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

  onGetItempStore = () => {
    this.setState({ store: [], loadingData: true });
    setTimeout(() => {
      let ref = firebase.database().ref("store");
      ref.once("value").then((snapshot) => {
        if (snapshot.val()) {
          const store = Object.values(snapshot.val());
          if (
            typeof store === "object" &&
            store !== null &&
            store !== undefined
          ) {
            let arr = [];
            var key = Object.keys(store);
            let arr1 = Object.values(store);
            for (let i = 0; i < arr1.length; i++) {
              arr[key[i]] = arr1[i];
            }
            this.setState({ store: arr });
          } else {
            this.setState({ store });
          }
          this.setState({ loadingData: false });
        } else {
          this.setState({ loadingData: false });
        }
      });
    }, 1000);
  };

  onGetItempMember = () => {
    this.setState({ member: [], loadingData: true });
    setTimeout(() => {
      let ref = firebase.database().ref("member");
      ref.once("value").then((snapshot) => {
        if (snapshot.val()) {
          const member = Object.values(snapshot.val());
          if (
            typeof member === "object" &&
            member !== null &&
            member !== undefined
          ) {
            let arr = [];
            var key = Object.keys(member);
            let arr1 = Object.values(member);
            for (let i = 0; i < arr1.length; i++) {
              arr[key[i]] = arr1[i];
            }
            this.setState({ member: arr });
          } else {
            this.setState({ member });
          }
          this.setState({ loadingData: false });
        } else {
          this.setState({ loadingData: false });
        }
      });
    }, 1000);
  };

  static defaultProps = {
    type: "doughnut",
    height: 100,
    width: 200,
    redraw: false,
    options: {},
    displayTitle: true,
    displayLegend: true,
    legendPosition: "left",
    position: "center",
    fontSize: 500,
    // location: "City",
  };

  renderChart = () => {
    console.log(this.chartReference);
  };

  render() {
    const { loadingData } = this.state;

    console.log(this.state.member);

    return (
      <div id="Report-List" style={{ height: "100vh" }}>
        <div style={{ marginTop: "4rem", marginBottom: "3rem" }}></div>
        <h2>Beauty Business Reports</h2>

        {/* <Pie
          id="Pie"
          data={this.state.chartData}
          options={{
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
              fontSize: this.props.fontSize,
            },
            labels: {
              fontSize: this.props.fontSize,
            },

            tooltips: {
              enabled: true,
            },
          }}
        /> */}
        {!loadingData && (
          <div class="table-responsive">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Discount Code</th>
                  <th scope="col">Business Name</th>
                  <th scope="col">Member Name</th>

                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Status Code</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data &&
                  this.state.data.map((d, index) => {
                    console.log(d);
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
    Member: firebase.ordered.member,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/store" }, { path: "/member" }]),
  connect(mapStateToProps)
);
export default enhance(report);

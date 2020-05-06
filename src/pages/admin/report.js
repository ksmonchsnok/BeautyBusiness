import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import moment from "moment";
import { Bar, Line, Pie } from "react-chartjs-2";

class report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
  }

  onGetItempReport() {
    this.setState({ data: [], loadingData: true });
    setTimeout(() => {
      let ref = firebase.database().ref("report");
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

  static defaultProps = {
    type: "doughnut",
    height: 150,
    width: 300,
    redraw: false,
    options: {},
    displayTitle: true,
    displayLegend: true,
    legendPosition: "left",
    position: "center",
    location: "City",
  };

  renderChart = () => {
    console.log(this.chartReference);
  };

  render() {
    const { loadingData } = this.state;

    return (
      <div id="Report-List" style={{ height: "100vh" }}>
        <div style={{ marginTop: "4rem", marginBottom: "3rem" }}></div>
        <h2>Beauty Business Reports</h2>

        <Pie
          id="Pie"
          data={this.state.chartData}
          options={{
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
              fontSize: 100,
            },
            labels: {
              fontSize: 50,
            },

            tooltips: {
              enabled: true,
            },
          }}
        />

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
export default enhance(report);

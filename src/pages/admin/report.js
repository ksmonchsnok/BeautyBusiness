import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import moment from "moment";
import "antd/dist/antd.css";
import { Tag } from "antd";
import { Pie, Bar } from "react-chartjs-2";

class report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      store: [],
      member: [],
      loadingData: false,
    };
  }
  async componentDidMount() {
    await this.onGetItempReport();
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

  render() {
    const { loadingData } = this.state;

    console.log(this.state.member);

    let optionsPie = {
      responsive: true,
      legend: {
        position: "right",
        labels: {
          boxWidth: 30,
        },
      },
      scales: {
        xAxes: [
          {
            ticks: { display: false },
          },
        ],
      },
    };

    const pieData = {
      labels: ["ผู้ใช้งานระบบ", "ผู้ใช้บริการ", "เจ้าของธุรกิจ"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FF3232", "#36A2EB", "#FFCE56"],
        },
      ],
    };

    const Barata = {
      labels: [
        "ตัดผมชาย",
        "เสริมสวย",
        "ทำเล็บ",
        "ต่อขนตา",
        "สักคิ้ว",
        "แว็กซ์ขน",
        "สปา",
        "Tattoo",
      ],
      datasets: [
        {
          label: "จำนวน",
          backgroundColor: "#F69220",
          borderColor: "#F69220",
          borderWidth: 1,
          stack: 1,
          hoverBackgroundColor: "#36A2EB",
          hoverBorderColor: "#36A2EB",
          data: [65, 59, 80, 81, 56, 55, 40, 20],
        },
      ],
    };

    const optionsBar = {
      responsive: true,
      legend: {
        display: false,
      },
      type: "bar",
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    };
    return (
      <div id="Report-List" style={{ height: "100%", paddingBottom: "8rem" }}>
        <div style={{ marginTop: "4rem", marginBottom: "3rem" }}></div>
        <h1>System Reports</h1>

        <div
          class="card text-center"
          style={{ width: "20rem", height: "10rem" }}
        >
          <div class="card-body text-center" style={{ padding: "-3rem" }}>
            <h2>
              ผู้ใช้งานระบบทั้งหมด
              <h1 style={{ fontSize: "5rem" }}>60</h1>
            </h2>
          </div>
        </div>

        <div id="pie" className="conatianer" style={{ marginTop: "3rem" }}>
          {" "}
          <Pie data={pieData} width={50} height={20} options={optionsPie} />
        </div>

        <div id="bar" className="conatianer" style={{ marginTop: "3rem" }}>
          {" "}
          <Bar data={Barata} width={40} height={10} options={optionsBar} />
        </div>

        {!loadingData && (
          <div class="table-responsive" style={{ marginTop: "5rem" }}>
            <h2>Discount Reports</h2>
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

import React, { Component } from "react";
import Navbar from "../../components/navbar/navbar.js";
import UpdateStore from "../regisStore/editStore.js";
import ManagePromotion from "./managePromotion.js";
import Report from "./report.js";

export default class Manager extends Component {
  state = {
    collapsed: false,
    userEditStore: "userEditStore",
  };
  componentDidMount() {
    console.log(this.props);
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onClickViewDetail = (value) => {
    this.props.history.push({
      pathname: "/Add",
      state: [value],
    });
  };

  render() {
    return (
      <div id="Manager-Page">
        <Navbar />
                <div
          className="bd-example bd-example-tabs"
          style={{
            marginTop: "-4rem",
            // marginRight: "1rem",
            height: "100%",
            marginBottom: "-3rem",
            overflow:"hidden"
          }}
        >
          <div className="row">
            <div
              className="col-xs-12  col-sm-12 col-md-12 col-lg-3 col-xl-2"
              style={{ backgroundColor: "#343a40" }}
            >
              <h1 className="text-left" style={{ marginLeft: "1.5rem" ,marginTop: "3rem" ,color:"#fff" }}>
          เจ้าของธุรกิจ
        </h1>
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="nav-link active show"
                  id="v-pills-manageStore-tab"
                  data-toggle="pill"
                  href="#v-pills-manageStore"
                  role="tab"
                  aria-controls="v-pills-manageStore"
                  aria-selected="true"
                  style={{ marginTop: "1rem" }}
                >
                  <ion-icon name="home-outline" size="small" /> &emsp;
                  จัดการธุรกิจ
                </a>
                <a
                  className="nav-link"
                  id="v-pills-managePromotion-tab"
                  data-toggle="pill"
                  href="#v-pills-managePromotion"
                  role="tab"
                  aria-controls="v-pills-managePromotion"
                  aria-selected="false"
                >
                  <ion-icon name="volume-high-outline" size="small" />
                  &emsp; จัดการโปรโมชั่น
                </a>
                <a
                  className="nav-link"
                  id="v-pills-Report-tab"
                  data-toggle="pill"
                  href="#v-pills-Report"
                  role="tab"
                  aria-controls="v-pills-Report"
                  aria-selected="false"
                >
                  <ion-icon name="bar-chart-outline" size="small" /> &emsp;
                  ดูรายงาน
                </a>
              </div>
            </div>
            <div className="col card" style={{ margin: "1rem"}}>
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade active show"
                  id="v-pills-manageStore"
                  role="tabpanel"
                  aria-labelledby="v-pills-manageStore-tab"
                >
                  <UpdateStore UserEditStore={this.state.userEditStore} />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-managePromotion"
                  role="tabpanel"
                  aria-labelledby="v-pills-managePromotion-tab"
                >
                  <ManagePromotion history={this.props.location} />
                </div>

                <div
                  className="tab-pane fade"
                  id="v-pills-Report"
                  role="tabpanel"
                  aria-labelledby="v-pills-Report-tab"
                >
                  <Report />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

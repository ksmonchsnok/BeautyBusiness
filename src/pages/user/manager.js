import React, { Component } from "react";
import Navbar from "../../components/navbar/navbar-Manager.js";
import UpdateStore from "../manager/updateStorer.js";
import ManagePromotion from "../manager/managePromotion.js";
import Report from "../manager/report.js";

export default class Manager extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  onClickViewDetail = value => {
    this.props.history.push({
      pathname: "/Add",
      state: [value]
    });
  };

  render() {
    return (
      <div id="Manager-Page">
        <Navbar />
        <h2 className="text-left" style={{ marginLeft: "1.5rem" }}>
          Manager Business
        </h2>
        <hr />
        <div
          className="bd-example bd-example-tabs"
          style={{
            marginTop: "-1rem",
            marginRight: "1rem",
            height: "auto",
            marginBottom: "-3rem"
          }}
        >
          <div className="row">
            <div
              className="col-xs-5 col-sm-7 col-md-2 col-lg-2"
              style={{ backgroundColor: "#343a40" }}
            >
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
            <div className="col-10">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade active show"
                  id="v-pills-manageStore"
                  role="tabpanel"
                  aria-labelledby="v-pills-manageStore-tab"
                >
                  <UpdateStore />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-managePromotion"
                  role="tabpanel"
                  aria-labelledby="v-pills-managePromotion-tab"
                >
                  <ManagePromotion />
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

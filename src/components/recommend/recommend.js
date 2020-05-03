import React, { Component } from "react";
import "../../style.css";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import "antd/dist/antd.css";
import { Tag } from "antd";
import { StarTwoTone } from "@ant-design/icons";

class Recommened extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Store: [],
      loadingData: false,
    };
  }

  onClickViewDetail = (value) => {
    this.props.history.push({
      pathname: "/StoreDetail",
      state: [value],
    });
  };

  onClickViewAllStore = () => {
    this.props.history.push("/AllStores");
  };

  render() {
    const { loadingData } = this.state;
    let Store = [];
    let rootRef = firebase.database().ref("store");
    let Ref = rootRef
      .orderByChild("recommend")
      .equalTo("true")
      .on("child_added", (snapshot) => {
        Store.push(snapshot.val());
      });

    const item = Store.map((value) => (
      <div className="col-lg-4">
        <a href onClick={() => this.onClickViewDetail(value)}>
          <div key={value.store_id}>
            <div class="">
              <img
                src={value.imageUrl}
                className="bd-placeholder-img rounded-circle"
                width="170"
                height="170"
                focusable="false"
                role="img"
                aria-label="Placeholder: 140x140"
              ></img>
              <h2>{value.store_name}</h2>
              {value.type.map((el) => (
                <Tag color="blue">{el}</Tag>
              ))}
              <p>
                <a
                  // class="btn btn-secondary"
                  // href="#"
                  // role="button"
                  onClick={() => this.onClickViewDetail(value)}
                >
                  View details »
                </a>
              </p>
            </div>
          </div>
        </a>
      </div>
    ));

    return (
      <div id="Recommend">
        <div
          className="container jumbotron jumbotron-fluid"
          style={{ backgroundColor: "transparent" }}
        >
          <h1
            className="col text-left font row"
            style={{ marginBottom: "-2rem" }}
          >
            ร้านยอดนิยม &nbsp;
            <StarTwoTone twoToneColor="#FF0000" />
          </h1>
        </div>
        <div className="row d-flex justify-content-end">
          <a
            href
            className="nav-link link-menu "
            onClick={this.onClickViewAllStore}
          >
            ดูทั้งหมด>>
          </a>
        </div>
        {!loadingData && (
          <div
            className="row"
            style={{ marginTop: "1.5rem" }}
            history={this.props.history}
          >
            {item}
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
        <hr />
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

export default enhance(Recommened);

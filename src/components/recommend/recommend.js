import React, { Component } from "react";
import "../../style.css";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

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
    let rootRef = firebase.database().ref("Store");
    let Ref = rootRef
      .orderByChild("Recommend")
      .equalTo("true")
      .on("child_added", (snapshot) => {
        Store.push(snapshot.val());
      });

    const item = Store.map((value) => (
      <div className="">
        <a href onClick={() => this.onClickViewDetail(value)}>
          <div key={value.ItemID}>
            <div class="col-lg-4">
              <img
                src={value.imageUrl}
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                focusable="false"
                role="img"
                aria-label="Placeholder: 140x140"
              ></img>
              <h2>{value.Name}</h2>
              {value.Type.map((el) => (
                <p
                  style={{
                    marginLeft: -2,
                    marginRight: 8,
                    marginBottom: 3,
                    marginTop: 0.5,
                    fontWeight: "lighter",
                    fontSize: 14 + "px",
                  }}
                  className="badge badge-warning"
                >
                  {el}
                </p>
              ))}
              <p>
                <a
                  class="btn btn-secondary"
                  href="#"
                  role="button"
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
            ร้านแนะนำ
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
          <div style={{ marginTop: "1.5rem" }} history={this.props.history}>
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
    Store: firebase.ordered.Store,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/Store" }]),
  connect(mapStateToProps)
);

export default enhance(Recommened);

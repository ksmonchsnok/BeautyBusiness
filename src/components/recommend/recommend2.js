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

  componentWillMount = () => {
    // console.log(this.props);
  };

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
    let Store = [];
    let rootRef = firebase.database().ref("Store");
    let Ref = rootRef
      .orderByChild("Recommend")
      .equalTo("true")
      .on("child_added", (snapshot) => {
        Store.push(snapshot.val());
      });

    const item = Store.map((value) => (
      <div className="col-lg-3 col-md-6">
        <div key={value.ItemID}>
          <a href onClick={() => this.onClickViewDetail(value)}>
            <img
              className="card-img-top img-fluid rounded mx-auto d-block"
              src={value.imageUrl}
              alt="imageStore"
              style={{ width: "100%;", height: "200px" }}
            />
            <div className="card-body text-left mb-auto">
              <h6 className="styleFont">
                <p className="font">{value.Name}</p>
                <hr />
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
              </h6>
            </div>
          </a>
        </div>
      </div>
    ));

    const { loadingData } = this.state;

    return (
      <div id="Recommend">
        <div
          className="jumbotron jumbotron-fluid"
          style={{ backgroundColor: "transparent" }}
        >
          <h2
            className="col text-left font row"
            style={{ marginBottom: "-2rem" }}
          >
            แนะนำ
          </h2>
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

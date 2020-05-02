import React, { Component } from "react";
import "../../style.css";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import pic from "../../assets/image/pic1.jpg";

class Promote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Promotion: [],
      Discount: [],
      loadingData: false,
    };
  }

  componentDidMount = () => {
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
    const { loadingData } = this.state;

    let Promotion = [];

    let rootRefPromotion = firebase.database().ref("promotion");

    rootRefPromotion
      .orderByChild("promotion_status")
      .equalTo(true)
      .on("child_added", (snapshot) => {
        Promotion.push(snapshot.val());
        console.log(Promotion);
      });

    // let Discount = [];

    // let rootRef = firebase.database().ref("discount");

    // rootRef
    //   .orderByChild("discount_status")
    //   .equalTo(true)
    //   .on("child_added", (snapshot) => {
    //     Promotion.push(snapshot.val());
    //     // console.log(Promotion);
    //   });

    const promotion = Promotion.map((value) => (
      <div className="col-lg-4 d-flex justify-content-center">
        <div key={value.store_id}>
          <a href onClick={() => this.onClickViewDetail(value)}>
            <h2>{value.store_name}</h2>
            <h2>{value.promotion_name}</h2>
            <h2>{value.promotion_description}</h2>

            <p>
              <a
                className="btn btn-secondary"
                href="#"
                role="button"
                onClick={() => this.onClickViewDetail(value)}
              >
                View details »
              </a>
            </p>
          </a>
        </div>
      </div>
    ));

    return (
      <div id="Promote" style={{ marginBottom: "5rem" }}>
        <div className="container marketing">
          <h1 className="text-left">โปรโมชั่น</h1>
          {!loadingData && (
            <div className="row" history={this.props.history}>
              {promotion}
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

          {/* {!loadingData && <div history={this.props.history}> {discount}</div>} */}
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
      </div>
    );
  }
}

function mapStateToProps({ firebase }) {
  return {
    Promotion: firebase.ordered.promotion,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/promotion" }]),
  connect(mapStateToProps)
);

export default enhance(Promote);

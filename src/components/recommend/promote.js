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

    let rootRefPromotion = firebase.database().ref("Promotion");

    rootRefPromotion
      .orderByChild("Promotion")
      .equalTo(true)
      .on("child_added", (snapshot) => {
        Promotion.push(snapshot.val());
        console.log(Promotion);
      });

    let Discount = [];

    let rootRef = firebase.database().ref("Promotion");

    rootRef
      .orderByChild("Discount")
      .equalTo(true)
      .on("child_added", (snapshot) => {
        Promotion.push(snapshot.val());
        console.log(Promotion);
      });

    const promotion = Promotion.map((value) => (
      <div className="col-lg-4 d-flex justify-content-center">
        <div key={value.BusinessId}>
          <a href onClick={() => this.onClickViewDetail(value)}>
            {/* <img
              src={value.imageUrl}
              alt="imageStore"
              className="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              role="img"
              focusable="false"
            ></img> */}

            <h2>{value.businessName}</h2>
            <h2>{value.promotionName}</h2>
            <h2>{value.promotionDescrip}</h2>

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

    const discount = Discount.map((value) => (
      <div className="row featurette">
        <div key={value.ItemID}>
          <a href onClick={() => this.onClickViewDetail(value)}>
            <div className="col-md-7">
              <h2 className="featurette-heading">
                {value.Name}
                <span class="text-muted">
                  {" "}
                  <small>{value.Address}</small>
                </span>
              </h2>

              <p className="lead">{value.StoreType}</p>
            </div>

            <div className="col-md-5">
              <img
                src={pic}
                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                width="500"
                height="500"
                role="img"
                focusable="false"
              ></img>
            </div>
            <hr className="featurette-divider" />
          </a>
        </div>
      </div>
    ));

    return (
      <div id="Promote" style={{ marginBottom: "5rem" }}>
        <div className="container marketing">
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

          {!loadingData && <div history={this.props.history}> {discount}</div>}
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
    Promotion: firebase.ordered.Promotion,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/Promotion" }]),
  connect(mapStateToProps)
);

export default enhance(Promote);

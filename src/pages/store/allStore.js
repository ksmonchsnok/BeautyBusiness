import React, { Component } from "react";
import "../../style.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import firebase from "firebase";
import Navbar from "../../components/navbar/navbar.js";

class AllStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Store: []
    };
  }

  onClickViewDetail = value => {
    this.props.history.push({
      pathname: "/detail",
      state: [value]
    });
  };

  render() {
    let Store = [];
    let rootRef = firebase.database().ref("Store");
    let Ref = rootRef.orderByChild("Store").on("child_added", snapshot => {
      Store.push(snapshot.val());
    });

    const item = Store.map(value => (
      <div className="col-lg-3 col-md-6">
        <div key={value.ID}>
          <a href="" onClick={() => this.onClickViewDetail(value)}>
            <img
              className="card-img-top img-fluid rounded mx-auto d-block"
              src={value.Image}
              alt="image"
            />{" "}
            <div className="card-body text-left mb-auto">
              <h6 className="styleFont">
                <p className="font">{value.Name}</p>
                <hr />
                {value.Type.map(el => (
                  <p
                    style={{
                      marginLeft: -2,
                      marginRight: 8,
                      marginBottom: 3,
                      marginTop: 0.5,
                      fontWeight: "lighter",
                      fontSize: 14 + "px"
                    }}
                    className="badge badge-secondary"
                  >
                    {el}
                  </p>
                ))}
                <p style={{ lineHeight: 1 + "rem", color: "#000" }}>
                  {value.Address}
                </p>
              </h6>
            </div>
          </a>
        </div>
      </div>
    ));
    return (
      <div id="AllStore">
        <Navbar />
        <div className="container">
          <h2 className="text-center font">ร้านทั้งหมด</h2>
          <div className="album  bg-while pad ">
            <div className="row">{item}</div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ firebase }) {
  return {
    Store: firebase.ordered.Store
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/Store" }]),
  connect(mapStateToProps)
);

export default enhance(AllStore);

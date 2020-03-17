import React, { Component } from "react";
import "../../style.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Navbar from "../../components/navbar/navbar.js";

class StoreDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { Store: [] };
  }

  componentWillMount = () => {
    this.Data();
  };

  Data = () => {
    let Store = this.state.Store;
    this.setState({ Store: this.props.history.location.state });
  };

  onClickBack = () => {
    this.props.history.push("/AllStores");
  };
  render() {
    const item = this.state.Store.map(value => (
      <div key={value.ID}>
        <h1
          className="text-center"
          style={{ paddingBottom: 2 + "rem", paddingTop: 3 + "rem" }}
        >
          {value.Name}
        </h1>

        <img
          className="card-img-top img-fluid rounded mx-auto d-block"
          src={value.Image}
          alt="image"
        />
        <h3
          className="text-center"
          style={{ paddingBottom: 2 + "rem", paddingTop: 4 + "rem" }}
        >
          รายละเอียดร้านค้า
        </h3>
        <li className="list-group-item">
          <p style={{ marginTop: 1 + "rem" }}>เวลา :: {value.Open}</p>
          <p>โทร :: {value.Phone}</p>
          <p>{value.Address}</p>
          <p>
            ติดต่อ :: <a href={value.Ref}> Facebook</a>
          </p>

          <div className="row col-6">
            {value.Type.map(el => (
              <h4 style={{ marginRight: 5 }}>
                <span className="badge badge-warning">{el}</span>
              </h4>
            ))}
          </div>

          <a href>
            <h6 style={{ color: "red" }}>คลิกขอโค้ดส่วนลด</h6>
          </a>
        </li>
      </div>
    ));

    return (
      <div id="Store-Detail">
        <Navbar />

        <div
          className="container jumbotron"
          style={{ backgroundColor: "#EBF5FF" }}
        >
          <div className="row marginDetail">
            <div className="col-8 ">{item}</div>
          </div>
          <div
            className="row align-content-center justify-content-start"
            style={{
              marginLeft: "1rem",
              marginTop: "5rem",
              marginBottom: "-3rem"
            }}
          >
            <button
              type="button"
              class="btn btn-dark"
              onClick={this.onClickBack}
            >
              Back
            </button>
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
export default enhance(StoreDetail);

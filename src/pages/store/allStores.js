import React, { Component } from "react";
import "../../style.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Filter from "../../components/filter/filter.js";
import Navbar from "../../components/navbar/navbar.js";

class AllStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: "",
      checkbox: [],
      rating: 0,
      discount: false,
      promotion: false,
    };
  }

  onclickBack = () => {
    window.history.back();
  };

  searchHandler = (event) => {
    this.setState({
      store: event.target.value,
    });
  };

  onCheckType = (e) => {
    let checkbox = this.state.checkbox;
    let index = checkbox.findIndex((el) => el === e);
    if (index < 0) {
      checkbox.push(e);
    } else {
      checkbox.splice(index, 1);
    }
    this.setState({ checkbox: checkbox });
  };

  // onCheckDiscount = e => {
  //   if (this.state.discount === "true") {
  //     this.setState({ discount: e });
  //   } else {
  //     this.setState({ discount: "" });
  //   }
  // };

  // onCheckPromotion = e => {
  //   if (this.state.promotion === "true") {
  //     this.setState({ promotion: e });
  //   } else {
  //     this.setState({ promotion: "" });
  //   }
  // };

  checkType = (value, checkbox) => {
    if (this.state.checkbox.length === 0) {
      return true;
    }
    const settype = new Set(value);
    let Data = false;
    for (let i = 0; i < checkbox.length; i++) {
      if (Data) {
        break;
      } else {
        Data = settype.has(checkbox[i]);
      }
    }
    return Data;
  };

  onClickViewDetail = (value) => {
    this.props.history.push({
      pathname: "/StoreDetail",
      state: [value],
    });
  };

  searchFilter = (store) => {
    return function (x) {
      return (
        x.value.Name.toLowerCase().includes(store.toLowerCase()) ||
        x.value.Address.toLowerCase().includes(store.toLowerCase()) ||
        x.value.Type[0].toLowerCase().includes(store.toLowerCase()) ||
        !store
      );
    };
  };
  render() {
    const { store, checkbox } = this.state;
    const { Store } = this.props;

    const item = Store
      ? Store.filter(this.searchFilter(store))
          .filter(({ key, value }) => {
            return this.checkType(value.Type, checkbox);
          })
          .map(({ key, value }) => {
            if (this.state.rating === 0) {
              return (
                <div className="col-lg-4 col-md-6">
                  <div key={value.ItemID}>
                    <a href onClick={() => this.onClickViewDetail(value)}>
                      <img
                        className="card-img-top img-fluid rounded mx-auto d-block"
                        src={value.imageUrl}
                        alt="image"
                        style={{ width: "300px", height: "250px" }}
                        aria-hidden="true"
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
                              }}
                              class="badge badge-warning"
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
              );
            }
            if (value.Star >= this.state.rating) {
              return (
                <div className="col-lg-4 col-md-6">
                  <div key={value.ItemID}>
                    <a href onClick={() => this.onClickViewDetail(value)}>
                      <img
                        className="card-img-top img-fluid rounded mx-auto d-block"
                        src={value.imageUrl}
                        alt="image"
                        style={{ width: "300px", height: "250px" }}
                        aria-hidden="true"
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
                              }}
                              className="badge badge-warning"
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
              );
            }
          })
      : "";

    return (
      <div id="search">
        <Navbar />
        <div className="search align-self-center">
          <div className="container">
            <p>
              <h2
                className="font"
                style={{
                  marginBottom: "3.5rem",
                }}
              >
                ธุรกิจทั้งหมด
              </h2>
              {/* <div className="dropdown-divider" /> */}
            </p>

            <div className="album  bg-while">
              <div
                className="row"
                // style={{border:"0.5px solid gray"}}
              >
                <div
                  className="col-lg-3 col-md-5 col-sm-6 jumbotron jumbotron-fluid"
                  style={{ marginTop: "-6rem", backgroundColor: "transparent" }}
                >
                  <form className="d-flex justify-content-start">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="ค้นหาธุรกิจ..."
                      aria-label="Search"
                      onChange={this.searchHandler}
                      value={store}
                      style={{
                        marginTop: "4rem",
                        marginLeft: "1rem",
                        marginRight: "1rem",
                      }}
                    />
                  </form>
                  <Filter
                    onCheckType={(e) => this.onCheckType(e)}
                    onFilterRating={(e) => this.onFilterRating(e)}
                    rating={this.state.rating}
                  />
                </div>

                <div
                  className="col-lg-9 col-md-7 col-sm-6"
                  style={{ marginTop: "-3rem" }}
                >
                  <ul
                    className="list-group jumbotron jumbotron-fluid "
                    style={{ backgroundColor: "transparent" }}
                  >
                    <div className="row">{item}</div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-content-start">
            <div className="container">
              <div className="col-xs-12 col-sm-4 col-md-2">
                <button
                  type="button"
                  onClick={this.onclickBack}
                  className="btn btn-dark btn-block"
                  style={{ marginBottom: "4rem" }}
                >
                  ย้อนกลับ
                </button>
              </div>
            </div>
          </div>
        </div>
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

export default enhance(AllStore);

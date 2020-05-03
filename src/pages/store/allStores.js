import React, { Component } from "react";
import "../../style.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Filter from "../../components/filter/filter.js";
import Navbar from "../../components/navbar/navbar.js";
import "antd/dist/antd.css";
import { Tag } from "antd";
import firebase from "firebase";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";
import { BackTop } from "antd";
import "antd/dist/antd.css";
import { UpOutlined } from "@ant-design/icons";


class AllStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: "",
      checkbox: [],
      rating: 0,
      discount: true,
      promotion: true,
      arrStore: []
    };
  }
  componentDidMount() {
    let ref = firebase.database().ref("store");
    ref.once("value").then((snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val());
        const data1 = []
        if (typeof data === "object" && data !== null && data !== undefined) {
          let arr = [];
          var key = Object.keys(data);
          let arr1 = Object.values(data);
          for (let i = 0; i < arr1.length; i++) {
            arr[key[i]] = arr1[i];
            data1.push({ key:  key[i] , value : arr1[i]})
          }
          this.setState({ arrStore: data1 });
        }
      }
    })
  };

  onclickBack = () => {
    window.history.back();
  };

  searchHandler = (event) => {
    this.setState({
      store: event.target.value,
    });
  };
  FillterBusiness = (e) => {
    console.log(e);
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

  onCheckDiscount = (e) => {
    console.log(e);
    this.setState({ discount: e });
  };

  onCheckPromotion = (e) => {
    this.setState({ promotion: e });
  };

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

  searchFilter = (store, type, discount, promotion) => {
    if (discount != null || promotion != null) {
      let tetst = false;
      return function (x) {
        if (
          (discount && x.value.discount_status) ||
          (promotion && x.value.promotion_status)
        ) {
          if (type.length > 0) {
            for (let i = 0; i < x.value.type.length; i++) {
              for (let j = 0; j < type.length; j++) {
                if (x.value.type[i] === type[j]) {
                  tetst = true;
                  if (tetst) {
                    return (
                      x.value.store_name
                        .toLowerCase()
                        .includes(store.toLowerCase()) &&
                      true &&
                      tetst
                    );
                  }
                }
              }
            }
          } else if (store) {
            return (
              x.value.store_name.toLowerCase().includes(store.toLowerCase()) &&
              true
            );
          } else {
            return true;
          }
        } else if (
          (!discount && !x.value.discount_status) ||
          (!promotion && !x.value.promotion_status)
        ) {
          if (type.length > 0) {
            for (let i = 0; i < x.value.type.length; i++) {
              for (let j = 0; j < type.length; j++) {
                if (x.value.type[i] === type[j]) {
                  tetst = true;
                  if (tetst) {
                    return (
                      x.value.store_name
                        .toLowerCase()
                        .includes(store.toLowerCase()) &&
                      true &&
                      tetst
                    );
                  }
                }
              }
            }
          } else if (store) {
            return (
              x.value.store_name.toLowerCase().includes(store.toLowerCase()) &&
              true
            );
          } else {
            return true;
          }
        }
      };
    }
    // if (type.length > 0) {
    //   if (store && type.length > 0) {
    //     return function (x) {
    //       for (let i = 0; i < x.value.type.length; i++) {
    //         for (let j = 0; j < type.length; j++) {
    //           if (x.value.type[i] === type[j]) {
    //             return x.value.store_name.toLowerCase().includes(store.toLowerCase()) && true
    //           }
    //         }
    //       }
    //     };
    //   } else {
    //     return function (x) {
    //       for (let i = 0; i < x.value.type.length; i++) {
    //         for (let j = 0; j < type.length; j++) {
    //           if (x.value.type[i] === type[j]) {
    //             return true
    //           }
    //         }
    //       }
    //     };
    //   }
    // } else {
    //   return function (x) {
    //     return (
    //       x.value.store_name.toLowerCase().includes(store.toLowerCase()) ||
    //       x.value.address.toLowerCase().includes(store.toLowerCase()) ||
    //       !store
    //     );
    //   };
    // }
  };

  render() {
    const { store, promotion, discount, checkbox, arrStore } = this.state;
    // const { Store } = this.props;)
    const item = arrStore
      ? arrStore.filter(
        this.searchFilter(store, checkbox, discount, promotion)
      ).map(({ key, value }) => {
        if (this.state.rating === 0) {
          return (
            <div className="col-lg-4 col-md-6">
              <div key={value.store_id}>
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
                      <h2>{value.store_name}</h2>
                      <hr />

                      {value.type.map((el) => (
                        <Tag color="gold" style={{ marginBottom: "0.6rem" }}>
                          {el}
                        </Tag>
                      ))}

                      <h4 style={{ color: "#000" }}>{value.address}</h4>
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
              <div key={value.store_id}>
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
                      <p className="font">{value.store_name}</p>
                      <hr />
                      {value.type.map((el) => (
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
                        {value.address}
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


      const style = {
        height: 40,
        width: 40,
        lineHeight: "40px",
        borderRadius: 4,
        backgroundColor: "#F69220",
        color: "#fff",
        textAlign: "center",
        fontSize: 14,
      };

    return (
      <div id="search" >
        <Navbar />
        <div className="search align-self-center">
          <div style={{ padding: "0 1rem 0 1rem " }}>
            <p>
              <h1
                style={{
                  marginBottom: "3rem",
                }}
              >
                ธุรกิจทั้งหมด
              </h1>
              {/* <div className="dropdown-divider" /> */}
            </p>

            <div className="card" style={{paddingLeft:"1rem", paddingRight:"1rem",paddingTop:"1rem"}}>
              <div
                className="row"
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
                    onCheckDiscount={(e) => this.onCheckDiscount(e)}
                    onCheckPromotion={(e) => this.onCheckPromotion(e)}
                    onFilterRating={(e) => this.onFilterRating(e)}
                    rating={this.state.rating}
                  />
                </div>
               
                <div
                  className="col-lg-9 col-md-7 col-sm-6"
                  style={{ marginTop: "-3rem" }}
                >
                   <ScrollAnimation animateIn="bounceInUp">
              <div class="animated bounceInUp delay-2s">
                  <ul
                    className="list-group jumbotron jumbotron-fluid "
                    style={{ backgroundColor: "transparent" }}
                  >
                    <div className="row">{item}
                  </div>
                  <BackTop>
            <div style={style}>
              <UpOutlined />
            </div>
          </BackTop>
                  </ul>
                  </div>
            </ScrollAnimation>
           
                </div>
            
              </div>
              <div className="justify-content-start">
            <div style={{ padding: "0 3rem 0 3rem " }}>
              <div className="col-xs-12 col-sm-4 col-md-2">
                <button
                  type="button"
                  onClick={this.onclickBack}
                  className="btn btn-dark btn-block"
                  style={{ marginBottom: "5rem" }}
                >
                  ย้อนกลับ
                </button>
              </div>
            </div>
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
    Store: firebase.ordered.store,
    Promotion: firebase.ordered.promotion,
    discount: firebase.ordered.discount,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/store", path: "/promotion", path: "/discount" }]),
  connect(mapStateToProps)
);

export default enhance(AllStore);

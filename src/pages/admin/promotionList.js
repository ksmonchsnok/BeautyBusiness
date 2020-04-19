import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Button } from "antd";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import swal from "sweetalert";

class storeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingData: false,
    };
  }
  async componentDidMount() {
    await this.onGetItempPromotion();
  }

  onGetItempPromotion() {
    this.setState({ data: [], loadingData: true });
    setTimeout(() => {
      let ref = firebase.database().ref("Promotion");
      ref.once("value").then((snapshot) => {
        if (snapshot.val()) {
          const data = Object.values(snapshot.val());
          if (typeof data === "object" && data !== null && data !== undefined) {
            let arr = [];
            var key = Object.keys(data);
            let arr1 = Object.values(data);
            for (let i = 0; i < arr1.length; i++) {
              arr[key[i]] = arr1[i];
            }
            this.setState({ data: arr });
          } else {
            this.setState({ data });
          }
          this.setState({ loadingData: false });
        } else {
          this.setState({ loadingData: false });
        }
      });
    }, 1000);
  }

  handleEdit = (obj) => {
    console.log("Data", obj);

    swal({
      title: "Please Confirm for Edit ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.history.push("/managePromotionAndDiscount", {
          obj,
          mode: "edit",
        });
      } else {
        return;
      }
    });
  };

  handleDelete = (d, index) => {
    swal({
      title: "Please Confirm for Delete ?",
      icon: "error",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        firebase.remove(`Promotion/${d.businessId}`);
        this.onGetItempPromotion();
      } else {
        return;
      }
    });
  };

  onClickCreateNewBusiness = (e) => {
    let props = this.props;
    this.props.history.push("/AddStore", +props);
  };

  onClickCreatePromotion = () => {
    this.props.history.push("/managePromotionAndDiscount");
  };

  render() {
    const { loadingData } = this.state;

    return (
      <div id="User-List">
        <div style={{ marginTop: "3rem", marginBottom: "4rem" }}>
          <h2>Promotion List</h2>{" "}
          <div className="row">
            {" "}
            <div
              className="col d-flex justify-content-start"
              style={{ marginBottom: "2rem", marginTop: "1rem" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.onClickCreatePromotion}
              >
                Create Promotion And Discount
              </Button>
            </div>
          </div>
          {!loadingData && (
            <div class="table-responsive">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    {/* <th scope="col">Business ID</th> */}
                    <th scope="col">Business Name</th>
                    <th scope="col">Promotion Name</th>
                    <th scope="col">Promotion Description</th>
                    <th scope="col">Status Promotion</th>
                    <th scope="col">Discount Name</th>
                    <th scope="col">Discount Description</th>
                    <th scope="col">Status Discount</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data &&
                    this.state.data.map((d, index) => {
                      return (
                        <tr key={index}>
                          {/* <th scope="row"></th> */}
                          <td>{d.businessName}</td>
                          <td>{d.promotionName}</td>
                          <td>{d.promotionDescrip}</td>
                          <td>{d.promotionAmount}</td>
                          <td>{d.discountName}</td>
                          <td>{d.discountDescrip}</td>
                          <td>{d.discountAmount}</td>
                          <td>
                            <a href>
                              <ion-icon
                                name="create-outline"
                                size="large"
                                onClick={() => this.handleEdit(d, index)}
                              ></ion-icon>
                            </a>
                          </td>
                          <td>
                            <a href>
                              <ion-icon
                                size="large"
                                name="trash-outline"
                                onClick={() => this.handleDelete(d, index)}
                              ></ion-icon>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
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

export default enhance(storeList);

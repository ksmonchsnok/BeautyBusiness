import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Button, Tag } from "antd";
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
    await this.onGetItemp();
  }
  onGetItemp() {
    this.setState({ data: [], loadingData: true });

    setTimeout(() => {
      let ref = firebase.database().ref("store");
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

  handleManagePromotion = (obj) => {
    swal({
      title: "Please Confirm to Manage Promotion And Discount",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.history.push("/managePromotionAnddiscount", {
          store_id: obj.store_id,
          mode: "edit",
        });
      } else {
        return;
      }
    });
  };

  handleEdit = (obj) => {
    swal({
      title: "Please Confirm to Edit",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.history.push("/AddStore", { obj, mode: "edit" });
      } else {
        return;
      }
    });
  };

  handleDelete = (d, index) => {
    const itemsRef = firebase.database().ref("store");
    swal({
      title: "Please Confirm to Delete",
      icon: "error",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        itemsRef.child(d.store_id).remove();
        this.onGetItemp();
      } else {
        return;
      }
    });
  };

  onClickCreateNewBusiness = (e) => {
    let props = this.props;
    this.props.history.push("/AddStore", +props);
  };

  render() {
    const { loadingData } = this.state;

    return (
      <div id="Store-List" style={{ height: "100vh" }}>
        <div style={{ marginTop: "3rem", marginBottom: "4rem" }}>
          <h2>Business List</h2>{" "}
          <div
            className="d-flex justify-content-start"
            style={{ marginBottom: "2rem", marginTop: "1rem" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.onClickCreateNewBusiness}
            >
              Create New Business
            </Button>
          </div>
          {!loadingData && (
            <div class="table-responsive">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Business Name</th>
                    <th scope="col">Open Store</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Business Type</th>
                    <th scope="col">Service Type</th>
                    <th scope="col">Promotion</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data &&
                    this.state.data.map((d, index) => {
                      return (
                        <tr key={index} id="select-row">
                          <th scope="row">{index + 1}</th>
                          <td>{d.store_name}</td>
                          <td>{d.open}</td>
                          <td>{d.phone}</td>
                          <td>
                            {d.store_type === "มีหน้าร้าน" && (
                              <Tag color="magenta">{d.store_type}</Tag>
                            )}
                            {d.store_type === "ฟรีแลนซ์" && (
                              <Tag color="purple">{d.store_type}</Tag>
                            )}
                          </td>
                          <td>
                            {d.type
                              ? d.type.length > 0
                                ? d.type.map((el) => (
                                    <Tag color="green">{el}</Tag>
                                  ))
                                : null
                              : null}
                          </td>
                          <td>
                            <a href className="d-flex justify-content-center">
                              <ion-icon
                                name="settings-sharp"
                                className="text-center"
                                size="large"
                                style={{ color: "#FFB400" }}
                                onClick={() =>
                                  this.handleManagePromotion(d, index)
                                }
                              ></ion-icon>
                            </a>
                          </td>
                          <td>
                            <a href>
                              <ion-icon
                                name="create-sharp"
                                size="large"
                                style={{ color: "#32B8FF" }}
                                onClick={() => this.handleEdit(d, index)}
                              ></ion-icon>
                            </a>
                          </td>
                          <td>
                            <a href>
                              {" "}
                              <ion-icon
                                name="trash-sharp"
                                size="large"
                                style={{ color: "#FF4646" }}
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
                  marginTop: "7rem",
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
    Store: firebase.ordered.store,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/store" }]),
  connect(mapStateToProps)
);

export default enhance(storeList);

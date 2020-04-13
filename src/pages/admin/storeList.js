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
    await this.onGetItemp();
  }
  onGetItemp() {
    this.setState({ data: [], loadingData: true });

    setTimeout(() => {
      let ref = firebase.database().ref("Store");
      ref.once("value").then((snapshot) => {
        const data = snapshot.val();
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
        this.props.history.push("/AddStore", { obj, mode: "edit" });
      } else {
        return;
      }
    });
  };

  handleDelete = (d, index) => {
    console.log("ID", d.ItemID, "index", index);
    const itemsRef = firebase.database().ref("Store");
    swal({
      title: "Please Confirm for Delete ?",
      icon: "error",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        itemsRef.child(d.ItemID).remove();
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
    console.log(this.state.data);
    const { loadingData } = this.state;

    return (
      <div id="User-List">
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
                    <th scope="col">Business ID</th>
                    <th scope="col">Business Name</th>
                    <th scope="col">Open Store</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Business Type</th>
                    <th scope="col">Service Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data &&
                    this.state.data.map((d, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index}</th>
                          <td>{d.Name}</td>
                          <td>{d.Open}</td>
                          <td>{d.Phone}</td>
                          <td>{d.StoreType}</td>
                          <td>
                            {d.Type.map((el) => (
                              <p class="badge badge-warning">{el}</p>
                            ))}
                          </td>
                          <td>{d.Type}</td>
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
                              {" "}
                              <ion-icon
                                name="trash-outline"
                                size="large"
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

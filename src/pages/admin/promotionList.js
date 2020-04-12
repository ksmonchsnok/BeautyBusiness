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
      loadingData: false
    };
  }
  async componentDidMount() {
    await this.onGetItempStore();
    await this.onGetItempPromotion();
    await this.onGetItempDiscount();
  }

  onGetItempStore() {
    setTimeout(() => {
      let ref = firebase.database().ref("Store");
      ref.once("value").then(snapshot => {
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
      });
    }, 1000);
  }

  onGetItempPromotion() {
    setTimeout(() => {
      let ref = firebase.database().ref("Store/Promotion");
      ref.once("value").then(snapshot => {
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
      });
    }, 1000);
  }

  onGetItempDiscount() {
    setTimeout(() => {
      let ref = firebase.database().ref("Store/Discount");
      ref.once("value").then(snapshot => {
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
      });
    }, 1000);
  }

  handleEdit = obj => {
    console.log("Data", obj);

    swal({
      title: "Please Confirm for Edit ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.history.push("/managePromotionAndDiscount", {
          obj,
          mode: "edit"
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
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        firebase.remove(`MemberUser/${d.UserId}`);
        this.onGetItemp();
      } else {
        return;
      }
    });
  };

  onClickCreateNewBusiness = e => {
    let props = this.props;
    this.props.history.push("/AddStore", +props);
  };

  render() {
    console.log(this.state.data);

    return (
      <div id="User-List">
        <div style={{ marginTop: "3rem" }}>
          <h2>Promotion List</h2>{" "}
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
                        <td>{d.Name}</td>
                        <td>{d.Open}</td>
                        <td>{d.Phone}</td>
                        <td>{d.Phone}</td>
                        <td>{d.StoreType}</td>
                        <td>
                          {d.Type.map(el => (
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

export default enhance(storeList);

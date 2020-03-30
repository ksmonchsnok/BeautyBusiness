import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Button } from "antd";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import swal from "sweetalert";

class userList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    await this.onGetItemp();
  }

  onGetItemp() {
    setTimeout(() => {
      let ref = firebase.database().ref("MemberUser");
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
    console.log("Data", obj, this.props);
    swal({
      title: "Please Confirm for Edit ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.history.push("/AddUser", { obj, mode: "edit" });
      } else {
        return;
      }
    });
  };

  handleDelete = (d, index) => {
    console.log("ID", d.UserID, "index", index);
    const itemsRef = firebase.database().ref("MemberUser");
    swal({
      title: "Please Confirm for Delete ?",
      icon: "error",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        itemsRef.child(d.UserID).remove();
        this.onGetItemp();
      } else {
        return;
      }
    });
  };

  onClickCreateNewUser = () => {
    this.props.history.push("/AddUser");
  };

  render() {
    console.log(this.state.data);

    return (
      <div id="User-List">
        <div className="" style={{ marginTop: "3rem" }}>
          <h2>User List</h2>{" "}
          <div class="table-responsive">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone Number</th>
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
                        <td>{d.Email}</td>
                        <td>{d.Username}</td>
                        <td>{d.Firstname}</td>
                        <td>{d.Phone}</td>
                        <td>
                          <a href>
                            <ion-icon
                              size="large"
                              name="create-outline"
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
          <div
            className="col d-flex justify-content-center"
            style={{ marginBottom: "5rem", marginTop: "4rem" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.onClickCreateNewUser}
            >
              Create New User
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ firebase }) {
  return {
    MemberUser: firebase.ordered.MemberUser
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/MemberUser" }]),
  connect(mapStateToProps)
);

export default enhance(userList);

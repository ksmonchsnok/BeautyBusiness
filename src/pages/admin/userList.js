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
      let ref = firebase.database().ref("member");
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
        } else {
          this.setState({ data: [] });
        }
        this.setState({ loadingData: false });
      });
    }, 1000);
  }

  handleEdit = (obj) => {
    swal({
      title: "Please Confirm for Edit ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.history.push("/AddUser", { obj, mode: "edit" });
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
        firebase.remove(`member/${d.member_id}`);
        this.onGetItemp();
      } else {
        return;
      }
    });
  };

  onClickCreateNewUser = () => {
    this.props.history.push("/AddUser", { mode: "" });
  };

  render() {
    const { loadingData } = this.state;

    return (
      <div id="User-List">
        <div className="" style={{ marginTop: "3rem", marginBottom: "4rem" }}>
          <h2>User List</h2>{" "}
          <div
            className="d-flex justify-content-start"
            style={{ marginBottom: "2rem", marginTop: "1rem" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.onClickCreateNewUser}
            >
              Create New User
            </Button>
          </div>
          {!loadingData && (
            <div class="table-responsive">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    {/* <th scope="col">#</th> */}
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
                          {/* <th scope="row">{index}</th> */}
                          <td>{d.email}</td>
                          <td>{d.username}</td>
                          <td>{d.firstname}</td>
                          <td>{d.phone}</td>
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
    Member: firebase.ordered.member,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/member" }]),
  connect(mapStateToProps)
);

export default enhance(userList);

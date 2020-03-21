import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

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
      let ref = firebase.database().ref("User");
      ref.once("value").then(snapshot => {
        const data = snapshot.val();
        this.setState({ data });
      });
    }, 1500);
  }
  handleEdit = obj => {
    console.log(obj);
    console.log(this.props);
    this.props.history.push("/AddUser", { obj, mode: "edit" });
  };
  handleDelete = obj => {
    console.log(obj);
    const itemsRef = firebase.database().ref("User");
    itemsRef.child(obj.UserID).remove();
    this.onGetItemp();
  };
  onClickCreateNewUser = () => {
    this.props.history.push("/AddUser");
  };

  render() {
    console.log(this.state.data);

    return (
      <div id="User-List">
        <div className="container" style={{ marginTop: "3rem" }}>
          <h2>User List</h2>{" "}
          <div class="table-responsive-md">
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
                              name="create-outline"
                              onClick={this.handleEdit}
                            ></ion-icon>
                          </a>
                        </td>
                        <td>
                          <a href>
                            {" "}
                            <ion-icon
                              name="trash-outline"
                              onClick={this.handleDelete}
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
    User: firebase.ordered.User
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/User" }]),
  connect(mapStateToProps)
);

export default enhance(userList);

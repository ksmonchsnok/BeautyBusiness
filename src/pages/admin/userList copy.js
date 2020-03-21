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
      data: [],
      count: 2,
      columns: [
        {
          title: "E-mail",
          dataIndex: "email",
          width: "30%"
        },
        {
          title: "User Name",
          dataIndex: "username"
        },
        {
          title: "Name",
          dataIndex: "name"
        },
        {
          title: "Phone Number",
          dataIndex: "phone"
        },
        {
          title: "Edit",
          dataIndex: "Edit",
          render: (text, record) =>
            this.state.data.length >= 1 ? (
              <Popconfirm
                title="Sure to Edit?"
                onConfirm={() => this.handleEdit(record)}
              >
                <a>Edit</a>
              </Popconfirm>
            ) : null
        },
        {
          title: "Delete",
          dataIndex: "Delete",
          render: (text, record) =>
            this.state.data.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record)}
              >
                <a>Delete</a>
              </Popconfirm>
            ) : null
        }
      ]
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
    const columns = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });

    return (
      <div id="User-List">
        <div className="container" style={{ marginTop: "3rem" }}>
          <h2>User List</h2>{" "}
          <Table
            rowClassName={() => "editable-row"}
            bordered
            dataSource={this.state.data}
            columns={columns}
          />
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

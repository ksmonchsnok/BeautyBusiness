import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Table, Input, Button, Popconfirm, Form } from "antd";

export default class userList extends Component {
  constructor(props) {
    super(props);
    this.columns = [
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
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to Edit?"
              //   onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Edit</a>
            </Popconfirm>
          ) : null
      },
      {
        title: "Delete",
        dataIndex: "Delete",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null
      }
    ];
    this.state = {
      dataSource: [
        {
          key: "0",
          email: "test@gmail.com",
          username: "test",
          name: "Edward King 0",
          phone: "32",
          address: "London, Park Lane no. 0"
        },
        {
          key: "1",
          email: "test2@gmail.com",
          username: "test2",
          name: "Edward King 1",
          phone: "32",
          address: "London, Park Lane no. 1"
        }
      ],
      count: 2
    };
  }
  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.key !== key)
    });
  };
  render() {
    const { dataSource } = this.state;

    const columns = this.columns.map(col => {
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
            dataSource={dataSource}
            columns={columns}
          />
          <div
            className="col d-flex justify-content-center"
            style={{ marginBottom: "5rem", marginTop: "4rem" }}
          >
            <Button type="primary" htmlType="submit">
              Create New User
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

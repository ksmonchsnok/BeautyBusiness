import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Table, Input, Button, Popconfirm, Tag } from "antd";

export default class storeList extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Business Name",
        dataIndex: "name"
      },
      {
        title: "Open Store",
        dataIndex: "open"
      },
      {
        title: "Phone Number",
        dataIndex: "phone"
      },
      {
        title: "Business Type",
        dataIndex: "storetype"
      },
      {
        title: "Service Type",
        dataIndex: "type",
        render: type => (
          <span>
            {type.map(type => {
              let color = type.length > 3 ? "geekblue" : "green";
              if (type === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={type}>
                  {type.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
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
          name: "Edward King 0",
          open: "10.00-19.00",
          phone: "32",
          storetype: "มีร้าน",

          type: ["ทำเล็บ", "สปา"]
        },
        {
          key: "1",
          name: "Edward King 1",
          open: "9.00-20.00",
          phone: "32",
          storetype: "ฟรีแลนซ์",

          type: ["ทำเล็บ", "เสริมสวย"]
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
          <h2>Business List</h2>{" "}
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
              Create New Business
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

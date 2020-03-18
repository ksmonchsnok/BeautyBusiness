import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Table, Input, Button, Popconfirm, Tag } from "antd";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

class storeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingData: false,
      count: 2,
      columns : [
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
          // render: type => (
          //   <span>
          //     {type.map(type => {
          //       let color = type.length > 3 ? "geekblue" : "green";
          //       if (type === "loser") {
          //         color = "volcano";
          //       }
          //       return (
          //         <Tag color={color} key={type}>
          //           {type.toUpperCase()}
          //         </Tag>
          //       );
          //     })}
          //   </span>
          // )
        },
        {
          title: "Edit",
          dataIndex: "Edit",
          render: (text, record) =>
            this.state.data.length >= 1 ? (
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
            this.state.data.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key)}
              >
                <a>Delete</a>
              </Popconfirm>
            ) : null
        }
      ]
    };
  }

  componentDidMount() {
    let ref = firebase.database().ref("Store");
    ref.once("value").then(snapshot => {
      const data = snapshot.val();
      // data.map(ref =>
      //   // data.push({
      //   //   name: data.Name,
      //   //   open: data.Open,
      //   //   phone: data.Phone,
      //   //   storetype: data.StoreType,
      //   //   type: data.Type
      //   // })
      // );
      this.setState({ data });      
    });
  }

  handleDelete = key => {
    const data = [...this.state.data];
    this.setState({
      data: data.filter(item => item.key !== key)
    });
  };
  onClickCreateNewBusiness=()=>{
    window.location.assign("/UpdateStore")
  }

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
    console.log(this.state.data);


    return (
      <div id="User-List">
        <div className="container" style={{ marginTop: "3rem" }}>
          <h2>Business List</h2>{" "}
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
            <Button type="primary" htmlType="submit" onClick={this.onClickCreateNewBusiness}>
              Create New Business
            </Button>
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

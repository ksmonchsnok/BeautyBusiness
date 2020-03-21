import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Button } from "antd";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

class storeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingData: false
    };
  }
  async componentDidMount() {
    await this.onGetItemp();
  }
  componentDidMount() {
    setTimeout(() => {
      let ref = firebase.database().ref("Store");
      ref.once("value").then(snapshot => {
        const data = snapshot.val();
        this.setState({ data });
      });
    }, 1000);
  }

  handleEdit = obj => {
    console.log(obj);
    console.log(this.props);
    this.props.history.push("/AddStore", { obj, mode: "edit" });
  };

  handleDelete = obj => {
    console.log(obj);
    const itemsRef = firebase.database().ref("Store");
    itemsRef.child(obj.ItemID).remove();
    this.onGetItemp();
  };
  onClickCreateNewBusiness = e => {
    let props = this.props;
    this.props.history.push("/AddStore", +props);
  };

  render() {
    console.log(this.state.data);

    return (
      <div id="User-List">
        <div className="container" style={{ marginTop: "3rem" }}>
          <h2>Business List</h2>{" "}
          <div class="table-responsive-md">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Business Name</th>
                  <th scope="col">Open Store</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Business Type</th>
                  <th scope="col">Service Type</th>
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
                        <td>{d.Type}</td>
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
              onClick={this.onClickCreateNewBusiness}
            >
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

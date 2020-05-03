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
      arrpromotion: [],
      arrdiscount_status: [],
      loadingData: false,
    };
  }
  async componentDidMount() {
    await this.onGetItemppromotion();
  }

  onGetItemppromotion = () => {
    this.setState({
      data: [],
      loadingData: true,
      arrpromotion: [],
      arrdiscount_status: [],
    });
    let arr = [];
    let arrDIs = [];
    setTimeout(() => {
      let ref = firebase.database().ref("promotion");
      ref.once("value").then((snapshot) => {
        let data = [];
        if (snapshot.val()) {
          data = Object.values(snapshot.val());
        }

        let refStore = firebase.database().ref("discount");
        refStore.once("value").then((snapshot) => {
          if (snapshot.val()) {
            const dataDis = Object.values(snapshot.val());
            if (data.length > 0) {
              if (
                typeof data === "object" &&
                data !== null &&
                data !== undefined
              ) {
                var key = Object.keys(data);
                let arr1 = Object.values(data);
                for (let i = 0; i < arr1.length; i++) {
                  arr[key[i]] = arr1[i];
                }
              }
            }
            if (dataDis.length > 0) {
              if (
                typeof dataDis === "object" &&
                dataDis !== null &&
                dataDis !== undefined
              ) {
                var keyd = Object.keys(dataDis);
                let arrdiscount_status = Object.values(dataDis);
                for (let i = 0; i < arrdiscount_status.length; i++) {
                  arrDIs[keyd[i]] = arrdiscount_status[i];
                }
              }
            }
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < arrDIs.length; j++) {
                if (arr[i].store_id === arrDIs[j].store_id) {
                  arr[i].discount_status = arrDIs[j].discount_status;
                  arr[i].discount_name = arrDIs[j].discount_name;
                  arr[i].discount_description = arrDIs[j].discount_description;
                  arr[i].amount_discount = arrDIs[j].amount_discount;
                  arr[i].startdate_discount = arrDIs[j].startdate_discount;
                  arr[i].enddate_discount = arrDIs[j].enddate_discount;
                }
              }
            }
            this.setState({ data: arr, loadingData: false });
          } else {
            this.setState({ loadingData: false });
          }
        });
      });
    }, 1000);
  };

  handleEdit = (obj) => {
    swal({
      title: "Please Confirm to Edit ?",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.history.push("/managePromotionAnddiscount", {
          obj,
          mode: "edit",
        });
      } else {
        return;
      }
    });
  };

  handleDelete = (d, index) => {
    swal({
      title: "Please Confirm to Delete ?",
      icon: "error",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        firebase.remove(`promotion/${d.store_id}`);
        firebase.remove(`discount/${d.store_id}`);
        this.onGetItemppromotion();
      } else {
        return;
      }
    });
  };

  onClickCreateNewBusiness = (e) => {
    let props = this.props;
    this.props.history.push("/AddStore", +props);
  };

  onClickCreatepromotion = () => {
    this.props.history.push("/managePromotionAndDiscount");
  };

  render() {
    const { loadingData } = this.state;

    return (
      <div id="Promotion-List" style={{height:"100vh"}}>
        <div style={{ marginTop: "3rem", marginBottom: "4rem" }}>
          <h2>Promotion List</h2>{" "}
          <div className="row">
            {" "}
            <div
              className="col d-flex justify-content-start"
              style={{ marginBottom: "2rem", marginTop: "1rem" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.onClickCreatepromotion}
              >
                Create Promotion And Discount
              </Button>
            </div>
          </div>
          {!loadingData && (
            <div class="table-responsive">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    {/* <th scope="col">Business ID</th> */}
                    <th scope="col">Business Name</th>
                    <th scope="col">Promotion Name</th>
                    <th scope="col">Promotion Description</th>
                    <th scope="col">Amount Promotion</th>
                    <th scope="col">Discount Name</th>
                    <th scope="col">Discount Description</th>
                    <th scope="col">Amount Discount</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((d, index) => {
                    return (
                      <tr key={index}>
                        {/* <th scope="row"></th> */}
                        <td>{d.store_name}</td>
                        <td>{d.promotion_name ? d.promotion_name : "-"}</td>
                        <td>
                          {d.promotion_description
                            ? d.promotion_description
                            : "-"}
                        </td>
                        <td>{d.amount_promotion ? d.amount_promotion : "-"}</td>
                        <td>{d.discount_name ? d.discount_name : "-"}</td>
                        <td>
                          {d.discount_description
                            ? d.discount_description
                            : "-"}
                        </td>
                        <td>{d.amount_discount ? d.amount_discount : "-"}</td>
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
    Store: firebase.ordered.store,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/store" }]),
  connect(mapStateToProps)
);

export default enhance(storeList);

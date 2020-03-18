import React, { Component } from "react";
import Navbar from "../../components/navbar/navbar-User.js";
import UpdateUser from "../admin/addUser.js";

export default class User extends Component {
  render() {
    return (
      <div id="User-Page">
        <Navbar />
        <div className="container">
          <h2>ข้อมูลผู้ใช้ (User Information) </h2>
          <hr />
          <div className="jumbotron">
            <UpdateUser />
          </div>
        </div>
      </div>
    );
  }
}

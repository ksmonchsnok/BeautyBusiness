import React, { Component } from "react";
import "../../style.css";
import user from "../../assets/icon/user.png";
import PopupLogin from "../../components/popup/popupLogin.js";
import firebase from "firebase/app";
import setting from "../../assets/icon/setting.png";
import edit from "../../assets/icon/edit.png";
import logout from "../../assets/icon/logout.png";
import users from "../../assets/icon/users.png";
import store from "../../assets/icon/store.png";
import "firebase/auth";
import { withRouter } from "react-router-dom";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      showPopupLogin: false
    };

  }
 componentDidMount(){
   let temp = localStorage.getItem('ObjUser');
   console.log( JSON.parse(temp))
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user)
      this.setState({
        currentUser: user
      })
    }
  })
 }
  showPopupLogin = () => {
    this.setState({
      showPopupLogin: !this.state.showPopupLogin
    });
  };

  onClickEditProfile =(event) =>{
    event.preventDefault()
    this.props.history.push("/Register");

  }

  render() {
    const showPopupLogin = this.state.showPopupLogin;
    return (
      <div id="Login" history={this.props} style={{ marginBottom: "-9rem" }}>
        <div className="nav justify-content-end">

            <form className="form-inline my-2 my-lg-0"  history={this.props}>
              <div className="nav align-self-center justify-content-end">
                <div className="nav-item dropdown">
                  <div
                    className="nav-link"
                    id="setting"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <button
                      type="button"
                      className="btn btn-dark"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      <img src={setting} />
                    </button>
                  </div>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                    style={{ marginLeft: "-5rem" }}
                  >
                    <div className="dropdown-item">
                      {" "}
                      <img
                        src={users}
                        alt="user"
                        style={{ marginRight: "7px" }}
                      />
                      Name User
                    </div>

                    <a className="dropdown-item" href onClick={this.onClickEditProfile} history= {this.props.history}>
                      {" "}
                      <img
                        src={edit}
                        alt="user"
                        style={{ marginRight: "7px" }}
                      />
                      แก้ไขข้อมูลผู้ใช้
                    </a>
                    <a className="dropdown-item" href>
                      {" "}
                      <img
                        src={store}
                        alt="user"
                        style={{ marginRight: "7px" }}
                      />
                      แก้ไขข้อมูลธุรกิจ
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href>
                      <img
                        src={logout}
                        alt="user"
                        style={{ marginRight: "7px" }}
                      />
                      Log Out
                    </a>
                  </div>
                </div>
</div>
</form>



          <button
            type="button"
            className="btn btn-dark but"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={this.showPopupLogin}
            style={{ height: "60px" }}
            history={this.props}
          >
            <img src={user} alt="sign in" />
            &nbsp; Sing In
          </button>

          <PopupLogin
            // confirm={() => this.onClickReject()}
            aria-labelledby="contained-modal-title-vcenter"
            className="modal-dialog"
            id="popUpLogin"
            isVisible={showPopupLogin}
            closePopup={this.showPopupLogin}
            history={this.props}
          />
        </div>
        <hr style={{ border: "0.5px solid Black" }} />
      </div>
    );
  }
}
export default withRouter (Login);

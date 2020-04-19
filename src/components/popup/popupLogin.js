import React, { Component } from "react";
import "../../style.css";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Modal from "react-bootstrap4-modal";
import Facebook from "../../pages/login/FB-Login/facebook";
import Google from "../../pages/login/Google-Login/google.js";
import swal from "sweetalert";
import firebase from "firebase/app";
import "firebase/auth";
import { withRouter } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loadingLogin: false,
      submitted: false,
      isVisble: false,
      currentUser: null,
      message: "",
      isSignedIn: false,
      checklogIn: false,
      type: "forgot",
    };
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }));
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  onChangeEmail = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onChangePassword = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onClickLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ loadingLogin: true });

    setTimeout(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((resp) => {
          swal({
            title: "Login Success",
            text: "ํYou want Continue or not?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              const setPassword = firebase.database().ref(`MemberUser`);
              setPassword.child(resp.user.uid).update({
                Password: this.state.password,
                CFPassword: this.state.password,
              });
              firebase
                .database()
                .ref(`MemberUser/${resp.user.uid}`)
                .once("value")
                .then((snapshot) => {
                  localStorage.setItem(
                    "ObjUser",
                    JSON.stringify(snapshot.val())
                  );
                  this.props.checkLogin(snapshot.val());
                });
              this.props.history.push({
                pathname: "/",
                state: { ChekShowInOut: true },
              });
              this.setState({ checklogIn: true });
            } else {
              swal("Your imaginary file is safe!");
              this.setState({ checklogIn: false });
            }
          });
        })
        .catch(function (error) {
          swal("ผิดพลาด!", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", "error");
        });
    }, 500);
    this.setState({ loadingLogin: false });
  };

  onClickRegister = () => {
    this.props.history.push("/Register");
  };

  onClickForgotPassword = () => {
    this.props.history.push("/Forgot-Password", { type: "forgot" });
  };

  render() {
    const { message, currentUser, loadingLogin } = this.state;
    if (currentUser) {
      return (
        <div>
          <p>Hello {currentUser.email}</p>
          <button onClick={this.logout}>Logout</button>
        </div>
      );
    }

    const isVisible = this.props.isVisible;
    const NormalLoginForm = () => {
      const onFinish = (values) => {
        // console.log("Received values of form: ", values);
      };
    };
    return (
      <div id="Popup-Login">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          visible={this.state.checklogIn ? !isVisible : isVisible}
          onClickBackdrop={this.props.closePopup}
          history={this.props}
        >
          <div className="modal-header">
            <h5 className="modal-title">Log In | Sing In</h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.props.closePopup}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body log">
            <div className="nav justify-content-center">
              {message ? <p className="help is-danger">{message}</p> : null}
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: <small>Please input your Username</small>,
                    },
                  ]}
                >
                  <Input
                    id="InputEmail"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="email"
                    name="email"
                    onChange={this.onChangeEmail}
                    placeholder="E-mail"
                    maxLength={35}
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: <small>Please input your Password</small>,
                    },
                  ]}
                >
                  <Input.Password
                    id="InputPassword"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    name="password"
                    onChange={this.onChangePassword}
                    minLength={6}
                    maxLength={16}
                    placeholder="Password"
                  />
                </Form.Item>
                <center>
                  {" "}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={this.onClickLogin}
                      disabled={
                        this.state.email.length === 0 &&
                        this.state.password.length === 0
                      }
                      className="login-form-button"
                    >
                      {loadingLogin && (
                        <span
                          className="spinner-border spinner-border-sm"
                          style={{ marginRight: "1rem" }}
                        />
                      )}
                      Sign In
                    </Button>
                    &emsp;or{" "}
                    <a
                      onClick={this.onClickForgotPassword}
                      history={this.props}
                    >
                      &nbsp; <u>Forgot Password.</u>
                    </a>
                  </Form.Item>
                  <Form.Item>
                    ยังไม่ได้เป็นสมาชิก ?
                    <a onClick={this.onClickRegister}>
                      &nbsp; <u>สมัครสมาชิก</u>
                    </a>
                  </Form.Item>
                </center>
                <div className="modal-footer d-flex justify-content-start">
                  <h5 className="d-flex justify-content-start">
                    เข้าสู่ระบบด้วย
                  </h5>
                </div>
                <center>
                  <div
                    className="nav-item llog"
                    style={{ marginBottom: "-5rem", marginTop: "-3rem" }}
                  >
                    <Facebook />{" "}
                  </div>
                  <div
                    className="nav-item llog"
                    style={{ marginBottom: "-2rem" }}
                  >
                    <Google />
                  </div>
                </center>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default withRouter(LoginForm);

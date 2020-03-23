import React, { Component } from "react";
import "../../style.css";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Modal from "react-bootstrap4-modal";
import Facebook from "../../pages/login/FB-Login/facebook";
import Google from "../../pages/login/Google-Login/google.js";

import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loadingLogin: false,
      submitted: false,
      isVisble: false,
      loadingLogin: false,
      currentUser: null,
      message: "",
      isSignedIn: false
    };
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  onChangeEmail = e => {
    console.log(e.target.value);

    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onChangePassword = e => {
    console.log(e.target.value);

    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onClickLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);

    // firebase.auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then(response => {
    //     this.setState({
    //       currentUser: response.user
    //     })
    //   })
    //   .catch(error => {
    //     this.setState({
    //       message: error.message
    //     })
    //   })
  };

  onClickRegister = () => {
    // this.props.history.push("/Register");
    window.open("/Register", "_self");
  };

  render() {
    const { message, currentUser } = this.state;
    if (currentUser) {
      return (
        <div>
          <p>Hello {currentUser.email}</p>
          <button onClick={this.logout}>Logout</button>
        </div>
      );
    }

    // if (!this.state.isSignedIn) {
    //   return (
    //     <StyledFirebaseAuth
    //       uiConfig={this.uiConfig}
    //       firebaseAuth={firebase.auth()}
    //     />
    //   );
    // }
    // const firebaseConfig = {
    //   apiKey: "AIzaSyC9SnzFIrMF41K57it-skYg5DoQshD8uZ4",
    //   authDomain: "beauty-busniess.firebaseapp.com",
    //   databaseURL: "https://beauty-busniess.firebaseio.com",
    //   projectId: "beauty-busniess",
    //   storageBucket: "beauty-busniess.appspot.com",
    //   messagingSenderId: "200711871568",
    //   appId: "1:200711871568:web:cad3bdee0433a815928555",
    //   measurementId: "G-9VGW3YM381"
    // };
    // firebase.initializeApp(firebaseConfig);

    const isVisible = this.props.isVisible;
    const { email, password, loadingLogin, submitted, error } = this.state;
    const NormalLoginForm = () => {
      const onFinish = values => {
        console.log("Received values of form: ", values);
      };
    };
    return (
      <div id="Popup-Login">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          visible={isVisible}
          onClickBackdrop={this.props.Popup}
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
            {/* <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
          <img id="photo" className="pic" src={firebase.auth().currentUser.photoURL}/>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button> */}
            <div className="nav justify-content-center">
              {message ? <p className="help is-danger">{message}</p> : null}
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true
                }}
                onFinish={this.onFinish}
                // onSubmit={this.onClickLogin}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!"
                    }
                  ]}
                >
                  <Input
                    id="InputEmail"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="email"
                    name="email"
                    onChange={this.onChangeEmail}
                    placeholder="E-mail"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!"
                    }
                  ]}
                >
                  <Input
                    id="InputPassword"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    name="password"
                    onChange={this.onChangePassword}
                    minLength={2}
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
                      Log in
                    </Button>
                    &emsp;or{" "}
                    <a>
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

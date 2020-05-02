import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Layout, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import swal from "sweetalert";
const { Content } = Layout;

class LoginForAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loadingLogin: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onChangeUsername = (event) => {
    let username = this.state.username ? this.state.username : {};
    username = event.target.value;
    this.setState({
      username: username,
    });
  };

  onChangePassword = (event) => {
    let password = this.state.password ? this.state.Passwpasswordrd : {};
    password = event.target.value;
    this.setState({
      password: password,
    });
  };

  onClickLogin = () => {
    this.setState({ loadingLogin: true });

    if (this.state.username === "Admin" && this.state.password === "Admin") {
      setTimeout(() => {
        this.setState({ loadingLogin: true });

        this.props.history.push("/AdminPage");
      }, 800);
    } else {
      this.setState({ loadingLogin: false });

      swal("ผิดพลาด", "Username หรือ Passpord ไม่ถูกต้อง", "error");
      return;
    }
    this.setState({ loadingLogin: true });
  };

  render() {
    const NormalLoginForm = () => {
      const onFinish = (values) => {
        console.log("Received values of form: ", values);
      };
    };

    const { loadingLogin } = this.state;

    return (
      <div id="Login-Admin">
        <Layout
          // className="container"
          style={{ backgroundColor: "transparent" }}
        >
          <center>
            <Content
              className="d-flex justify-content-center"
              style={{ marginTop: "7rem", marginBottom: "8rem" }}
            >
              <Form
                name="normal_login"
                className="login-form admin border border-secondary"
                onFinish={this.onFinish}
                style={{
                  padding: "3rem",
                  paddingTop: "4rem",
                  paddingBottom: "-2rem",
                  paddingLeft: "3rem",
                  paddingRight: "3rem",
                }}
              >
                <h1 style={{ marginRight: "3rem", marginLeft: "3rem" }}>
                  Beauty Business{" "}
                </h1>
                <h4>(Admin)</h4>

                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: <small>Please input your Username</small>,
                    },
                    {
                      whitespace: true,
                      message: <small>Username cannot be empty</small>,
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                    id="username"
                    type="text"
                    name="username"
                    maxLength={15}
                    onChange={this.handleChange}
                    placeholder="E-mail"
                    style={{ marginTop: "2rem" }}
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
                    {
                      whitespace: true,
                      message: <small>Password cannot be empty</small>,
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                    type="password"
                    id="password"
                    name="password"
                    onChange={this.handleChange}
                    minLength={5}
                    maxLength={10}
                    style={{ marginTop: "1rem" }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    block
                    size="large"
                    htmlType="submit"
                    className="login-form-button"
                    style={{
                      marginTop: "2rem",
                      backgroundColor: "#343a40",
                      color: "#fff",
                    }}
                    onClick={this.onClickLogin}
                    disabled={
                      this.state.username.length === 0 &&
                      this.state.password.length === 0
                    }
                  >
                    {loadingLogin && (
                      <span
                        className="spinner-border spinner-border-sm"
                        style={{ marginRight: "1rem", marginBottom: "0.4rem" }}
                      />
                    )}
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Content>
          </center>
        </Layout>
      </div>
    );
  }
}

export default LoginForAdmin;

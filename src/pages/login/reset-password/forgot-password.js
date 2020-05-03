import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../../style.css";
import { Form, Input, Button } from "antd";
import Navbar from "../../../components/navbar/navbar.js";
import firebase from "firebase";
import "firebase/auth";
import swal from "sweetalert";

export default class ForgotPassword extends Component {
  state = {
    Email: "",
  };
  RegistrationForm = () => {
    // const [form] = Form.useForm();
    // const onFinish = values => {
    // //   console.log('Received values of form: ', values);
    // };
  };
  onClickForgotPassword = () => {
    firebase.resetPassword(`${this.state.Email}`).then((res) => {
      swal("Success Check your email");
    });
    this.props.history.push("/");
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    console.log(this.props.location.state);

    return (
      <div id="Forgot-Password">
        <Navbar />
        <div className="container" style={{ height: "67vh" }}>
          <div className="row d-flex justify-content-center">
            <div className="col-10">
              <h3 style={{ marginBottom: "4rem" }}>Forgot Your Password</h3>

              {/* Forgot Password */}

              <Form
                {...formItemLayout}
                form={this.form}
                name="register"
                // onFinish={this.onFinish}
                scrollToFirstError
              >
                <Form.Item
                  name="Email"
                  label="Your Email"
                  rules={[
                    {
                      whitespace: true,
                      message: <small>Can not is whitespace.</small>,
                    },
                    {
                      required: true,
                      message: <small>Please input your E-mail</small>,
                    },
                    {
                      type: "email",
                      message: <small>This is not a valid E-mail.</small>,
                    },
                  ]}
                >
                  <Input
                    type="email"
                    name="Email"
                    id="Email"
                    placeholder="Email@gmail.com"
                    maxLength={40}
                    value={this.state.Email}
                    onChange={(e) => this.setState({ Email: e.target.value })}
                    allowClear
                  />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: "2rem" }}
                    onClick={this.onClickForgotPassword}
                  >
                    Forgot Password
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

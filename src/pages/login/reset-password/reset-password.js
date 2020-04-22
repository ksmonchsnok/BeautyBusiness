import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../../style.css";
import { Form, Input, Button } from "antd";
import Navbar from "../../../components/navbar/navbar.js";

export default class ResetPassword extends Component {
  RegistrationForm = () => {
    // const [form] = Form.useForm();
    // const onFinish = values => {
    // //   console.log('Received values of form: ', values);
    // };
  };

  onClickResetPassword = () => {};

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

    return (
      <div id="Reset-Password">
        <Navbar />
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-10">
              <h3 style={{ marginBottom: "4rem" }}>Reset Your Password</h3>
              {/* Reset Password */}

              <Form
                {...formItemLayout}
                form={this.form}
                name="register"
                // onFinish={this.onFinish}
                scrollToFirstError
              >
                <Form.Item
                  name="oldPasssword"
                  label="Old Passsword"
                  rules={[
                    {
                      whitespace: true,
                      message: <small>Can not is whitespace.</small>,
                    },
                    {
                      required: true,
                      message: <small>Please input your Old Passsword!</small>,
                    },
                    {
                      pattern: new RegExp("^[a-zA-Z0-9]*$"),
                      message: <small>Please input alphabetical only.</small>,
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    name="oldpassword"
                    placeholder="Oldpassword1234"
                    maxLength={16}
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="New Password"
                  rules={[
                    {
                      whitespace: true,
                      message: <small>Can not is whitespace.</small>,
                    },
                    {
                      required: true,
                      message: <small>Please input your Password!</small>,
                    },
                    {
                      pattern: new RegExp("^[a-zA-Z0-9]*$"),
                      message: <small>Please input alphabetical only.</small>,
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    name="newpassword"
                    placeholder="Newpassword1234"
                    maxLength={16}
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      whitespace: true,
                      message: <small>Can not is whitespace.</small>,
                    },
                    {
                      required: true,
                      message: (
                        <small>Please input Confirm your Password!</small>
                      ),
                    },
                    {
                      pattern: new RegExp("^[a-zA-Z0-9]*$"),
                      message: <small>Please input alphabetical only.</small>,
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    name="confirmpassword"
                    placeholder="Confirmpassword1234"
                    maxLength={16}
                    allowClear
                  />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: "2rem" }}
                    onClick={this.onClickResetPassword}
                  >
                    Reset Your Passsword
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

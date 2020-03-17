import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Form, Input, Tooltip, Button, Upload, message } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = file => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text" style={{ marginTop: "1rem" }}>
          Add Picture
        </div>
      </div>
    );
    const { imageUrl } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 10
        },
        sm: {
          span: 6
        }
      },
      wrapperCol: {
        xs: {
          span: 6
        },
        sm: {
          span: 10
        }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 10,
          offset: 0
        },
        sm: {
          span: 10,
          offset: 6
        }
      }
    };

    const RegistrationForm = () => {
      const [form] = Form.useForm();

      const onFinish = values => {
        console.log("Received values of form: ", values);
      };
    };
    const { TextArea } = Input;
    return (
      <div
        id="Add-Update-User"
        style={{ marginTop: "3rem", marginLeft: "1rem" }}
      >
        <Form
          {...formItemLayout}
          form={this.form}
          name="addNewUser"
          onFinish={this.onFinish}
          scrollToFirstError
        >
          <Form.Item name="image" label="Picture">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="username"
            label={<span>Username</span>}
            rules={[
              {
                required: true,
                message: <small>Please input your Username</small>
              },
              {
                type: "string",
                pattern: new RegExp("^[A-Za-zก-๙0-9]*$"),
                message: <small>Please input alphabetical only.</small>
              },
              {
                min: 4,
                message: <small>Must be at least 3 characters</small>
              }
            ]}
          >
            <Input
              type="textbox"
              name="firstname"
              // value={this.state.data.ContractPhoneNumber || ""}
              // onChange={this.handleFieldChange}
              whitespace={true}
              maxLength={40}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: <small>The input is not valid E-mail</small>
              },
              {
                pattern: new RegExp("^[0-9A-Za-z@.]*$"),
                min: 6,
                message: (
                  <small>Please input alphabetical and number only.</small>
                )
              },
              {
                required: true,
                message: <small>Please input your E-mail</small>
              }
            ]}
          >
            <Input
              type="textbox"
              name="Email"
              // value={this.state.data.ContractPhoneNumber || ""}
              // onChange={this.handleFieldChange}
              whitespace={true}
              maxLength={40}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <span>
                Password &nbsp;
                <Tooltip title="Password จะต้องประกอบไปด้วย A-Z, a-z , 0-9">
                  <QuestionCircleOutlined />
                  &nbsp;
                </Tooltip>
              </span>
            }
            rules={[
              {
                min: 6,
                message: <small>Password must be at least 6 characters</small>
              },
              {
                pattern: new RegExp("^[A-Za-z0-9]*$"),
                message: (
                  <small>Please input alphabetical and number only.</small>
                )
              },
              {
                required: true,
                message: <small>Please input your password</small>
              }
            ]}
            hasFeedback
          >
            <Input.Password
              type="textbox"
              name="Password"
              // value={this.state.data.ContractPhoneNumber || ""}
              // onChange={this.handleFieldChange}
              whitespace={true}
              maxLength={16}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={
              <span>
                Confirm Password &nbsp;
                <Tooltip title="Password จะต้องตรงกัน">
                  <QuestionCircleOutlined />
                  &nbsp;
                </Tooltip>
              </span>
            }
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: <small>Please confirm your password</small>
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    <small>
                      The two passwords that you entered do not match
                    </small>
                  );
                }
              })
            ]}
          >
            <Input.Password
              type="textbox"
              name="confirmPassword"
              // value={this.state.data.ContractPhoneNumber || ""}
              // onChange={this.handleFieldChange}
              whitespace={true}
              maxLength={16}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="firstname"
            label={<span>First Name</span>}
            rules={[
              {
                required: true,
                message: <small>Please input your First Name</small>
              },
              {
                type: "string",
                pattern: new RegExp("^[A-Za-zก-๙]*$"),
                message: <small>Please input alphabetical only.</small>
              },
              {
                min: 4,
                message: <small>Must be at least 3 characters</small>
              }
            ]}
          >
            <Input
              type="textbox"
              name="firstname"
              // value={this.state.data.ContractPhoneNumber || ""}
              // onChange={this.handleFieldChange}
              whitespace={true}
              maxLength={40}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="lastname"
            label={<span>Last Name</span>}
            rules={[
              {
                required: true,
                message: <small>Please input your Last Name</small>
              },
              {
                type: "string",
                pattern: new RegExp("^[A-Za-zก-๙]*$"),
                message: <small>Please input alphabetical only.</small>
              },
              {
                min: 4,
                message: <small>Must be at least 3 characters</small>
              }
            ]}
          >
            <Input
              type="textbox"
              name="lastname"
              // value={this.state.data.ContractPhoneNumber || ""}
              // onChange={this.handleFieldChange}
              whitespace={true}
              maxLength={40}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: <small>Please input your Address</small>
              },
              {
                type: "regexp",
                pattern: new RegExp("^[a-zA-Z0-9ก-๙'-./]*$"),
                whitespace: false,
                message: <small>Please input alphabetical only.</small>
              }
            ]}
          >
            <TextArea
              rows={3}
              name="Address"
              // value={this.state.data.ContractPhoneNumber || ""}
              // onChange={this.handleFieldChange}
              whitespace={true}
              maxLength={150}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: <small>Please input your phone number</small>
              },
              {
                min: 12,
                pattern: new RegExp("^[0-9-]*$"),
                message: <small>Ex : 085-555-5555</small>
              },
              {
                whitespace: true,
                message: <small>Can not is whitespace.</small>
              }
            ]}
          >
            <Input
              type="textbox"
              name="PhoneNumber"
              // value={this.state.data.ContractPhoneNumber || ""}
              // onChange={this.handleFieldChange}
              whitespace={true}
              maxLength={12}
              allowClear
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout} style={{ marginBottom: "6rem" }}>
            <Button type="primary" htmlType="submit">
              Save To Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

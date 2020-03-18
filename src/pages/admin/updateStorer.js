import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import {
  Form,
  Input,
  Tooltip,
  Button,
  Upload,
  message,
  Radio,
  Checkbox,
  Row,
  Col
} from "antd";
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

  onClickCancel=()=>{
    window.history.back();}
  

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
        id="Add-Update-Store"
        style={{ marginTop: "3rem", marginLeft: "1rem" }}
      >
        <Form
          {...formItemLayout}
          form={this.form}
          name="addNewStore"
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
            name="name"
            label={<span>Business Name</span>}
            rules={[
              {
                required: true,
                message: <small>Please input your Business Name</small>
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
              name="Name"
              // value={this.state.data.ContractPhoneNumber || ""}
              // onChange={this.handleFieldChange}
              whitespace={true}
              maxLength={40}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="Open"
            label={<span>Open</span>}
            rules={[
              {
                required: true,
                message: <small>Please input your Open</small>
              },
              {
                type: "string",
                pattern: new RegExp("^[A-Za-zก-๙0-9-.]*$"),
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
              name="Open"
              // value={this.state.data.ContractPhoneNumber || ""}
              // onChange={this.handleFieldChange}
              whitespace={true}
              maxLength={20}
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
            name="storeType"
            label="Business Type"
            rules={[
              {
                required: true,
                message: <small>Please input your Business Type</small>
              }
            ]}
          >
            <Radio.Group>
              <Radio value="1">มีร้าน</Radio>
              <Radio value="2">ฟรีแลนซ์</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="type"
            label="Service Type"
            rules={[
              {
                required: true,
                message: <small>Please input your Service Type</small>
              }
            ]}
          >
            <Checkbox.Group>
              <Row>
                <Col span={6}>
                  <Checkbox
                    value="1"
                    style={{
                      lineHeight: "32px"
                    }}
                  >
                    ตัดผมชาย
                  </Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox
                    value="2"
                    style={{
                      lineHeight: "32px"
                    }}
                  >
                    เสริมสวย
                  </Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox
                    value="3"
                    style={{
                      lineHeight: "32px"
                    }}
                  >
                    ทำเล็บ
                  </Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox
                    value="4"
                    style={{
                      lineHeight: "32px"
                    }}
                  >
                    ต่อขนตา
                  </Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox
                    value="5"
                    style={{
                      lineHeight: "32px"
                    }}
                  >
                    สักคิ้ว
                  </Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox
                    value="6"
                    style={{
                      lineHeight: "32px"
                    }}
                  >
                    แว็กซ์ขน
                  </Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox
                    value="7"
                    style={{
                      lineHeight: "32px"
                    }}
                  >
                    สปา
                  </Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox
                    value="8"
                    style={{
                      lineHeight: "32px"
                    }}
                  >
                    Tattoo
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            {...tailFormItemLayout}
            style={{ marginBottom: "6rem", marginTop: "4rem" }}
          >
            <Button
              type="danger"
              htmlType="reset"
              style={{ marginRight: "2rem" }}
              onClick={this.onClickCancel}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              // loading="true"
            >
              Save Change
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

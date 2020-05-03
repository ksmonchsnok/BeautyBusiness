import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Form, Input, Tooltip, Button, Upload, message, Radio } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import firebase from "firebase";
import Navber from "../../components/navbar/navbar-Admin.js";
import swal from "sweetalert";

export default class RegistrationForm extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mode: "",
      member_id: "",
      address: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      cf_password: "",
      phone: "",
      username: "",
      member_type: "",
    };
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = (file) => {
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

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  onChangeCheckRadio = (e) => {
    this.setState({ member_type: e.target.value });
  };

  async componentDidMount() {
    console.log(this.props);
    if (this.props.location.state !== undefined) {
      if (this.props.location.state.mode === "edit") {
        let obj = await this.props.location.state.obj;
        console.log(obj);
        this.formRef.current.setFieldsValue({
          mode: "edit",
          member_id: obj.member_id,
          imageUrl: obj.imageUrl,
          username: obj.username,
          email: obj.email,
          password: obj.password,
          cf_password: obj.cf_password,
          firstname: obj.firstname,
          lastname: obj.lastname,
          phone: obj.phone,
          address: obj.address,
          member_type: obj.member_type,
        });
        this.setState({
          mode: "edit",
          member_id: obj.member_id,
          imageUrl: obj.imageUrl,
          username: obj.username,
          email: obj.email,
          password: obj.password,
          cf_password: obj.cf_password,
          firstname: obj.firstname,
          lastname: obj.lastname,
          phone: obj.phone,
          address: obj.address,
          member_type: obj.member_type,
        });
      }
    }
  }

  onClickCancel = () => {
    this.props.history.push("/AdminPage");
  };

  onGotoSave() {
    if (this.state.username) {
      setTimeout(() => {
        if (this.state.mode === "edit") {
          const setItemInsert = firebase.database().ref(`member`);
          let newState = {
            imageUrl: this.state.imageUrl,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            cf_password: this.state.cf_password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            address: this.state.address,
            member_type: this.state.member_type,
          };
          setItemInsert.child(this.state.member_id).update(newState);
          swal({
            title: "Update User Success",
            icon: "success",
            buttons: true,
            dangerMode: false,
          }).then((willDelete) => {
            if (willDelete) {
              // swal("Update User Success", {
              //   icon: "success",
              // });
              this.onClickCancel();
            } else {
              // swal("Success!");
            }
          });
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.state.email,
              this.state.password
            )
            .then((res) => {
              const setItemInsert = firebase
                .database()
                .ref(`member/${res.user.uid}`);
              let newState = {
                imageUrl: this.state.imageUrl,
                member_id: res.user.uid,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                cf_password: this.state.cf_password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                phone: this.state.phone,
                address: this.state.address,
                member_type: this.state.member_type,
              };
              setItemInsert.set(newState);
              swal({
                title: "Create User Success",
                text: "",
                icon: "sucess",
                buttons: true,
                dangerMode: false,
              }).then((willDelete) => {
                if (willDelete) {
                  // swal("Create User Success", {
                  //   icon: "success",
                  // });
                  this.onClickCancel();
                } else {
                  // swal("Success!");
                }
              });
            })
            .catch(function (error) {
              swal("ผิดพลาด!", "มีผู้ใช้งานอยู่ในระบบแล้ว", "error");
            });
        }
      }, 1000);
    } else {
      swal("ผิดพลาด", "กรุณากรอกข้อมูลให้ครบ", "error");
      return;
    }
  }

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
          span: 10,
        },
        sm: {
          span: 6,
        },
      },
      wrapperCol: {
        xs: {
          span: 6,
        },
        sm: {
          span: 10,
        },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 10,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 6,
        },
      },
    };

    // const RegistrationForm = () => {
    //   const [form] = Form.useForm();

    //   const onFinish = values => {
    //     console.log("Received values of form: ", values);
    //   };
    // };

    const { TextArea } = Input;
    return (
      <div
        id="Add-Update-User"
        style={{ marginTop: "3rem", marginLeft: "1rem" }}
      >
        <Navber />
        <div className="container" style={{ marginBottom: "5rem" }}>
          {this.props.location.state.mode !== "edit" && <h1>Create User</h1>}
          {this.props.location.state.mode === "edit" && <h1>Update User</h1>}
          <hr />
        </div>

        <Form
          {...formItemLayout}
          form={this.form}
          ref={this.formRef}
          name="addNewUser"
          onFinish={this.onFinish}
          scrollToFirstError
        >
          <Form.Item name="imageUrl" label="Picture">
            <Upload
              name="imageUrl"
              id="imageUrl"
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
                message: <small>Please input your Username</small>,
              },
              {
                type: "string",
                pattern: new RegExp("^[A-Za-zก-๙0-9]*$"),
                message: <small>Please input alphabetical only.</small>,
              },
              {
                min: 4,
                message: <small>Must be at least 3 characters</small>,
              },
            ]}
          >
            <Input
              type="textbox"
              name="username"
              id="username"
              placeholder="Username"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
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
                message: <small>The input is not valid E-mail</small>,
              },
              {
                pattern: new RegExp("^[0-9A-Za-z@.]*$"),
                min: 6,
                message: (
                  <small>Please input alphabetical and number only.</small>
                ),
              },
              {
                required: true,
                message: <small>Please input your E-mail</small>,
              },
            ]}
          >
            <Input
              type="textbox"
              name="email"
              id="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
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
                message: <small>Password must be at least 6 characters</small>,
              },
              {
                pattern: new RegExp("^[A-Za-z0-9]*$"),
                message: (
                  <small>Please input alphabetical and number only.</small>
                ),
              },
              {
                required: true,
                message: <small>Please input your password</small>,
              },
            ]}
            hasFeedback
          >
            <Input.Password
              type="textbox"
              name="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              whitespace={true}
              maxLength={16}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="cf_password"
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
                message: <small>Please confirm your password</small>,
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
                },
              }),
            ]}
          >
            <Input.Password
              type="textbox"
              name="cf_password"
              id="cf_password"
              placeholder="Confirmpassword"
              value={this.state.cf_password}
              onChange={(e) => this.setState({ cf_password: e.target.value })}
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
                message: <small>Please input your First Name</small>,
              },
              {
                type: "string",
                pattern: new RegExp("^[A-Za-zก-๙]*$"),
                message: <small>Please input alphabetical only.</small>,
              },
              {
                min: 4,
                message: <small>Must be at least 3 characters</small>,
              },
            ]}
          >
            <Input
              type="textbox"
              name="firstname"
              id="firstname"
              placeholder="Firstname"
              value={this.state.firstname}
              onChange={(e) => this.setState({ firstname: e.target.value })}
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
                message: <small>Please input your Last Name</small>,
              },
              {
                type: "string",
                pattern: new RegExp("^[A-Za-zก-๙]*$"),
                message: <small>Please input alphabetical only.</small>,
              },
              {
                min: 4,
                message: <small>Must be at least 3 characters</small>,
              },
            ]}
          >
            <Input
              type="textbox"
              name="lastname"
              id="lastname"
              placeholder="Lastname"
              value={this.state.lastname}
              onChange={(e) => this.setState({ lastname: e.target.value })}
              whitespace={true}
              maxLength={40}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="address"
            rules={[
              {
                required: true,
                message: <small>Please input your Address</small>,
              },
              {
                type: "regexp",
                pattern: new RegExp("^[a-zA-Z0-9ก-๙'-./]*$"),
                whitespace: false,
                message: <small>Please input alphabetical only.</small>,
              },
            ]}
          >
            <TextArea
              rows={3}
              name="address"
              id="address"
              placeholder="Address"
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
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
                message: <small>Please input your phone number</small>,
              },
              {
                min: 10,
                pattern: new RegExp("^[0-9-]*$"),
                message: <small>Ex : 085-555-5555</small>,
              },
              {
                whitespace: true,
                message: <small>Can not is whitespace.</small>,
              },
            ]}
          >
            <Input
              type="textbox"
              name="phone"
              id="phone"
              placeholder="Ex. 085 555 5555"
              value={this.state.phone}
              onChange={(e) => this.setState({ phone: e.target.value })}
              whitespace={true}
              maxLength={10}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="member_type"
            label="User Type"
            rules={[
              {
                required: true,
                message: <small>Please input your User Type</small>,
              },
            ]}
          >
            <Radio.Group
              id="member_type"
              value={this.state.member_type}
              onChange={(e) => this.onChangeCheckRadio(e)}
            >
              <Radio value="ผู้ใช้บริการ" name="ผู้ใช้บริการ">
                ผู้ใช้บริการ
              </Radio>
              <Radio value="ผู้ให้บริการ" name="ผู้ให้บริการ">
                ผู้ให้บริการ (มีธุรกิจ)
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item {...tailFormItemLayout} style={{ marginBottom: "6rem" }}>
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
              onClick={() => this.onGotoSave()}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

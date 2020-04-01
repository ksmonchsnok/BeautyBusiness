import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Form, Input, Tooltip, Button, Upload, message, Radio } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import firebase from "firebase";
import Navbar from "../../components/navbar/navbars.js";
import swal from "sweetalert";

export default class RegistrationForm extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mode: "",
      UserID: "",
      Address: "",
      Email: "",
      Firstname: "",
      Lastname: "",
      Password: "",
      CFPassword: "",
      Phone: "",
      Username: "",
      UserType: ""
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

  async componentDidMount() {
    console.log(this.props);
    let temp = await JSON.parse(localStorage.getItem("ObjUser"));
    if (temp) {
      this.setState({
        imageUrl: temp.imageUrl,
        Username: temp.Username,
        Email: temp.Email,
        Password: temp.Password,
        CFPassword: temp.CFPassword,
        Firstname: temp.Firstname,
        Lastname: temp.Lastname,
        Phone: temp.Phone,
        Address: temp.Address,
        UserType: temp.UserType
      });
      this.formRef.current.setFieldsValue({
        imageUrl: temp.imageUrl,
        Username: temp.Username,
        Email: temp.Email,
        Password: temp.Password,
        CFPassword: temp.CFPassword,
        Firstname: temp.Firstname,
        Lastname: temp.Lastname,
        Phone: temp.Phone,
        Address: temp.Address,
        UserType: temp.UserType
      });
    }
  }
  onClickCancel = () => {
    window.history.back();
  };

  onClickResetPassword = () => {
    this.props.history.push("/Reset-Password");
  };

  onGotoSave() {
    let email = this.state.Email;
    let password = this.state.Password;
    let checkProps = this.props.location
      ? this.props.location.state
        ? "pass"
        : null
      : null;
    if (
      checkProps === "pass" &&
      this.props.location.state.mode === "EditUser"
    ) {
      var user = firebase.auth().currentUser;
      user
        .updatePassword(password)
        .then(() => {
          console.log("Password updated!");
        })
        .catch(error => {
          console.log(error);
        });
      setTimeout(() => {
        const setItemInsert = firebase.database().ref(`MemberUser`);
        let newState = {
          imageUrl: this.state.imageUrl,
          Username: this.state.Username,
          Email: this.state.Email,
          Password: this.state.Password,
          CFPassword: this.state.CFPassword,
          Firstname: this.state.Firstname,
          Lastname: this.state.Lastname,
          Phone: this.state.Phone,
          Address: this.state.Address,
          UserType: this.state.UserType
        };
        setItemInsert.child(user.uid).update(newState);
        localStorage.setItem("ObjUser", JSON.stringify(this.state));
        let temp = JSON.parse(localStorage.getItem("ObjUser"));
        if (temp.Password !== this.state.Password) {
          firebase
            .auth()
            .signOut()
            .then(function() {
              // Sign-out successful.
              localStorage.removeItem("ObjUser");
            })
            .catch(function(error) {
              // An error happened.
            });
        }
        swal({
          title: "Update Registered",
          text: "ํYou want Continue or not?",
          icon: "warning",
          buttons: true,
          dangerMode: true
        }).then(willDelete => {
          if (willDelete) {
            swal("Up date Success", {
              icon: "success"
            });
            this.onClickCancel();
          } else {
            swal("Your imaginary file is safe!");
          }
        });
      }, 100);
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          setTimeout(() => {
            const setItemInsert = firebase
              .database()
              .ref(`MemberUser/${res.user.uid}`);
            let newState = {
              imageUrl: this.state.imageUrl,
              Username: this.state.Username,
              Email: this.state.Email,
              Password: this.state.Password,
              CFPassword: this.state.CFPassword,
              Firstname: this.state.Firstname,
              Lastname: this.state.Lastname,
              Phone: this.state.Phone,
              Address: this.state.Address,
              UserType: this.state.UserType
            };
            setItemInsert.set(newState);
            swal({
              title: "Already Registered",
              text: "ํYou want Continue or not?",
              icon: "warning",
              buttons: true,
              dangerMode: true
            }).then(willDelete => {
              if (willDelete) {
                swal("Create User And Password Success", {
                  icon: "success"
                });
                this.onClickCancel();
              } else {
                swal("Your imaginary file is safe!");
              }
            });
          }, 100);
          // this.onClickCancel();
        })
        .catch(function(error) {
          swal("ผิดพลาด!", "มีผู้ใช้งานอยู่ในระบบแล้ว", "error");
          // ...
        });
    }
  }

  onChangeCheckRadio = e => {
    this.setState({ UserType: e.target.value });
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
        style={{ marginBottom: "5rem", marginLeft: "1rem" }}
      >
        <Navbar />
        <div className="container">
          <h3>Register /สมัครสมาชิก </h3>
          <hr />
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
              name="Username"
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
                name="Username"
                id="Username"
                value={this.state.Username}
                onChange={e => this.setState({ Username: e.target.value })}
                whitespace={true}
                maxLength={40}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="Email"
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
                id="Email"
                value={this.state.Email}
                onChange={e => this.setState({ Email: e.target.value })}
                whitespace={true}
                maxLength={40}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="Password"
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
                id="Password"
                value={this.state.Password}
                onChange={e => this.setState({ Password: e.target.value })}
                whitespace={true}
                maxLength={16}
                allowClear
              />
              <a
                href
                onClick={this.onClickResetPassword}
                history={this.props.history}
              >
                <small className="d-flex justify-content-end">
                  <u>เปลี่ยนรหัสผ่าน</u>
                </small>
              </a>
            </Form.Item>
            <Form.Item
              name="CFPassword"
              label={
                <span>
                  Confirm Password &nbsp;
                  <Tooltip title="Password จะต้องตรงกัน">
                    <QuestionCircleOutlined />
                    &nbsp;
                  </Tooltip>
                </span>
              }
              dependencies={["Password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: <small>Please confirm your password</small>
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("Password") === value) {
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
                name="CFPassword"
                id="CFPassword"
                value={this.state.CFPassword}
                onChange={e => this.setState({ CFPassword: e.target.value })}
                whitespace={true}
                maxLength={16}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="Firstname"
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
                name="Firstname"
                id="Firstname"
                value={this.state.Firstname}
                onChange={e => this.setState({ Firstname: e.target.value })}
                whitespace={true}
                maxLength={40}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="Lastname"
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
                name="Lastname"
                id="Lastname"
                value={this.state.Lastname}
                onChange={e => this.setState({ Lastname: e.target.value })}
                whitespace={true}
                maxLength={40}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="Address"
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
                id="Address"
                value={this.state.Address}
                onChange={e => this.setState({ Address: e.target.value })}
                whitespace={true}
                maxLength={150}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="Phone"
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
                name="Phone"
                id="Phone"
                value={this.state.Phone}
                onChange={e => this.setState({ Phone: e.target.value })}
                whitespace={true}
                maxLength={12}
                allowClear
              />
            </Form.Item>

            <Form.Item
              name="UserType"
              label="User Type"
              rules={[
                {
                  required: true,
                  message: <small>Please input your User Type</small>
                }
              ]}
            >
              <Radio.Group
                id="UserType"
                value={this.state.UserType}
                onChange={e => this.onChangeCheckRadio(e)}
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
      </div>
    );
  }
}
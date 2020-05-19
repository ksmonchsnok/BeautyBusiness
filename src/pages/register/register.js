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
import Navbar from "../../components/navbar/navbar.js";
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
    console.log(info.file.status);
  };

  async componentDidMount() {
    let temp = await JSON.parse(localStorage.getItem("ObjUser"));
    if (temp) {
      this.setState({
        imageUrl: temp.imageUrl,
        username: temp.username,
        email: temp.email,
        password: temp.password,
        cf_password: temp.cf_password,
        firstname: temp.firstname,
        lastname: temp.lastname,
        phone: temp.phone,
        address: temp.address,
        member_type: temp.member_type,
      });
      this.formRef.current.setFieldsValue({
        imageUrl: temp.imageUrl,
        username: temp.username,
        email: temp.email,
        password: temp.password,
        cf_password: temp.cf_password,
        firstname: temp.firstname,
        lastname: temp.lastname,
        phone: temp.phone,
        address: temp.address,
        member_type: temp.member_type,
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
    let email = this.state.email;
    let password = this.state.password;
    let checkProps = this.props.location
      ? this.props.location.state
        ? "pass"
        : null
      : null;
    if (this.state.imageUrl !== undefined) {
      // console.log(this.state.imageUrl);

      if (
        checkProps === "pass" &&
        this.props.location.state.mode === "EditUser"
      ) {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(password)
          .then(() => {
            console.log("Password Updated !");
          })
          .catch((error) => {
            console.log(error);
          });

        setTimeout(() => {
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
          setItemInsert.child(user.uid).update(newState);
          localStorage.setItem("ObjUser", JSON.stringify(this.state));
          let temp = JSON.parse(localStorage.getItem("ObjUser"));
          if (temp.password !== this.state.password) {
            firebase
              .auth()
              .signOut()
              .then(function () {
                // Sign-out successful.
                localStorage.removeItem("ObjUser");
              })
              .catch(function (error) {
                // An error happened.
              });
          }
          swal("Update Success!", "", "success").then((value) => {
            this.props.history.push("/");
          });

          // swal({
          //   title: "Update Success",
          //   text: "ํYou want Continue or not?",
          //   icon: "warning",
          //   buttons: true,
          //   dangerMode: true,
          // }).then((willDelete) => {
          //   if (willDelete) {
          //     swal("Up date Success", {
          //       icon: "success",
          //     });
          //     this.onClickCancel();
          //   } else {
          //     swal("Success!");
          //   }
          // });
        }, 100);
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            setTimeout(() => {
              const setItemInsert = firebase
                .database()
                .ref(`member/${res.user.uid}`);
              let newState = {
                member_id: res.user.uid,
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
              setItemInsert.set(newState);
              swal("Register Success!", "", "success").then((value) => {
                this.props.history.push("/");
              });

              // swal({
              //   title: "Registered",
              //   text: "ํYou want Continue or not?",
              //   icon: "warning",
              //   buttons: true,
              //   dangerMode: true,
              // }).then((willDelete) => {
              //   if (willDelete) {
              //     swal("Register Success", {
              //       icon: "success",
              //     });
              //     this.onClickCancel();
              //   } else {
              //     swal("Success!");
              //   }
              // });
            }, 100);
          })
          .catch(function (error) {
            swal("ผิดพลาด!", "มี E-Mail ผู้ใช้นี้อยู่ในระบบแล้ว", "error");
          });
      }
    } else {
      swal("ผิดพลาด!", "กรุณากรอก 'ข้อมูล' และ 'รูปภาพ' ให้ครบ ", "error");
    }
  }

  onChangeCheckRadio = (e) => {
    this.setState({ member_type: e.target.value });
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
        style={{ marginBottom: "5rem", marginLeft: "1rem" }}
      >
        <Navbar />
        <div className="container">
          {this.props.location.state.mode === "EditUser" && (
            <span>
              <h1>Update / แก้ข้อมูลผู้ใช้ </h1>
            </span>
          )}
          {this.props.location.state.mode !== "EditUser" && (
            <span>
              <h1>Register / สมัครสมาชิก </h1>
            </span>
          )}

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
              name="username"
              label="NinkName"
              rules={[
                {
                  required: true,
                  message: <small>Please input your username</small>,
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
                placeholder="NinkName"
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
                placeholder="email@gmail.com"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                whitespace={true}
                maxLength={40}
                allowClear
                disabled={this.props.location.state.mode === "EditUser"}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              // {
              //   <span>
              //      &nbsp;
              //     <Tooltip title="Password จะต้องประกอบไปด้วย A-Z, a-z , 0-9">
              //       <QuestionCircleOutlined />
              //       &nbsp;
              //     </Tooltip>
              //   </span>
              // }
              rules={[
                {
                  min: 6,
                  message: (
                    <small>Password must be at least 6 characters</small>
                  ),
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
                disabled={this.props.location.state.mode === "EditUser"}
              />
            </Form.Item>
            <Form.Item>
              {" "}
              <>
                <a
                  href
                  onClick={this.onClickResetPassword}
                  history={this.props.history}
                >
                  <small
                    className="d-flex justify-content-center"
                    style={{ marginTop: "-2.5rem" }}
                  >
                    <u>เปลี่ยนรหัสผ่าน</u>
                  </small>
                </a>
              </>
            </Form.Item>

            <Form.Item
              name="cf_password"
              style={{ marginTop: "-3rem" }}
              label="Confirm Password "
              // {
              //   <span>
              //     &nbsp;
              //     <Tooltip title="Password จะต้องตรงกัน">
              //       <QuestionCircleOutlined />
              //       &nbsp;
              //     </Tooltip>
              //   </span>
              // }
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
                placeholder="Confirm Password"
                value={this.state.cf_password}
                onChange={(e) => this.setState({ cf_password: e.target.value })}
                whitespace={true}
                maxLength={16}
                allowClear
                disabled={this.props.location.state.mode === "EditUser"}
              />
            </Form.Item>

            <Form.Item
              name="firstname"
              label="First Name"
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
                placeholder="Firstname"
                id="firstname"
                value={this.state.firstname}
                onChange={(e) => this.setState({ firstname: e.target.value })}
                whitespace={true}
                maxLength={40}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Last Name"
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
              label="Address"
              rules={[
                {
                  required: true,
                  message: <small>Please input your address</small>,
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
                placeholder="Ex. เลขที่ หมู่ ซอย ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
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
              {this.props.location.state.mode === "EditUser" && (
                <span>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => this.onGotoSave()}
                  >
                    Update
                  </Button>
                </span>
              )}
              {this.props.location.state.mode !== "EditUser" && (
                <span>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => this.onGotoSave()}
                  >
                    Register
                  </Button>
                </span>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

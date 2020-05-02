import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import { Form, Input, Button, Upload, message, Radio, Checkbox } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import firebase from "firebase";
import Navber from "../../components/navbar/navbar.js";
import swal from "sweetalert";

class RegistrationForm extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mode: "",
      store_name: "",
      open: "",
      phone: "",
      address: "",
      store_type: "",
      lat: "",
      lng: "",
      recommend: "",
      type: [],
      social: "",
      username: "",
      options: [
        { label: "ตัดผมชาย", value: "ตัดผมชาย" },
        { label: "เสริมสวย", value: "เสริมสวย" },
        { label: "ทำเล็บ", value: "ทำเล็บ" },
        { label: "ต่อขนตา", value: "ต่อขนตา" },
        { label: "สักคิ้ว", value: "สักคิ้ว" },
        { label: "แว็กซ์ขน", value: "แว็กซ์ขน" },
        { label: "สปา", value: "สปา" },
        { label: "Tattoo", value: "Tattoo" },
      ],
      userLsit: [],
      store_id: "",
      username: "",
      custom_position: "",
      currentPosition: JSON.parse(localStorage.getItem("Position")),
      fixposition: "",
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
      this.getBase64(info.file.originFileObj, (image) =>
        this.setState({
          image,
          loading: false,
        })
      );
    }
  };

  async componentDidMount() {
    let checkHistory = this.props.location
      ? this.props.location.state
        ? "pass"
        : null
      : null;
    let checUserStore = this.props.UserEditStore
      ? this.props.UserEditStore
      : null;
    if (checkHistory === "pass") {
      let obj = await this.props.location.state.obj;
      this.formRef.current.setFieldsValue({
        member_id: obj.member_id,
        image: obj.image,
        store_name: obj.store_name,
        open: obj.open,
        phone: obj.phone,
        address: obj.address,
        store_type: obj.store_type,
        recommend: obj.recommend,
        lat: obj.lat,
        lng: obj.lng,
        type: obj.type,
        social: obj.social,
        custom_position: obj.custom_position,
      });
      this.setState({
        member_id: obj.member_id,
        image: obj.image,
        store_name: obj.store_name,
        open: obj.open,
        phone: obj.phone,
        address: obj.address,
        store_type: obj.store_type,
        recommend: obj.recommend,
        lat: obj.lat,
        lng: obj.lng,
        type: obj.type,
        social: obj.social,
        custom_position: obj.custom_position,

        mode: "edit",
      });
    } else if (checUserStore === "userEditStore") {
      console.log("userEditStore");
      let obj = JSON.parse(localStorage.getItem("ObjUser"));
      console.log(obj);
      let ref = firebase.database().ref(`Store/${obj.member_id}`);
      ref.once("value").then((snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          console.log(data);
          this.formRef.current.setFieldsValue({
            store_id: data.store_id,
            username: data.username,
            image: data.image,
            store_name: data.store_name,
            open: data.open,
            phone: data.phone,
            address: data.address,
            store_type: data.store_type,
            recommend: data.recommend,
            lat: data.lat,
            lng: data.lng,
            type: data.type,
            social: data.social,
            custom_position: obj.custom_position,
          });
          this.setState({
            store_id: data.store_id,
            username: data.username,
            image: data.image,
            store_name: data.store_name,
            open: data.open,
            phone: data.phone,
            address: data.address,
            store_type: data.store_type,
            recommend: data.recommend,
            lat: data.lat,
            lng: data.lng,
            type: data.type,
            social: data.social,
            custom_position: obj.custom_position,
            mode: "edit",
          });
        } else {
          this.setState({ loadingData: false });
        }
      });
    }
  }

  onChangeCheckBox(checkedValues) {
    this.setState({ type: checkedValues });
  }
  onChangeCheckRadio = (e) => {
    this.setState({ store_type: e.target.value });
  };

  onChangeCheckRadiorecommend = (e) => {
    this.setState({ recommend: e.target.value });
  };

  onChangeCheckCurent = (e) => {
    this.setState({ custom_position: e.target.value });
  };

  onClickCancel = () => {
    if (this.props.UserEditStore) {
      window.location.reload();
    } else {
      window.history.back();
    }
  };

  onGotoSave = (e) => {
    let fixposition = this.state.currentPosition;
    let store_id = "";
    let username = "";
    let obj = JSON.parse(localStorage.getItem("ObjUser"));
    let checkSigninAndOutgoogle = JSON.parse(
      localStorage.getItem("Google-login")
    );
    let checkSigninAndOutfb = JSON.parse(localStorage.getItem("FB-Login"));

    if (obj) {
      store_id = obj.member_id;
      username = obj.username;
    } else if (checkSigninAndOutgoogle) {
      // store_id =obj.e.profileObj.store_name
    } else if (checkSigninAndOutfb) {
      // store_id = obj.store_name
    }

    if (this.state.custom_position === "true") {
      console.log("Fix Position");

      if (
        this.state !== null &&
        this.state.store_id !== undefined &&
        this.state.image !== undefined
      ) {
        if (this.state.mode === "edit") {
          setTimeout(() => {
            const setItemInsert = firebase.database().ref(`Store`);
            let newState = {
              image: this.state.image,
              store_name: this.state.store_name,
              open: this.state.open,
              phone: this.state.phone,
              address: this.state.address,
              store_type: this.state.store_type,
              recommend: this.state.recommend,
              lat: fixposition.lat,
              lng: fixposition.lng,
              type: this.state.type,
              social: this.state.social,
              custom_position: this.state.custom_position,
            };
            setItemInsert.child(store_id).update(newState);
            swal({
              title: "Update Business Success",
              text: "ํYou want Continue or not?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
              .then((willDelete) => {
                if (willDelete) {
                  // swal("Create promotion", {
                  //   icon: "success",
                  // });
                  this.onClickCancel();
                } else {
                  swal("Update Business", "success");
                }
              })
              .catch(function (error) {
                swal("ผิดพลาด!", "ไม่สามารถแก้ไขได้", "error");
              });
          }, 1000);
        } else {
          setTimeout(() => {
            const setItemInsert = firebase.database().ref(`Store/${store_id}`);
            let newState = {
              store_id: store_id,
              username: username,
              image: this.state.image,
              store_name: this.state.store_name,
              open: this.state.open,
              phone: this.state.phone,
              address: this.state.address,
              store_type: this.state.store_type,
              recommend: this.state.recommend,
              lat: fixposition.lat,
              lng: fixposition.lng,
              type: this.state.type,
              social: this.state.social,
              custom_position: this.state.custom_position,
            };
            setItemInsert.set(newState);
            swal({
              title: "Create Business Success",
              text: "ํYou want Continue or not?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
              .then((willDelete) => {
                if (willDelete) {
                  // swal("Create promotion", {
                  //   icon: "success",
                  // });
                  this.onClickCancel();
                } else {
                  swal("Create Business", "success");
                }
              })
              .catch(function (error) {
                swal("ผิดพลาด!", "ไม่สามารถลงทะเบียนธุรกิจได้", "error");
              });
          }, 1000);
        }
      } else {
        swal("ผิดพลาด", "กรุณากรอก 'ข้อมูล ' และ 'รูปภาพ 'ให้ครบ", "error");
        return;
      }
    } else {
      console.log("Custom");

      if (
        this.state !== null &&
        this.state.store_id !== undefined &&
        this.state.image !== undefined
      ) {
        if (this.state.mode === "edit") {
          setTimeout(() => {
            const setItemInsert = firebase.database().ref(`Store`);
            let newState = {
              image: this.state.image,
              store_name: this.state.store_name,
              open: this.state.open,
              phone: this.state.phone,
              address: this.state.address,
              store_type: this.state.store_type,
              recommend: this.state.recommend,
              lat: this.state.lat,
              lng: this.state.lng,
              type: this.state.type,
              social: this.state.social,
              custom_position: this.state.custom_position,
            };
            setItemInsert.child(store_id).update(newState);
            swal({
              title: "Update Business Success",
              text: "ํYou want Continue or not?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
              .then((willDelete) => {
                if (willDelete) {
                  // swal("Create promotion", {
                  //   icon: "success",
                  // });
                  this.onClickCancel();
                } else {
                  swal("Update Business", "success");
                }
              })
              .catch(function (error) {
                swal("ผิดพลาด!", "ไม่สามารถแก้ไขได้", "error");
              });
          }, 1000);
        } else {
          setTimeout(() => {
            const setItemInsert = firebase.database().ref(`Store/${store_id}`);
            let newState = {
              store_id: store_id,
              username: username,
              image: this.state.image,
              store_name: this.state.store_name,
              open: this.state.open,
              phone: this.state.phone,
              address: this.state.address,
              store_type: this.state.store_type,
              recommend: this.state.recommend,
              lat: this.state.lat,
              lng: this.state.lng,
              type: this.state.type,
              social: this.state.social,
              custom_position: this.state.custom_position,
            };
            setItemInsert.set(newState);
            swal({
              title: "Create Business Success",
              text: "ํYou want Continue or not?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
              .then((willDelete) => {
                if (willDelete) {
                  // swal("Create promotion", {
                  //   icon: "success",
                  // });
                  this.onClickCancel();
                } else {
                  swal("Create Business", "success");
                }
              })
              .catch(function (error) {
                swal("ผิดพลาด!", "ไม่สามารถลงทะเบียนธุรกิจได้", "error");
              });
          }, 1000);
        }
      } else {
        swal("ผิดพลาด", "กรุณากรอก 'ข้อมูล ' และ 'รูปภาพ 'ให้ครบ", "error");
        return;
      }
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div classstore_name="ant-upload-text" style={{ marginTop: "1rem" }}>
          Add Picture
        </div>
      </div>
    );
    const { image } = this.state;

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

    const { TextArea } = Input;

    return (
      <div
        id="Add-Update-Store"
        style={{ marginTop: "3rem", marginLeft: "1rem" }}
      >
        <Navber />
        <div classstore_name="container" style={{ marginBottom: "3rem" }}>
          <h2>Register Business / สร้างธุรกิจของคุณ</h2> <hr />
        </div>
        <div classstore_name="container">
          <Form
            {...formItemLayout}
            ref={this.formRef}
            form={this.form}
            store_name="addNewStore"
            onFinish={this.onFinish}
            scrollToFirstError
          >
            <Form.Item store_name="image" label="Picture">
              <Upload
                store_name="image"
                id="image"
                listtype="picture-card"
                classstore_name="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {image ? (
                  <img src={image} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              store_name="store_name"
              label={<span>Business store_name</span>}
              rules={[
                {
                  required: true,
                  message: <small>Please input your Business store_name</small>,
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
              {/* {JSON.stringify(this.state.store_name)} */}
              <Input
                type="textbox"
                store_name="store_name"
                id="store_name"
                placeholder="Ex. ร้านทำเล็บเจ็ดยอด"
                value={this.state.store_name}
                onChange={(e) => this.setState({ store_name: e.target.value })}
                whitespace={true}
                maxLength={40}
                allowClear
              />
            </Form.Item>

            <Form.Item
              store_name="open"
              label={<span>open</span>}
              rules={[
                {
                  required: true,
                  message: <small>Please input your open</small>,
                },
                {
                  type: "string",
                  pattern: new RegExp("^[0-9-.]*$"),
                  message: <small>Please input format time only.</small>,
                },
              ]}
            >
              <Input
                type="textbox"
                store_name="open"
                id="open"
                placeholder="Ex. 10.00 - 20.00"
                value={this.state.open}
                onChange={(e) => this.setState({ open: e.target.value })}
                whitespace={true}
                maxLength={11}
                allowClear
              />
            </Form.Item>

            <Form.Item
              store_name="phone"
              label="phone Number"
              rules={[
                {
                  required: true,
                  message: <small>Please input your phone number</small>,
                },
                {
                  min: 10,
                  pattern: new RegExp("^[0-9 -]*$"),
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
                store_name="phone"
                id="phone"
                placeholder="Ex : 085 555 5555"
                value={this.state.phone}
                onChange={(e) => this.setState({ phone: e.target.value })}
                whitespace={true}
                maxLength={10}
                allowClear
              />
            </Form.Item>

            <Form.Item
              store_name="address"
              label="address"
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
                store_name="address"
                id="address"
                placeholder="Ex. 111/2 เจ็ดยอด ต.ช้างเผือก อ.เมือง จ.เชียงใหม่"
                value={this.state.address}
                onChange={(e) => this.setState({ address: e.target.value })}
                whitespace={true}
                maxLength={150}
                allowClear
              />
            </Form.Item>
            <Form.Item
              store_name="social"
              label={<span>Facebook / Instagram</span>}
              rules={[
                {
                  required: true,
                  message: (
                    <small>Please input your Facebook / Instagram</small>
                  ),
                },
                // {
                //   type: "string",
                //   pattern: new RegExp("^[A-Za-zก-๙0-9-.]*$"),
                //   message: <small>Please input alphabetical only.</small>
                // },
                // {
                //   min: 4,
                //   message: <small>Must be at least 3 characters</small>
                // }
              ]}
            >
              <Input
                type="textbox"
                store_name="social"
                id="social"
                placeholder="Ex. https://www.facebook.com/me"
                value={this.state.social}
                onChange={(e) => this.setState({ social: e.target.value })}
                maxLength={150}
                allowClear
              />
            </Form.Item>

            <Form.Item
              store_name="custom_position"
              label="ตำแหน่งที่ตั้งธุรกิจ"
              rules={[
                {
                  // required: true,
                  // message: <small>Please input your Business Location</small>,
                },
              ]}
            >
              {" "}
              <Radio.Group
                id="custom_position"
                value={this.state.custom_position}
                onChange={(e) => this.onChangeCheckCurent(e)}
              >
                <Radio value="true" store_name="true">
                  ใช้ตำแหน่งปัจจุบัน
                </Radio>
                <Radio value="false" store_name="false">
                  กำหนดเอง
                </Radio>
              </Radio.Group>
            </Form.Item>

            {this.state.custom_position === "false" && (
              <span>
                <Form.Item
                  store_name="lat"
                  label="latitude"
                  rules={[
                    {
                      required: true,
                      message: <small>Please input your latitude</small>,
                    },
                    {
                      min: 30,
                      pattern: new RegExp("^[0-9 .]*$"),
                      message: <small>Number Only</small>,
                    },
                  ]}
                >
                  <Input
                    type="textbox"
                    store_name="lat"
                    id="lat"
                    placeholder="18.812138"
                    value={this.state.lat}
                    onChange={(e) => this.setState({ lat: e.target.value })}
                    maxLength={10}
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  store_name="lng"
                  label="Longitude"
                  rules={[
                    {
                      required: true,
                      message: <small>Please input your Longitude</small>,
                    },
                    {
                      min: 30,
                      pattern: new RegExp("^[0-9 .]*$"),
                      message: <small>Number Only</small>,
                    },
                  ]}
                >
                  <Input
                    type="textbox"
                    store_name="lng"
                    id="lng"
                    placeholder="98.964444"
                    value={this.state.lng}
                    onChange={(e) => this.setState({ lng: e.target.value })}
                    maxLength={10}
                    allowClear
                  />
                </Form.Item>
              </span>
            )}

            <Form.Item
              store_name="recommend"
              label="recommend Store"
              rules={[
                {
                  required: true,
                  message: <small>Please input your recommend Store</small>,
                },
              ]}
            >
              <Radio.Group
                id="recommend"
                value={this.state.recommend}
                onChange={(e) => this.onChangeCheckRadiorecommend(e)}
              >
                <Radio value="true" store_name="true">
                  แนะนำ
                </Radio>
                <Radio value="false" store_name="false">
                  ไม่แนะนำ
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              store_name="store_type"
              label="Business type"
              rules={[
                {
                  required: true,
                  message: <small>Please input your Business type</small>,
                },
              ]}
            >
              <Radio.Group
                id="store_type"
                value={this.state.store_type}
                onChange={(e) => this.onChangeCheckRadio(e)}
              >
                <Radio value="มีหน้าร้าน" store_name="มีหน้าร้าน">
                  มีร้าน
                </Radio>
                <Radio value="ฟรีแลนซ์" store_name="ฟรีแลนซ์">
                  ฟรีแลนซ์
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              store_name="type"
              label="Service type"
              rules={[
                {
                  required: true,
                  message: <small>Please input your Service type</small>,
                },
              ]}
            >
              <Checkbox.Group
                id="type"
                options={this.state.options}
                onChange={(e) => this.onChangeCheckBox(e)}
              />
            </Form.Item>
            <Form.Item
              {...tailFormItemLayout}
              style={{ marginBottom: "6rem", marginTop: "4rem" }}
            >
              <Button
                type="danger"
                htmltype="reset"
                style={{ marginRight: "2rem" }}
                onClick={this.onClickCancel}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmltype="submit"
                // loading="true"
                onClick={() => this.onGotoSave()}
              >
                Register Business
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;

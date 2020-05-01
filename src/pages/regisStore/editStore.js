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
      ItemID: "",
      BusinessName: "",
      OpenShop: "",
      PhoneNumbe: "",
      Address: "",
      BusinessType: "",
      Lat: "",
      Lng: "",
      Recommend: "",
      ServiceType: [],
      Social: "",
      UsernameOfSotre: "",
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
      userOfStoreId: "",
      UserStoreName: "",
      customPosition: "",
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
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
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
        ItemID: obj.ItemID,
        imageUrl: obj.imageUrl,
        BusinessName: obj.Name,
        OpenShop: obj.Open,
        PhoneNumbe: obj.Phone,
        Address: obj.Address,
        BusinessType: obj.StoreType,
        Recommend: obj.Recommend,
        Lat: obj.Lat,
        Lng: obj.Lng,
        ServiceType: obj.Type,
        Social: obj.Social,
        customPosition: obj.customPosition,
      });
      this.setState({
        ItemID: obj.ItemID,
        imageUrl: obj.imageUrl,
        BusinessName: obj.Name,
        OpenShop: obj.Open,
        PhoneNumbe: obj.Phone,
        Address: obj.Address,
        BusinessType: obj.StoreType,
        Recommend: obj.Recommend,
        Lat: obj.Lat,
        Lng: obj.Lng,
        ServiceType: obj.Type,
        Social: obj.Social,
        customPosition: obj.customPosition,
        mode: "userEditStore",
      });
    } else if (checUserStore === "userEditStore") {
      console.log("userEditStore");
      let obj = JSON.parse(localStorage.getItem("ObjUser"));
      console.log(obj);
      let ref = firebase.database().ref(`Store/${obj.MemberId}`);
      ref.once("value").then((snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          console.log(data);

          this.formRef.current.setFieldsValue({
            userOfStoreId: data.userOfStoreId,
            UserStoreName: data.UserStoreName,
            imageUrl: data.imageUrl,
            BusinessName: data.Name,
            OpenShop: data.Open,
            PhoneNumbe: data.Phone,
            Address: data.Address,
            BusinessType: data.StoreType,
            Recommend: data.Recommend,
            Lat: data.Lat,
            Lng: data.Lng,
            ServiceType: data.Type,
            Social: data.Social,
            customPosition: obj.customPosition,
          });
          this.setState({
            userOfStoreId: data.userOfStoreId,
            UserStoreName: data.UserStoreName,
            imageUrl: data.imageUrl,
            BusinessName: data.Name,
            OpenShop: data.Open,
            PhoneNumbe: data.Phone,
            Address: data.Address,
            BusinessType: data.StoreType,
            Recommend: data.Recommend,
            Lat: data.Lat,
            Lng: data.Lng,
            ServiceType: data.Type,
            Social: data.Social,
            customPosition: obj.customPosition,

            mode: "userEditStore",
          });
        } else {
          this.setState({ loadingData: false });
        }
      });
    }
  }

  onChangeCheckBox(checkedValues) {
    this.setState({ ServiceType: checkedValues });
  }
  onChangeCheckRadio = (e) => {
    this.setState({ BusinessType: e.target.value });
  };

  onChangeCheckRadioRecommend = (e) => {
    this.setState({ Recommend: e.target.value });
  };

  onChangeCheckCurent = (e) => {
    this.setState({ customPosition: e.target.value });
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

    if (this.state.customPosition !== false) {
      let userOfStoreId = "";
      let UserStoreName = "";
      let obj = JSON.parse(localStorage.getItem("ObjUser"));
      let checkSigninAndOutgoogle = JSON.parse(
        localStorage.getItem("Google-login")
      );
      let checkSigninAndOutfb = JSON.parse(localStorage.getItem("FB-Login"));

      if (obj) {
        userOfStoreId = obj.MemberId;
        UserStoreName = obj.Username;
      } else if (checkSigninAndOutgoogle) {
        // userOfStoreId =obj.e.profileObj.name
      } else if (checkSigninAndOutfb) {
        // userOfStoreId = obj.name
      }
      if (this.state !== null && this.state.userOfStoreId) {
        if (this.state.mode === "userEditStore") {
          setTimeout(() => {
            const setItemInsert = firebase.database().ref(`Store`);
            let newState = {
              imageUrl: this.state.imageUrl,
              Name: this.state.BusinessName,
              Open: this.state.OpenShop,
              Phone: this.state.PhoneNumbe,
              Address: this.state.Address,
              StoreType: this.state.BusinessType,
              Recommend: this.state.Recommend,
              Lat: fixposition.Lat,
              Lng: fixposition.Lng,
              Type: this.state.ServiceType,
              Social: this.state.Social,
              customPosition: this.state.customPosition,
            };
            setItemInsert.child(userOfStoreId).update(newState);
            swal({
              title: "Update Business Success",
              text: "ํYou want Continue or not?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
              .then((willDelete) => {
                if (willDelete) {
                  swal("Create promotion", {
                    icon: "success",
                  });
                  this.onClickCancel();
                } else {
                  swal("Update Business", "success");
                }
              })
              .catch(function (error) {
                swal("ผิดพลาด!", "ไม่สามารถแก้ไขได้", "error");
              });
            // this.onClickCancel();
          }, 1000);
        } else {
          setTimeout(() => {
            const setItemInsert = firebase
              .database()
              .ref(`Store/${userOfStoreId}`);
            let newState = {
              userOfStoreId: userOfStoreId,
              UserStoreName: UserStoreName,
              imageUrl: this.state.imageUrl,
              Name: this.state.BusinessName,
              Open: this.state.OpenShop,
              Phone: this.state.PhoneNumbe,
              Address: this.state.Address,
              StoreType: this.state.BusinessType,
              Recommend: this.state.Recommend,
              Lat: fixposition.Lat,
              Lng: fixposition.Lng,
              Type: this.state.ServiceType,
              Social: this.state.Social,
              customPosition: this.state.customPosition,
            };
            setItemInsert.set(newState);
            // this.onClickCancel();
            swal({
              title: "Create Business Success",
              text: "ํYou want Continue or not?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
              .then((willDelete) => {
                if (willDelete) {
                  swal("Create promotion", {
                    icon: "success",
                  });
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
        swal("ผิดพลาด", "กรุณากรอกข้อมูลให้ครบ", "error");
        return;
      }

      console.log("Fix Position");
    } else {
      let userOfStoreId = "";
      let UserStoreName = "";
      let obj = JSON.parse(localStorage.getItem("ObjUser"));
      let checkSigninAndOutgoogle = JSON.parse(
        localStorage.getItem("Google-login")
      );
      let checkSigninAndOutfb = JSON.parse(localStorage.getItem("FB-Login"));

      if (obj) {
        userOfStoreId = obj.MemberId;
        UserStoreName = obj.Username;
      } else if (checkSigninAndOutgoogle) {
        // userOfStoreId =obj.e.profileObj.name
      } else if (checkSigninAndOutfb) {
        // userOfStoreId = obj.name
      }
      if (this.state !== null && this.state.userOfStoreId) {
        if (this.state.mode === "userEditStore") {
          setTimeout(() => {
            const setItemInsert = firebase.database().ref(`Store`);
            let newState = {
              imageUrl: this.state.imageUrl,
              Name: this.state.BusinessName,
              Open: this.state.OpenShop,
              Phone: this.state.PhoneNumbe,
              Address: this.state.Address,
              StoreType: this.state.BusinessType,
              Recommend: this.state.Recommend,
              Lat: this.state.Lat,
              Lng: this.state.Lng,
              Type: this.state.ServiceType,
              Social: this.state.Social,
              customPosition: this.state.customPosition,
            };
            setItemInsert.child(userOfStoreId).update(newState);
            swal({
              title: "Update Business Success",
              text: "ํYou want Continue or not?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
              .then((willDelete) => {
                if (willDelete) {
                  swal("Create promotion", {
                    icon: "success",
                  });
                  this.onClickCancel();
                } else {
                  swal("Update Business", "success");
                }
              })
              .catch(function (error) {
                swal("ผิดพลาด!", "ไม่สามารถแก้ไขได้", "error");
              });
            // this.onClickCancel();
          }, 1000);
        } else {
          setTimeout(() => {
            const setItemInsert = firebase
              .database()
              .ref(`Store/${userOfStoreId}`);
            let newState = {
              userOfStoreId: userOfStoreId,
              UserStoreName: UserStoreName,
              imageUrl: this.state.imageUrl,
              Name: this.state.BusinessName,
              Open: this.state.OpenShop,
              Phone: this.state.PhoneNumbe,
              Address: this.state.Address,
              StoreType: this.state.BusinessType,
              Recommend: this.state.Recommend,
              Lat: this.state.Lat,
              Lng: this.state.Lng,
              Type: this.state.ServiceType,
              Social: this.state.Social,
              customPosition: this.state.customPosition,
            };
            setItemInsert.set(newState);
            // this.onClickCancel();
            swal({
              title: "Create Business Success",
              text: "ํYou want Continue or not?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
              .then((willDelete) => {
                if (willDelete) {
                  swal("Create promotion", {
                    icon: "success",
                  });
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
        swal("ผิดพลาด", "กรุณากรอกข้อมูลให้ครบ", "error");
        return;
      }

      console.log("custom");
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
        style={{ marginTop: "-8rem", marginLeft: "1rem" }}
      >
        <Navber />
        {this.props.UserEditStore === "userEditStore" && (
          <span>
            <div className="container" style={{ marginBottom: "3rem" }}>
              <h2>Update Business / แก้ไขข้อมูลธุรกิจของคุณ</h2> <hr />
            </div>
          </span>
        )}
        {this.props.UserEditStore !== "userEditStore" && (
          <div className="container" style={{ marginBottom: "3rem" }}>
            <h2>Register Business / สร้างธุรกิจของคุณ</h2> <hr />
          </div>
        )}
        <div className="container">
          <Form
            {...formItemLayout}
            ref={this.formRef}
            form={this.form}
            name="addNewStore"
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
              name="BusinessName"
              label={<span>Business Name</span>}
              rules={[
                {
                  required: true,
                  message: <small>Please input your Business Name</small>,
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
              {/* {JSON.stringify(this.state.BusinessName)} */}
              <Input
                type="textbox"
                name="BusinessName"
                id="BusinessName"
                placeholder="Ex. ร้านทำเล็บเจ็ดยอด"
                value={this.state.BusinessName}
                onChange={(e) =>
                  this.setState({ BusinessName: e.target.value })
                }
                whitespace={true}
                maxLength={40}
                allowClear
              />
            </Form.Item>

            <Form.Item
              name="OpenShop"
              label={<span>Open</span>}
              rules={[
                {
                  required: true,
                  message: <small>Please input your Open</small>,
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
                name="OpenShop"
                id="OpenShop"
                placeholder="Ex. 10.00 - 20.00"
                value={this.state.OpenShop}
                onChange={(e) => this.setState({ OpenShop: e.target.value })}
                whitespace={true}
                maxLength={11}
                allowClear
              />
            </Form.Item>

            <Form.Item
              name="PhoneNumbe"
              label="Phone Number"
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
                name="PhoneNumbe"
                id="PhoneNumbe"
                placeholder="Ex : 085 555 5555"
                value={this.state.PhoneNumbe}
                onChange={(e) => this.setState({ PhoneNumbe: e.target.value })}
                whitespace={true}
                maxLength={10}
                allowClear
              />
            </Form.Item>

            <Form.Item
              name="Address"
              label="Address"
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
                name="Address"
                id="Address"
                placeholder="Ex. 111/2 เจ็ดยอด ต.ช้างเผือก อ.เมือง จ.เชียงใหม่"
                value={this.state.Address}
                onChange={(e) => this.setState({ Address: e.target.value })}
                whitespace={true}
                maxLength={150}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="Social"
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
                name="Social"
                id="Social"
                placeholder="Ex. https://www.facebook.com/me"
                value={this.state.Social}
                onChange={(e) => this.setState({ Social: e.target.value })}
                maxLength={150}
                allowClear
              />
            </Form.Item>

            <Form.Item
              name="customPosition"
              label="ตำแหน่งที่ตั้งธุรกิจ"
              // rules={[
              //   {
              //     required: true,
              //     message: <small>Please input your Business Location</small>,
              //   },
              // ]}
            >
              {" "}
              <Radio.Group
                id="customPosition"
                value={this.state.customPosition}
                onChange={(e) => this.onChangeCheckCurent(e)}
              >
                <Radio value="true" name="true">
                  ใช้ตำแหน่งปัจจุบัน
                </Radio>
                <Radio value="false" name="false">
                  กำหนดเอง
                </Radio>
              </Radio.Group>
            </Form.Item>

            {this.state.customPosition === "false" && (
              <span>
                <Form.Item
                  name="Lat"
                  label="Latitude"
                  rules={[
                    {
                      required: true,
                      message: <small>Please input your Latitude</small>,
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
                    name="Lat"
                    id="Lat"
                    placeholder="18.812138"
                    value={this.state.Lat}
                    onChange={(e) => this.setState({ Lat: e.target.value })}
                    maxLength={10}
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  name="Lng"
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
                    name="Lng"
                    id="Lng"
                    placeholder="98.964444"
                    value={this.state.Lng}
                    onChange={(e) => this.setState({ Lng: e.target.value })}
                    maxLength={10}
                    allowClear
                  />
                </Form.Item>
              </span>
            )}

            <Form.Item
              name="Recommend"
              label="Recommend Store"
              rules={[
                {
                  required: true,
                  message: <small>Please input your Recommend Store</small>,
                },
              ]}
            >
              <Radio.Group
                id="Recommend"
                value={this.state.Recommend}
                onChange={(e) => this.onChangeCheckRadioRecommend(e)}
              >
                <Radio value="true" name="true">
                  แนะนำ
                </Radio>
                <Radio value="false" name="false">
                  ไม่แนะนำ
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="BusinessType"
              label="Business Type"
              rules={[
                {
                  required: true,
                  message: <small>Please input your Business Type</small>,
                },
              ]}
            >
              <Radio.Group
                id="BusinessType"
                value={this.state.BusinessType}
                onChange={(e) => this.onChangeCheckRadio(e)}
              >
                <Radio value="มีหน้าร้าน" name="มีหน้าร้าน">
                  มีร้าน
                </Radio>
                <Radio value="ฟรีแลนซ์" name="ฟรีแลนซ์">
                  ฟรีแลนซ์
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="ServiceType"
              label="Service Type"
              rules={[
                {
                  required: true,
                  message: <small>Please input your Service Type</small>,
                },
              ]}
            >
              <Checkbox.Group
                id="ServiceType"
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
                htmlType="reset"
                style={{ marginRight: "2rem" }}
                onClick={this.onClickCancel}
              >
                Cancel
              </Button>
              {this.state.mode === "userEditStore" && (
                <Button
                  type="primary"
                  htmlType="submit"
                  // loading="true"
                  onClick={() => this.onGotoSave()}
                >
                  Register Business
                </Button>
              )}
              {this.state.mode !== "userEditStore" && (
                <Button
                  type="primary"
                  htmlType="submit"
                  // loading="true"
                  onClick={() => this.onGotoSave()}
                >
                  Update Business
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;

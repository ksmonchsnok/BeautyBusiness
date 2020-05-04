import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Radio,
  Checkbox,
  Select,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import firebase from "firebase";
import Navber from "../../components/navbar/navbar-Admin.js";
import swal from "sweetalert";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

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
      usernameOfSotre: "",
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
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  async componentDidMount() {
    await this.getMember();
    if (this.props.location.state.mode === "edit") {
      let obj = await this.props.location.state.obj;
      this.formRef.current.setFieldsValue({
        mode: "edit",
        store_id: obj.store_id,
        username: obj.username,
        imageUrl: obj.imageUrl,
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
        mode: "edit",
        store_id: obj.store_id,
        username: obj.username,
        imageUrl: obj.imageUrl,
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
    window.history.back();
  };

  onClickSave() {
    let fixposition = this.state.currentPosition;

    if (this.state.custom_position === "true") {
      console.log("Fix Position");

      if (
        this.state !== null &&
        this.state.store_id &&
        this.state.imageUrl !== undefined
      ) {
        if (this.state.mode === "edit") {
          setTimeout(() => {
            swal("Update Business Success", " ", "success");
            const setItemInsert = firebase.database().ref(`store`);
            let newState = {
              imageUrl: this.state.imageUrl,
              store_name: this.state.store_name,
              open: this.state.open,
              phone: this.state.phone,
              address: this.state.address,
              store_type: this.state.store_type,
              recommend: this.state.recommend,
              lat: fixposition.Lat,
              lng: fixposition.Lng,
              type: this.state.type,
              social: this.state.social,
              custom_position: this.state.custom_position,
            };
            setItemInsert.child(this.state.store_id).update(newState);
            this.onClickCancel();
          }, 500);
        } else {
          setTimeout(() => {
            swal("Create Business Success", " ", "success");
            const setItemInsert = firebase
              .database()
              .ref(`store/${this.state.store_id}`);
            let newState = {
              store_id: this.state.store_id,
              username: this.state.username,
              imageUrl: this.state.imageUrl,
              store_name: this.state.store_name,
              open: this.state.open,
              phone: this.state.phone,
              address: this.state.address,
              store_type: this.state.store_type,
              recommend: this.state.recommend,
              lat: fixposition.Lat,
              lng: fixposition.Lng,
              type: this.state.type,
              social: this.state.social,
              custom_position: this.state.custom_position,
              discount_status: false,
              promotion_status: false,
            };
            setItemInsert.set(newState);
            this.onClickCancel();
          }, 500);
        }
      } else {
        swal("ผิดพลาด", "กรุณากรอก 'ข้อมูล' และ 'รูปภาพ' ให้ครบ", "error");
        return;
      }
    } else {
      console.log("custom");

      if (
        this.state !== null &&
        this.state.store_id &&
        this.state.imageUrl !== undefined
      ) {
        if (this.state.mode === "edit") {
          setTimeout(() => {
            swal("Update Business Success", "", "success");
            const setItemInsert = firebase.database().ref(`store`);
            let newState = {
              imageUrl: this.state.imageUrl,
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
            setItemInsert.child(this.state.store_id).update(newState);
            this.onClickCancel();
          }, 500);
        } else {
          setTimeout(() => {
            swal("Create Business Success", "", "success");
            const setItemInsert = firebase
              .database()
              .ref(`store/${this.state.store_id}`);
            let newState = {
              store_id: this.state.store_id,
              username: this.state.username,
              imageUrl: this.state.imageUrl,
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
            this.onClickCancel();
          }, 500);
        }
      } else {
        swal("ผิดพลาด", "กรุณากรอก 'ข้อมูล' และ 'รูปภาพ' ให้ครบ", "error");
        return;
      }
    }
  }

  getMember() {
    let checkUserStore = [];
    let user = [];
    firebase
      .database()
      .ref("store")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          checkUserStore = Object.values(snapshot.val());
        }
      });
    setTimeout(() => {
      firebase
        .database()
        .ref("member")
        .once("value")
        .then((snapshot) => {
          if (snapshot.val()) {
            let data = Object.values(snapshot.val());
            let index = "";
            let arr = data;
            for (let i = 0; i < checkUserStore.length; i++) {
              index = data.findIndex(
                (v) => v.member_id === checkUserStore[i].store_id
              );
              if (index > -1) {
                arr.splice(index, 1);
              }
              data = arr;
            }
            data.forEach((v) => {
              if (v.member_type === "ผู้ให้บริการ") {
                user.push({ value: v.member_id, label: v.username });
              }
            });
            this.setState({ userLsit: user });
          }
        });
    }, 500);
  }
  setStorestore_name = (e) => {
    this.state.userLsit.forEach((v) => {
      if (v.value === e) {
        this.setState({ store_id: e, username: v.label });
      }
    });
  };

  render() {
    console.log(this.state.userLsit);

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
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

    const RegistrationForm = () => {
      const [form] = Form.useForm();

      const onFinish = (values) => {
        console.log("Received values of form: ", values);
      };
    };
    const { TextArea } = Input;
    const { Option } = Select;

    function onChange(value) {
      console.log(`selected ${value}`);
    }

    function onSearch(val) {
      console.log("search:", val);
    }

    return (
      <div
        id="Add-Update-Store"
        style={{ marginTop: "3rem", marginLeft: "1rem", paddingRight: "1rem" }}
      >
        <Navber />
        <div className="container" style={{ marginBottom: "5rem" }}>
          {this.props.location.state.mode !== "edit" && (
            <h1>Create Business</h1>
          )}
          {this.props.location.state.mode === "edit" && (
            <h1>Update Business</h1>
          )}

          <hr />
          <div
            className="row container"
            style={{ marginBottom: "1rem", marginTop: "1.5rem" }}
          >
            <h4>Select User</h4>
            {this.state.mode === "edit" && this.state.username !== "" ? (
              <Input
                style={{
                  width: 300,
                  marginLeft: "1.5rem",
                  height: "3rem",
                }}
                value={this.state.username}
                whitespace={true}
                disabled
              />
            ) : (
              <Select
                showSearch
                style={{ width: 300, marginLeft: "1.5rem", height: "1.5rem" }}
                placeholder="Select User"
                optionFilterProp="children"
                onChange={this.setStorestore_name}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {this.state.userLsit &&
                  this.state.userLsit.map((d, index) => {
                    return (
                      <Option
                        key={index}
                        value={d.value}
                        style={{ fontSize: "1.1rem" }}
                      >
                        {d.label}
                      </Option>
                    );
                  })}
              </Select>
            )}
          </div>
        </div>

        <Form
          {...formItemLayout}
          ref={this.formRef}
          form={this.form}
          store_name="addNewStore"
          onFinish={this.onFinish}
          scrollToFirstError
        >
          <Form.Item name="imageUrl" label="Picture">
            <Upload
              name="imageUrl"
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
            name="store_name"
            label="Business Name"
            rules={[
              {
                required: true,
                message: <small>Please input your Business store_name</small>,
              },
              {
                type: "regexp",
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
              name="store_name"
              id="store_name"
              placeholder="Business Name"
              value={this.state.store_name}
              onChange={(e) => this.setState({ store_name: e.target.value })}
              whitespace={true}
              maxLength={40}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="open"
            label="Open"
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
              {
                min: 4,
                message: <small>Must be at least 3 characters</small>,
              },
            ]}
          >
            <Input
              type="textbox"
              name="open"
              placeholder="10.00 - 20.00 "
              id="open"
              value={this.state.open}
              onChange={(e) => this.setState({ open: e.target.value })}
              whitespace={true}
              maxLength={11}
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
              placeholder="address"
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
              whitespace={true}
              maxLength={150}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="social"
            label="Facebook"
            rules={[
              {
                required: true,
                message: <small>Please input your Facebook / Instagram</small>,
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
              name="social"
              id="social"
              placeholder="https://th-th.facebook.com/"
              value={this.state.social}
              onChange={(e) => this.setState({ social: e.target.value })}
              maxLength={150}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="custom_position"
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
                name="lat"
                label="Latitude"
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
                  name="lat"
                  id="lat"
                  placeholder="18.812138"
                  value={this.state.lat}
                  onChange={(e) => this.setState({ lat: e.target.value })}
                  maxLength={10}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                name="lng"
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
                  name="lng"
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
            name="recommend"
            label="Recommend Store"
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
              <Radio value="true" name="true">
                แนะนำ
              </Radio>
              <Radio value="false" name="false">
                ไม่แนะนำ
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="store_type"
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
              <Radio value="มีหน้าร้าน" name="มีหน้าร้าน">
                มีร้าน
              </Radio>
              <Radio value="ฟรีแลนซ์" name="ฟรีแลนซ์">
                ฟรีแลนซ์
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="type"
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
              onClick={() => this.onClickSave()}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ firebase }) {
  return {
    Member: firebase.ordered.member,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/member" }]),
  connect(mapStateToProps)
);

export default enhance(RegistrationForm);

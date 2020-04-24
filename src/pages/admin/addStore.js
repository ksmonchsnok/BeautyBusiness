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
    await this.getMemberUser();
    if (this.props.location.state.mode === "edit") {
      let obj = await this.props.location.state.obj;
      this.formRef.current.setFieldsValue({
        mode: "edit",
        userOfStoreId: obj.userOfStoreId,
        UserStoreName: obj.UserStoreName,
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
      });
      this.setState({
        mode: "edit",
        userOfStoreId: obj.userOfStoreId,
        UserStoreName: obj.UserStoreName,
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

  onClickCancel = () => {
    window.history.back();
  };

  onClickSave() {
    if (this.state !== null && this.state.userOfStoreId) {
      if (this.state.mode === "edit") {
        setTimeout(() => {
          swal("แก้ไขเรียบร้อย", "success");
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
          };
          setItemInsert.child(this.state.userOfStoreId).update(newState);
          this.onClickCancel();
        }, 500);
      } else {
        setTimeout(() => {
          swal("สร้างเรียบร้อย", "success");
          const setItemInsert = firebase
            .database()
            .ref(`Store/${this.state.userOfStoreId}`);
          let newState = {
            userOfStoreId: this.state.userOfStoreId,
            UserStoreName: this.state.UserStoreName,
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
          };
          setItemInsert.set(newState);
          this.onClickCancel();
        }, 500);
      }
    } else {
      swal("ผิดพลาด", "กรุณากรอกข้อมูลให้ครบ", "error");
      return;
    }
  }

  getMemberUser() {
    let checkUserStore = [];
    let user = [];
    firebase
      .database()
      .ref("Store")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          checkUserStore = Object.values(snapshot.val());
        }
      });
    setTimeout(() => {
      firebase
        .database()
        .ref("MemberUser")
        .once("value")
        .then((snapshot) => {
          if (snapshot.val()) {
            let data = Object.values(snapshot.val());
            let index = "";
            let arr = data;
            for (let i = 0; i < checkUserStore.length; i++) {
              index = data.findIndex(
                (v) => v.UserId === checkUserStore[i].userOfStoreId
              );
              arr.splice(index, 1);
              data = arr;
            }
            data.forEach((v) => {
              if (v.UserType === "ผู้ให้บริการ") {
                user.push({ value: v.UserId, label: v.Username });
              }
            });
            this.setState({ userLsit: user });
          }
        });
    }, 500);
  }
  setStorename = (e) => {
    this.state.userLsit.forEach((v) => {
      if (v.value === e) {
        this.setState({ userOfStoreId: e, UserStoreName: v.label });
      }
    });
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
        style={{ marginTop: "3rem", marginLeft: "1rem" }}
      >
        <Navber />
        <div className="container" style={{ marginBottom: "5rem" }}>
          {" "}
          <h3>Create Business</h3>
          <hr />
          <div
            className="row container"
            style={{ marginBottom: "1rem", marginTop: "1.5rem" }}
          >
            <h4>Select User</h4>
            {this.state.mode === "edit" && this.state.UserStoreName !== "" ? (
              <Input
                style={{ width: 300, marginLeft: "1.5rem", height: "2rem" }}
                value={this.state.UserStoreName}
                whitespace={true}
                disabled
              />
            ) : (
              <Select
                showSearch
                style={{ width: 300, marginLeft: "1.5rem", height: "2rem" }}
                placeholder="Select a User"
                optionFilterProp="children"
                onChange={this.setStorename}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {this.state.userLsit &&
                  this.state.userLsit.map((d, index) => {
                    return (
                      <Option key={index} value={d.value}>
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
              placeholder="Business Name"
              value={this.state.BusinessName}
              onChange={(e) => this.setState({ BusinessName: e.target.value })}
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
              {
                min: 4,
                message: <small>Must be at least 3 characters</small>,
              },
            ]}
          >
            <Input
              type="textbox"
              name="OpenShop"
              placeholder="10.00 - 20.00 "
              id="OpenShop"
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
                min: 12,
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
              placeholder="Ex. 085-555-5555"
              value={this.state.PhoneNumbe}
              onChange={(e) => this.setState({ PhoneNumbe: e.target.value })}
              whitespace={true}
              maxLength={12}
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
              placeholder="Address"
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
              name="Social"
              id="Social"
              placeholder="https://th-th.facebook.com/"
              value={this.state.Social}
              onChange={(e) => this.setState({ Social: e.target.value })}
              maxLength={150}
              allowClear
            />
          </Form.Item>

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
            <Button
              type="primary"
              htmlType="submit"
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
    Memberuser: firebase.ordered.Memberuser,
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/Memberuser" }]),
  connect(mapStateToProps)
);

export default enhance(RegistrationForm);

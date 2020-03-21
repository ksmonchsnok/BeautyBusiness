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
import firebase from "firebase";

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
      ServiceType: [],
      options: [
        { label: "ตัดผมชาย", value: 1 },
        { label: "เสริมสวย", value: 2 },
        { label: "ทำเล็บ", value: 3 },
        { label: "ต่อขนตา", value: 4 },
        { label: "สักคิ้ว", value: 5 },
        { label: "แว็กซ์ขน", value: 6 },
        { label: "สปา", value: 7 },
        { label: "Tattoo", value: 8 }
      ]
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
    if (this.props.location.state.mode === "edit") {
      let obj = await this.props.location.state.obj;
      console.log(this.formRef);
      this.formRef.current.setFieldsValue({
        mode: "edit",
        ItemID: obj.ItemID,
        imageUrl: obj.imageUrl,
        BusinessName: obj.Name,
        OpenShop: obj.Open,
        PhoneNumbe: obj.Phone,
        Address: obj.Address,
        BusinessType: obj.StoreType,
        ServiceType: obj.Type
      });
      this.setState({
        mode: "edit",
        ItemID: obj.ItemID,
        imageUrl: obj.imageUrl,
        BusinessName: obj.Name,
        OpenShop: obj.Open,
        PhoneNumbe: obj.Phone,
        Address: obj.Address,
        BusinessType: obj.StoreType,
        ServiceType: obj.Type
      });
    }
  }
  onChangeCheckBox(checkedValues) {
    this.setState({ ServiceType: checkedValues });
  }
  onChangeCheckRadio = e => {
    this.setState({ BusinessType: e.target.value });
  };
  onClickCancel = () => {
    this.props.history.push("/AdminPage");
  };
  onGotoSave() {
    setTimeout(() => {
      let tempId = [];
      const itemsRef = firebase.database().ref("Store");
      itemsRef.once("value").then(snapshot => {
        const temp = snapshot.val();
        let newID = [];
        console.log(temp);
        for (let item in temp) {
          newID.push({
            item_id: item
          });
        }
        tempId = newID[newID.length - 1];
        if (this.state.mode === "edit") {
          const setItemInsert = firebase.database().ref(`Store`);
          let newState = {
            imageUrl: this.state.imageUrl,
            Name: this.state.BusinessName,
            Open: this.state.OpenShop,
            Phone: this.state.PhoneNumbe,
            Address: this.state.Address,
            StoreType: this.state.BusinessType,
            Type: this.state.ServiceType
          };
          setItemInsert.child(this.state.ItemID).update(newState);
        } else {
          const setItemInsert = firebase
            .database()
            .ref(`Store/${tempId.item_id * 1 + 1}`);
          let newState = {
            ItemID: tempId.item_id * 1 + 1,
            imageUrl: this.state.imageUrl,
            Name: this.state.BusinessName,
            Open: this.state.OpenShop,
            Phone: this.state.PhoneNumbe,
            Address: this.state.Address,
            StoreType: this.state.BusinessType,
            Type: this.state.ServiceType
          };
          setItemInsert.set(newState);
        }
      });
      this.onClickCancel();
    }, 1000);
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
            {/* {JSON.stringify(this.state.BusinessName)} */}
            <Input
              type="textbox"
              name="BusinessName"
              id="BusinessName"
              value={this.state.BusinessName}
              onChange={e => this.setState({ BusinessName: e.target.value })}
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
              name="OpenShop"
              // initialValue ={this.state.BusinessName}
              id="OpenShop"
              value={this.state.OpenShop}
              onChange={e => this.setState({ OpenShop: e.target.value })}
              whitespace={true}
              maxLength={20}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="PhoneNumbe"
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
              name="PhoneNumbe"
              id="PhoneNumbe"
              value={this.state.PhoneNumbe}
              onChange={e => this.setState({ PhoneNumbe: e.target.value })}
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
            name="BusinessType"
            label="Business Type"
            rules={[
              {
                required: true,
                message: <small>Please input your Business Type</small>
              }
            ]}
          >
            <Radio.Group
              id="BusinessType"
              value={this.state.BusinessType}
              onChange={e => this.onChangeCheckRadio(e)}
            >
              <Radio value="มีร้าน" name="มีร้าน">
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
                message: <small>Please input your Service Type</small>
              }
            ]}
          >
            <Checkbox.Group
              id="ServiceType"
              options={this.state.options}
              onChange={e => this.onChangeCheckBox(e)}
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

export default RegistrationForm;

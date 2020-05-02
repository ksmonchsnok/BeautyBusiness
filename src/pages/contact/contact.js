import React, { Component } from "react";
import Navbar from "../../components/navbar/navbar.js";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import BG from "../../assets/image/beautysalonjpg.jpg";

export default class Contact extends Component {
  onclickBack = () => {
    window.history.back();
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 4,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 20,
        },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 0,
        },
      },
    };

    const RegistrationForm = () => {
      const [form] = Form.useForm();

      const onFinish = (values) => {
        console.log("Received values of form: ", values);
      };
    };
    return (
      <div
        id="Contact"
        style={{
          marginTop: "1em",
          paddingBottom: "-5em !important",
          paddingTop: "2.3rem",
        }}
      >
        <Navbar />
        <div className="card container rounded-lg" id="contact-message">
          <br />
          <div className="row " style={{ background: "transparent" }}>
            <div className="col-xs-12 col-md-12 col-lg-8">
              <h3 className="text-center">
                <u>กรอกข้อมูลติดต่อ</u>
              </h3>
              <div
                className="container"
                style={{ marginBottom: "2rem", marginTop: "2rem" }}
              >
                <Form
                  {...formItemLayout}
                  form={this.form}
                  name="contact"
                  onFinish={this.onFinish}
                  scrollToFirstError
                >
                  <Form.Item
                    name="name"
                    label="ชื่อ"
                    rules={[
                      {
                        required: true,
                        message: <small>กรุณากรอกชื่อ</small>,
                      },
                      {
                        type: "string",
                        pattern: new RegExp("^[A-Za-zก-๙]*$"),
                        message: <small>กรุณากรอกเฉพาะตัวอักษร</small>,
                      },
                    ]}
                  >
                    <Input
                      placeholder="ชื่อ-นามสกุล"
                      minLength={5}
                      maxLength={40}
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="เบอร์โทร"
                    rules={[
                      {
                        required: true,
                        message: <small>กรุณากรอกเบอร์โทรศัพท์</small>,
                      },

                      {
                        pattern: new RegExp("^[0-9-]*$"),
                        message: <small>กรุณากรอกเฉพาะตัวเลข</small>,
                      },
                    ]}
                  >
                    <Input
                      placeholder="000-000-0000"
                      min={10}
                      maxLength={12}
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="อีเมล์"
                    rules={[
                      {
                        type: "email",
                        message: <small>กรุณาตรวจสอบรูปของ E-mail</small>,
                      },
                      {
                        required: true,
                        message: <small>กรุณากรอก E-mail</small>,
                      },
                    ]}
                  >
                    <Input
                      placeholder="xxxxxx@gmail.com"
                      maxLength={35}
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="ข้อความ"
                    rules={[
                      {
                        required: true,
                        message: <small>กรุณากรอกข้อความ</small>,
                      },
                    ]}
                  >
                    <Input.TextArea
                      minLength={10}
                      maxLength={200}
                      placeholder="เขียนข้อความถึงเรา..."
                      allowClear
                    />
                  </Form.Item>
                  <div className="row justify-content-center">
                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                      <button
                        type="button"
                        type="submit"
                        className="btn  btn-block"
                        style={{
                          backgroundColor: "#F69220",
                          color: "#ffffff",
                        }}
                        {...tailFormItemLayout}
                      >
                        ส่งข้อความ
                      </button>
                      {/* <button
                        type="button"
                        type="reset"
                        className="btn btn-danger btn-block"
                        onClick={() => {
                          window.location.reload(true);
                        }}
                      >
                        ยกเลิก
                      </button> */}
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-xs-12 col-md-12 col-lg-4">
              <div className="row container">
                <div
                  className="col-xs-12 col-sm-8 col-lg-12"
                  style={{ marginBottom: "2rem" }}
                >
                  {" "}
                  <h3 style={{ marginTop: "0.1rem" }}>
                    <u>ติดต่อเรา</u>
                  </h3>
                  <a href="tel:0855210364" style={{ color: "#343a40" }}>
                    <ion-icon
                      name="call"
                      size="large"
                      style={{ marginRight: "1rem" }}
                    />
                    085-521-0364 <br />
                  </a>
                  <a
                    href="mailto:ksmonchsnok@gmail.com"
                    style={{ color: "#343a40" }}
                  >
                    {" "}
                    <ion-icon
                      name="mail"
                      size="large"
                      style={{ marginRight: "1rem" }}
                      alt="ksmonchsnok@gmail.com"
                    />
                    {/* <p className="d-none d-xs-none d-sm-none d-md-none d-lg-block d-xl-block"> */}
                    ksmonchsnok@gmail.com
                  </a>
                  <br />
                  <a
                    href="https://www.facebook.com/papadagon"
                    style={{ color: "#343a40" }}
                  >
                    {" "}
                    <ion-icon
                      name="logo-facebook"
                      size="large"
                      style={{ marginRight: "1rem" }}
                    />
                  </a>{" "}
                  <a
                    href="https://www.instagram.com/kplynx"
                    style={{ color: "#343a40" }}
                  >
                    {" "}
                    <ion-icon
                      name="logo-instagram"
                      size="large"
                      style={{ marginRight: "1rem" }}
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/papadagon"
                    style={{ color: "#343a40" }}
                  >
                    <ion-icon
                      name="logo-twitter"
                      size="large"
                      style={{ marginRight: "1rem" }}
                    />
                  </a>{" "}
                  <a
                    href="https://www.facebook.com/papadagon"
                    style={{ color: "#343a40" }}
                  >
                    {" "}
                    <ion-icon
                      name="logo-youtube"
                      size="large"
                      style={{ marginRight: "1rem" }}
                    />
                  </a>{" "}
                </div>

                <div className="col-xs-12 col-sm-4 col-lg-12">
                  <h3>
                    <u>เวลาทำการ</u>
                  </h3>

                  <p style={{ marginTop: "1rem" }}>
                    {" "}
                    จันทร์ -วันศุกร์ เวลา 09.00 น. - 17.00 น.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

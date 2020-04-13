import React, { Component } from "react";
import Navbar from "../../components/navbar/navbar.js";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";

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
      <div id="Contact">
        <Navbar />
        <div className="container">
          <h2 className="text-center" style={{ marginTop: "-2rem" }}>
            <br />
            Contact Us
          </h2>
          {/* <hr style={{marginBottom:"1rem"}}/> */}
          <div className="row jumbotron" style={{ background: "transparent" }}>
            <div className="col-xs-12 col-md-6 col-lg-6">
              <h3>
                <u>ติดต่อเรา</u>
              </h3>
              <ion-icon
                name="call"
                size="large"
                style={{ marginRight: "1rem" }}
              />
              085-521-0364 <br />
              <ion-icon
                name="mail"
                size="large"
                style={{ marginRight: "1rem" }}
              />{" "}
              <a href>ksmonchsnok@gmail.com</a> <br />
              <ion-icon
                name="logo-facebook"
                size="large"
                style={{ marginRight: "1rem" }}
              />
              <a href="https://www.facebook.com/papadagon">Kp lyn</a> <br />
              <ion-icon
                name="logo-instagram"
                size="large"
                style={{ marginRight: "1rem" }}
              />
              <a href="https://www.instagram.com/kplynx">Kplynx</a>
              <h3 style={{ marginTop: "2rem" }}>
                <u>เวลาทำการ</u>
              </h3>
              <ion-icon
                name="time"
                size="large"
                style={{ marginRight: "1rem" }}
              />
              วันจันทร์ -วันศุกร์ <br />
              <p style={{ textIndent: "3.5em", marginBottom: "2rem" }}>
                เวลา 09.00 น. - 17.00 น.
              </p>
            </div>

            <div
              className="col-xs-12 col-md-6 col-lg-6"
              style={{ border: "2px solid #000" }}
            >
              <h3 className="text-center" style={{ marginTop: "1rem" }}>
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
                    ]}
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    label="นามสกุล"
                    rules={[
                      {
                        required: true,
                        message: <small>กรุณากรอกนามสกุล</small>,
                      },
                    ]}
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="เบอร์โทร"
                    rules={[
                      {
                        required: true,
                        message: <small>กรุณากรอกเบอร์โทรศัพท์</small>,
                      },
                    ]}
                  >
                    <Input allowClear />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="E-mail"
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
                    <Input allowClear />
                  </Form.Item>

                  <div className="row justify-content-center">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5">
                      <button
                        type="button"
                        type="submit"
                        className="btn btn-success btn-block"
                        {...tailFormItemLayout}
                      >
                        ส่งข้อมูล
                      </button>
                      <button
                        type="button"
                        type="reset"
                        className="btn btn-danger btn-block"
                        onClick={() => {
                          window.location.reload(true);
                        }}
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <hr />

          <div className="row container">
            <button
              type="button"
              onClick={this.onclickBack}
              className="btn btn-dark"
              style={{ marginBottom: "4rem" }}
            >
              ย้อนกลับ
            </button>
          </div>
        </div>
      </div>
    );
  }
}

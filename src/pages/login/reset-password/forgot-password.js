import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../../style.css';
import {Form,Input,Button,} from 'antd';
import Navbar from "../../../components/navbar/navbar.js"


export default class ForgotPassword extends Component {

     RegistrationForm = () => {
        const [form] = Form.useForm();
      
        const onFinish = values => {
        //   console.log('Received values of form: ', values);
        };
    }                    


    onClickForgotPassword = ()=>{

    }



    render() {
        const formItemLayout = {
            labelCol: {
              xs: {
                span: 24,
              },
              sm: {
                span: 8,
              },
            },
            wrapperCol: {
              xs: {
                span: 24,
              },
              sm: {
                span: 16,
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
                span: 16,
                offset: 8,
              },
            },
          };

          console.log(this.props);
          
        return (
            <div id="Forgot-Password">
                <Navbar/>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                    <div className="col-10">
                    <h3 style={{marginBottom:"4rem"}}>Forgot Your Password</h3>

                    {/* Forgot Password */}

                    <Form
                              {...formItemLayout}
                              form={this.form}
                              name="register"
                              // onFinish={this.onFinish}
                              scrollToFirstError
                              >

                              <Form.Item
                              name="email"
                              label="Your Email"
                              rules={[
                              {
                                  required: true,
                                  message: <small>Please input your email!</small>,
                              },
                              ]}
                              >
                              <Input allowClear />
                              </Form.Item> 

                              <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" style={{marginTop:"2rem"}} onClick={this.onClickForgotPassword}>
                                     Send
                                </Button>
                            </Form.Item>

                            </Form>


                    </div>
                    </div>
                    </div>
                </div>
        );
    }
}

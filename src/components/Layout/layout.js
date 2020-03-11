import React, { Component } from "react";
import "antd/dist/antd.css";
import "../../style.css";
import Head from "../Header/Header.js";
import Routing from "../routing/routing.js";
import Footer from "./footer/footer.js";

import { Layout, Menu, Breadcrumb } from 'antd';
import bg from '../../assets/image/bg.jpg' ;

export default class layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Header, Content, Footer } = Layout;
    return (
      <div id="Layout-Page">
       <Layout className="layout" >
    <Header>
      {/* <div className="logo" /> */}
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">Home</Menu.Item>
      
      </Menu>
    </Header>



    <Content style={{ padding: '0 50px' }} styles={{ backgroundImage:`url(${bg})` }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">Content</div>
    </Content>


    <Footer style={{ textAlign: 'center' }}>©2020 Beauty Business.</Footer>
  </Layout>,
      </div>
    );
  }
}

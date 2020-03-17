import React, { Component } from "react";
import Navbar from "../../components/navbar/navbar-Admin.js";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  SoundOutlined,
  BarChartOutlined,
  UserOutlined
} from "@ant-design/icons";

export default class Admin extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    const { Sider, Content } = Layout;

    return (
      <div id="Admin-Page">
        <Navbar />
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <HomeOutlined />
                <span className="nav-text">จัดการธุรกิจ</span>
              </Menu.Item>
              <Menu.Item key="2">
                <UserOutlined />
                <span className="nav-text">จัดการผู้ใช้งาน</span>
              </Menu.Item>
              <Menu.Item key="3">
                <SoundOutlined />
                <span className="nav-text">จัดการโปรโมชั่น</span>
              </Menu.Item>
              <Menu.Item key="4">
                <BarChartOutlined />
                <span className="nav-text">ดูรายงาน</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                content
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

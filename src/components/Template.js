import React, { Component } from "react";
import ModalLogin from "./ModalLogin";
import ModalSignUp from "./ModalSignUp";
import { isAuthenticated } from "../service";
import { Layout, Menu, Typography, Icon } from "antd";

const { Header, Content } = Layout;
const { Text } = Typography;

const user = localStorage.getItem("user");

class Template extends Component {
  state = {
    isLogin: false,
    isLogout: false
  };
  logOut = () => {
    this.setState({ isLogout: true });
    localStorage.clear();
  };

  auth = isAuthenticated();
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Layout>
          <Header>
            <Menu
              {...this.props}
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["home"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="home">
                <Text strong style={{ color: "#fff" }}>
                  Trello
                </Text>
              </Menu.Item>
              {!this.auth ? (
                <Menu.SubMenu
                  {...this.props}
                  title={
                    <>
                      <Icon type="user" />
                      <Text strong style={{ color: "#fff" }}>
                        Login/SignUp
                      </Text>
                    </>
                  }
                >
                  <Menu.Item>
                    <ModalLogin />
                  </Menu.Item>
                  <Menu.Item>
                    <ModalSignUp />
                  </Menu.Item>
                </Menu.SubMenu>
              ) : (
                <>
                  <Text strong style={{ color: "#fff" }}>
                    Welcome {user.toUpperCase()}
                  </Text>
                  <Text strong style={{ color: "#fff" }} onClick={this.logOut}>
                    Logout
                  </Text>
                </>
              )}
            </Menu>
          </Header>
          <Content style={{ padding: "0 20px" }}>{this.props.children}</Content>
        </Layout>
      </div>
    );
  }
}

export default Template;

import React, { Component } from "react";
import ModalLogin from "./ModalLogin";
import ModalSignUp from "./ModalSignUp";
import { isAuthenticated } from "../service";

import { Link } from "react-router-dom";
import { Layout, Menu, Typography, Icon, message } from "antd";

const { Header, Content } = Layout;
const { Text } = Typography;

// authentication
const auth = isAuthenticated();
class Template extends Component {
  state = {
    isLogin: auth,
    user: ""
  };

  success = res => {
    message.success(res);
  };

  error = res => {
    message.error(res);
  };

  warning = res => {
    message.warning(res);
  };
  // log out method
  logOut = async () => {
    localStorage.clear();
    this.setState({ isLogin: await isAuthenticated(), user: "" });
  };
  // log in method
  logIn = async () => {
    this.setState({
      isLogin: await isAuthenticated(),
      user: localStorage.getItem("user")
    });
    await this.forceUpdate();
  };

 
  render() {
    const { isLogin, user } = this.state;
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
                <Link to="/">Home</Link>
              </Menu.Item>
              {isLogin ? (
                <>
                  <Text strong style={{ color: "#fff", padding: "1rem" }}>
                    {user}
                  </Text>
                  <Text
                    strong
                    style={{ color: "#fff", cursor: "pointer" }}
                    onClick={this.logOut}
                  >
                    Logout
                  </Text>
                </>
              ) : (
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
                    <ModalLogin
                      action={this.logIn}
                      success={this.success}
                      error={this.error}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <ModalSignUp success={this.success} error={this.error} />
                  </Menu.Item>
                </Menu.SubMenu>
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

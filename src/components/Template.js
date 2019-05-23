import React, { Component } from "react";
import ModalLogin from "./ModalLogin";
import ModalSignUp from "./ModalSignUp";
import { isAuthenticated } from "../service";
import { Layout, Menu, Typography, Icon } from "antd";

const { Header, Content } = Layout;
const { Text } = Typography;

// authentication
const auth = isAuthenticated();

class Template extends Component {
  state = {
    isLogin: auth
  };
 
  // log out method
  logOut = () => {
    localStorage.clear();
    this.setState({ isLogin: false });
  };
  // log in method
  logIn = () => {
    setTimeout(() => {
      this.setState({ isLogin: true });
    });
    this.forceUpdate();
  };

  render() {
    const user = localStorage.getItem("user");
    const { isLogin } = this.state;
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
              {!isLogin ? (
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
                    <ModalLogin action={this.logIn} />
                  </Menu.Item>
                  <Menu.Item>
                    <ModalSignUp />
                  </Menu.Item>
                </Menu.SubMenu>
              ) : (
                <>
                  <Text strong style={{ color: "#fff" , padding: '1rem'}}>
                    { user.toUpperCase()}
                  </Text>
                  <Text
                    strong
                    style={{ color: "#fff", cursor: "pointer" }}
                    onClick={this.logOut}
                  >
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

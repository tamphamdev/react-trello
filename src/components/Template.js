import React, { Component } from "react";
import ModalLogin from "./ModalLogin";
import ModalSignUp from "./ModalSignUp";
import { isAuthenticated } from "../service";
import { Layout, Menu, Typography, Icon, message } from "antd";

const { Header, Content } = Layout;
const { Text } = Typography;

// authentication
const auth = isAuthenticated();

class Template extends Component {
  state = {
    isLogin: auth
  };

   success = (res) => {
    message.success(res);
  };
  
   error = (res) => {
    message.error(res);
  };
  
   warning = (res) => {
    message.warning(res);
  };
  // log out method
  logOut = () => {
    localStorage.clear();
    this.setState({ isLogin: !auth });
  };
  // log in method
  logIn = () => {
    setTimeout(() => {
      this.setState({ isLogin: auth });
    });
    this.forceUpdate();
  };

  render() {
    const user = localStorage.getItem("user");
    const { isLogin } = this.state;
    console.log("isLogin template",isLogin);
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
              {!auth ? (
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
                    <ModalLogin onLogin={this.logIn} success={this.success} error={this.error}/>
                  </Menu.Item>
                  <Menu.Item>
                    <ModalSignUp success={this.success} error={this.error}/>
                  </Menu.Item>
                </Menu.SubMenu>
              ) : (
                <>
                  <Text strong style={{ color: "#fff" , padding: '1rem'}}>
                    {user}
                    {/* {user !== 'undefined' ? user.toUpperCase() : null} */}
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

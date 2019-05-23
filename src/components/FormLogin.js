import React, { Component } from "react";
import { Input, Icon } from "antd";
import { login } from "../service";

class FormLogin extends Component {
  state = {
    email: "",
    password: ""
  };
  
  // Thay đổi input mỗi khi match với name của input
  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // submit form login
  submitLogin = e => {
    e.preventDefault();
    e.stopPropagation()
    login(this.state).then(res => {
      if(res.statusCode !== 400) {
        this.props.success(res.message);
      } else {
        this.props.error(res.message);
      }
    });
   
    this.setState({ email: "", password: "" });
  };
  // handler "Enter" key
  keyUpHandler = e => {
    if (e.keyCode === 13) {
      this.submitLogin();
    }
  };
  render() {
    const { email, password } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <form onSubmit={this.submitLogin.bind(this)} id="myform">
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="text"
            placeholder="Your email"
            value={email}
            onChange={this.handleOnChange}
            name="email"
            required
            style={{ margin: "15px" }}
          />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={this.handleOnChange}
            name="password"
            required
            style={{ margin: "15px" }}
          />
        </form>
      </div>
    );
  }
}

export default FormLogin;

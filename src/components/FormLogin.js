import React, { Component } from "react";
import { Input, Modal, Button } from "antd";
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

  submitLogin = e => {
    e.preventDefault();
    login(this.state).catch(err => alert(err));
  };

  render() {
    const { email, password } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <form onSubmit={this.submitLogin} id="myform">
          <Input
            type="text"
            placeholder="Your email"
            value={email}
            onChange={this.handleOnChange}
            name="email"
            required
            style={{ margin: "15px" }}
          />
          <Input
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

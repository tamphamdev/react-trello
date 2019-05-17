import React, { Component } from "react";
import { Input, Icon } from "antd";
import { login } from "../service";

class FormLogin extends Component {
  state = {
    email: "",
    password: "",
  };
  
  // Thay đổi input mỗi khi match với name của input
  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
//TODO:validate emai ở đây  
  // validateEmail(e) {
  //   const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   const { validate } = this.state
  //     if (emailRex.test(e.target.value)) {
  //       validate.emailState = 'has-success'
  //     } else {
  //       validate.emailState = 'has-danger'
  //     }
  //     this.setState({ validate })
  //   }
  submitLogin = e => {
    e.preventDefault();
    login(this.state).catch(err => alert(err));
    this.setState({ email: "", password: ""});
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

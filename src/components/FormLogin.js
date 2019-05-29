import React, { Component } from "react";
import { Input, Button, Form, Icon, Typography } from "antd";
import { login } from "../service";
import { Link } from "react-router-dom";
const { Text } = Typography;
class FormLogin extends Component {
  state = {
    email: "",
    password: ""
  };

  hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  // disbled button submit at beginning
  componentDidMount() {
    this.props.form.validateFields();
  }

  // Thay đổi input mỗi khi match với name của input
  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // submit form login
  handleSubmit = e => {
    e.preventDefault();
    // e.stopPropagation();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values).then(res => {
          if (res.statusCode !== 400) {
            this.props.success(res.message);
          } else {
            this.props.error(res.message);
          }
        });
      } else {
        return;
      }
    });
    this.props.form.resetFields();
    this.props.closeModal();
  };
  keyUpHandler = e => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const emailError = isFieldTouched("email") && getFieldError("email");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={emailError ? "error" : ""}
          help={emailError || ""}
          hasFeedback
        >
          {getFieldDecorator("email", {
            rules: [
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "The input is not valid E-mail!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
          hasFeedback
        >
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Please input your Password!" },
              {
                min: 6,
                message: "Password must be longer than 6 characters!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Text onClick={this.props.handleCancel}>
            <Link to="/reset-password">Forgot password </Link>
          </Text>
          <Button
            type="primary"
            htmlType="submit"
            disabled={this.hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
FormLogin = Form.create({ name: "login" })(FormLogin);
export default FormLogin;

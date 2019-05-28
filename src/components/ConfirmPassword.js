import React, { Component } from "react";
import { Input, Button, Form, message, Col, Row } from "antd";
import { updatePassword, reset } from "../service";

export default class ConfirmPassword extends Component {
  state = {
    username: "",
    password: ""
  };
  error = res => {
    message.error(res);
  };

  success = res => {
    message.success(res);
  };

  handleOnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // submit form login
  updatePassword = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.form.validateFields((err, values) => {
      let data = {
        key: this.props.match.params.token,
        values
      };
      if (!err) {
        updatePassword(data).then(res => {
          if (res.statusCode !== 400) {
            this.success(res.message);
          } else {
            this.error(res.message);
          }
        });
      } else {
        return;
      }
    });
    this.props.form.resetFields();
    this.props.history.push("/");
  };
  keyUpHandler = e => {
    if (e.keyCode === 13) {
      this.updatePassword();
    }
  };
  async componentDidMount() {
    await reset(this.props.match.params.token)
      .then(res => {
        if (res.data.statusCode === 200) {
          this.setState({ password: res.data.password });
        }
      })
      .catch(error => {
        console.log("Error from Confirm password", error);
      });
  }
  /*Compare password */
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="center">
        <Col lg={8} md={8} sm={24} xs={24}>
          <Form onSubmit={this.updatePassword} id="confirmpassword">
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    min: 2,
                    message: "Password must be longer than 2 characters!"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    min: 2,
                    message: "Password must be longer than 2 characters!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Button onClick={this.updatePassword} onKeyUp={this.keyUpHandler}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}
ConfirmPassword = Form.create({ name: "confirmpassword" })(ConfirmPassword);

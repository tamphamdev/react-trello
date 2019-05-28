import React, { Component } from "react";
import {sendEmail} from '../service';
import { Form, Input, message  } from "antd";

 class ForgotPassword extends Component {
  state = {
    email: ""
  };
  handleOnChange = () => {
    const form = this.props.form;
    this.setState(prevState => ({
      email: form.getFieldValue("email")
    })
  )
  }
  success = res => {
    message.success(res);
  };

  error = res => {
    message.error(res);
  };
  /* Submit form */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        sendEmail(values).then(res => {
          if(res.statusCode !== 200 ) {
            this.error(res.message);
          } else {
            this.success(res.message);
          }
        });
      } 
      else {
        console.log('Error forgot password', err)
      }
    });
    this.props.form.resetFields();
  };


  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form 
        onSubmit={this.handleSubmit}
         id="forgot" title="Forgot password form">
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input onChange={this.handleOnChange}/>)}
        </Form.Item>
        </Form>
      </div>
    );
  }
}

ForgotPassword = Form.create({name: "forgotpassword"})(ForgotPassword);
export default ForgotPassword;
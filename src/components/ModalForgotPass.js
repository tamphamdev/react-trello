import React, { Component } from "react";
import { Modal, Button } from "antd";
import ForgotPassword from "./ForgotPassword";

export default class ModalForgotPass extends Component {
  state = {
    user: "",
    ModalText: "Content of the modal",
    visible: true,
    confirmLoading: false
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  // submit modal sign up
  handleSubmit = e => {
    this.setState({
      ModalText: "Please wait a second ",
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
      this.props.history.push("/");
    }, 500);
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
    this.props.history.push("/");
  };
  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Modal
          title="Forgot password Form"
          visible={visible}
          onOk={this.handleSubmit}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button
              type="primary"
              form="forgot"
              key="submit"
              htmlType="submit"
              onClick={this.handleSubmit}
            >
              Send email
            </Button>
          ]}
        >
          <ForgotPassword {...this.props} />
        </Modal>
      </div>
    );
  }
}

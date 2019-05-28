import React, { Component } from "react";
import { Modal, Typography } from "antd";
import FormLogin from "./FormLogin";
const { Text } = Typography;

export default class ModalLogin extends Component {
  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  // submit form
  handleSubmit = e => {
    this.setState({
      ModalText: "Logging....Please wait a second ",
      confirmLoading: true
    });
    setTimeout(() => {
      this.props.action();
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 500);
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <div type="primary" onClick={this.showModal}>
          <Text strong style={{ color: "#fff" }}>
            Login
          </Text>
        </div>
        <Modal
          footer={null}
          title="Login Form"
          visible={visible}
          onOk={this.handleSubmit}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <FormLogin
            {...this.state}
            {...this.props}
            closeModal={this.handleSubmit}
            handleCancel={this.handleCancel}
          />
        </Modal>
      </div>
    );
  }
}


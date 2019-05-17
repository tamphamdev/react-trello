import React, { Component } from 'react';
import {Modal, Button} from 'antd';
import FormSignUp from './FormSignUp';

export default class ModalLogin extends Component {

  state = {
    user: '',
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  
  handleSubmit = (e) => {
   
    this.setState({
      ModalText: 'Please wait a second ',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 500);
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
     const { visible, confirmLoading  } = this.state;
    return (
      <div>
        <div type="primary" onClick={this.showModal} >
          Sign Up
        </div>
        <Modal
        // footer={null}
        title="SignUp Form"
        visible={visible}
        onOk={this.handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
        footer={[
          <Button type="primary" form="signup" key="submit" htmlType="submit" onClick={this.handleSubmit}>
              Register
          </Button>
          ]}
          >
          <FormSignUp {...this.props}/>
        </Modal>
      </div>
    )
  }
};

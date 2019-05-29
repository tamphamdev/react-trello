import React, { Component } from 'react';
import {Modal} from 'antd';
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
  
  // submit modal sign up
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
    }, 1000);
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
        footer={null}
        title="SignUp Form"
        visible={visible}
        onOk={this.handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
          >
          <FormSignUp {...this.props}  closeModal={this.handleSubmit}/>
        </Modal>
      </div>
    )
  }
};

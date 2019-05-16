import React, { Component } from 'react';
import {Modal, Button} from 'antd';
import { login } from "../service";
import FormLogin from './FormLogin';

export default class ModalLogin extends Component {

  state = {
    user: '',
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  
  //TODO:chuyển state từ FormLogin lên Modal để submit
  handleSubmit = (e) => {
   
    this.setState({
      ModalText: 'Logging....Please wait a second ',
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
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  render() {
     const { visible, confirmLoading  } = this.state;
    return (
      <div>
        <div type="primary" onClick={this.showModal} style={{}}>
          Login
        </div>
        <Modal
        title="Login Form"
        visible={visible}
        onOk={this.handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
        footer={[
          <Button form="myform" key="submit" htmlType="submit">
              Submit
          </Button>
          ]}
        >
          <FormLogin {...this.props}>
          </FormLogin>
        </Modal>
      </div>
    )
  }
};

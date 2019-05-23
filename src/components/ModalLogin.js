import React, { Component } from 'react';
import {Modal, Button, Typography} from 'antd';
import FormLogin from './FormLogin';

const {Text} = Typography;


export default class ModalLogin extends Component {

  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // submit form
  handleSubmit = (e) => {

      this.setState({
        ModalText: 'Logging....Please wait a second ',
        confirmLoading: true,
      });
      setTimeout(() => {
        this.props.action();
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 500);
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
        <div type="primary" onClick={this.showModal} >
        <Text strong style={{ color: "#fff" }}>Login</Text>
        </div>
        <Modal
        title="Login Form"
        visible={visible}
        onOk={this.handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
        footer={[
          <Button form="myform" key="submit" htmlType="submit" onClick={this.handleSubmit}
          onKeyUp={this.handleSubmit}>
              Submit
          </Button>
          ]}
        >
          <FormLogin {...this.state}  {...this.props}/>
        </Modal>
      </div>
    )
  }
};

// }
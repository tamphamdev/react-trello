import React from 'react';
import {Layout,  Menu, Typography } from 'antd';
import ModalLogin from './ModalLogin';
const { Header, Content } = Layout;
const { Text } = Typography;

const Template = (props) => {
  return (
    <div>
      <Layout>
        <Header>
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}
        style={{ lineHeight: '32px' }}>
          <Menu.Item key='1'>  
           <Text strong style={{color: '#fff'}}> Trello</Text>
           </Menu.Item>
          <Menu.Item key='2'><ModalLogin/></Menu.Item>
          </Menu>
        </Header>
        <Content style={{padding: '0 20px'}}>
          {props.children}
        </Content>
      </Layout>
    </div>
  );
};

export default Template;
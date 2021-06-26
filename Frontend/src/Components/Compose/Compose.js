import React, { useState } from 'react';
import { Modal, Form, Button, Input, Typography, Select, Divider } from 'antd';
import 'antd/dist/antd.css';
import styles from '../Home.module.css';

const Compose = ({ setKeyValue }) => {
  console.log('COMPOSE');
  const { Title } = Typography;
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(true);
  const handleCancel = () => {
    setIsModalVisible(false);
    setKeyValue('2');
  };
  const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 19,
    },
  };
  return (
    <div>
      <Modal
        visible={isModalVisible}
        width={800}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Title level={3} className={styles['required-label']}>
          Compose
        </Title>
        <Divider>New message</Divider>
        <Form {...layout} name='composeMail' className={styles['form-box']}>
          <Form.Item
            label='To'
            name='to'
            rules={[{ required: true, message: 'This field cannot be empty!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Cc' name='cc'>
            <Input />
          </Form.Item>
          <Form.Item
            label='Subject'
            name='subject'
            rules={[{ required: true, message: 'Please Enter Subject!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Body'
            name='body'
            rules={[{ required: true, message: 'Email body cannot be empty!' }]}
          >
            <Input.TextArea autoSize={{ minRows: 6 }} />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
            <Button type='primary' htmlType='submit' style={{ width: '100px' }}>
              Send
            </Button>
            <Select style={{ width: 150 }} placeholder='Select schedule'>
              <Option value='minutely'>Every minute</Option>
              <Option value='weekly'>Every week</Option>
              <Option value='monthly'>Every month</Option>
              <Option value='yearly'>Every year</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Compose;

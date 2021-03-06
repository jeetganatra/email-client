import React, { useState } from 'react';
import {
  Modal,
  Form,
  Button,
  Input,
  Typography,
  Select,
  Divider,
  notification,
} from 'antd';
import 'antd/dist/antd.css';
import styles from '../Home.module.css';
import { sendMail } from '../../actions/mails';
import { useDispatch } from 'react-redux';
// import emailjs from "emailjs-com";

const Compose = ({ setKeyValue }) => {
  console.log('COMPOSE');
  const { Title } = Typography;
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [schedule, setSchedule] = useState('');
  const dispatch = useDispatch();
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

  const handleOnFinish = (e) => {
    const mailDetails = {
      to: e.to,
      cc: e.cc,
      subject: e.subject,
      body: e.body,
      scheduledFor: schedule,
    };
    dispatch(sendMail(mailDetails));
    // console.log("post req succ");
    notification['success']({ message: 'Email scheduled successfully!' });
    setIsModalVisible(false);
    setKeyValue('2');
    setSchedule('');
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
        <Form
          {...layout}
          name='composeMail'
          className={styles['form-box']}
          onFinish={handleOnFinish}
        >
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
            <Select
              style={{ width: 150 }}
              placeholder='Select schedule'
              onChange={(value) => setSchedule(value)}
            >
              <Option value='Every minute'>Every minute</Option>
              <Option value='Every week'>Every week</Option>
              <Option value='Every month'>Every month</Option>
              <Option value='Every year'>Every year</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Compose;

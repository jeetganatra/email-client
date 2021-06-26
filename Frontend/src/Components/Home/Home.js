import React, { useState } from 'react';
import { Button, notification, Menu, Table, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import styles from './Home.module.css';
import {
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  MailFilled,
  BarsOutlined,
} from '@ant-design/icons';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 200,
    alignmentBottom: 'center',
  });

  notification['success']({
    placement: 'bottomRight',
    message: 'Guys! Please appreciate🤣!',
  });
  const columns = [
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      width: '15%',
    },
    {
      title: 'Scheduled for',
      dataIndex: 'scheduledFor',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      width: '15%',
    },
    {
      title: 'Receipent',
      dataIndex: 'receipent',
      width: '15%',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
    },
  ];

  return (
    <>
      <div className={styles['header']}>
        <div className={styles['header-left']}>
          <Button onClick={() => setIsCollapsed(!isCollapsed)}>
            <BarsOutlined />
          </Button>
          <MailFilled style={{ fontSize: '2rem', color: 'black' }} />
          <div>
            <h1>notGmail</h1>
          </div>
        </div>
        <div className={styles['header-right']}>
          <h2>Avatar</h2>
          <Button type='primary' danger shape='round'>
            Logout
          </Button>
        </div>
      </div>
      <div className={styles['container']}>
        <div className={styles['container-left']}>
          <Menu
            defaultSelectedKeys={['2']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            inlineCollapsed={isCollapsed}
          >
            <Menu.Item key='1' icon={<MailOutlined />}>
              Compose
            </Menu.Item>
            <Menu.Item key='2' icon={<ContainerOutlined />}>
              All Mails
            </Menu.Item>
            <Menu.Item key='3' icon={<DesktopOutlined />}>
              Scheduled
            </Menu.Item>
            <Menu.Item key='4' icon={<ContainerOutlined />}>
              History
            </Menu.Item>
          </Menu>
        </div>
        <div className={styles['container-right']}>
          <Table
            columns={columns}
            rowKey={(record) => record.xyz}
            pagination={pagination}
            dataSource={data}
            loading={false}
            // onChange={this.handleTableChange}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

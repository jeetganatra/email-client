import React, { useState } from 'react';
import { Button, notification, Menu, Table, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import styles from './Home.module.css';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 200,
  });

  console.log(data);
  const columns = [
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      // sorter: true,
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
        <h1>Scheduler</h1>
        <div className={styles['header']}>
          <h2>Avatar</h2>
          <Button type='primary' danger shape='round'>
            Logout
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 150, minHeight: '100vh' }}>
          <Button
            type='primary'
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ marginBottom: 16 }}
          >
            {React.createElement(
              isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined
            )}
          </Button>
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
        <div style={{ width: 1500 }}>
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

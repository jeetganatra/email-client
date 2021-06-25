import React, { useState } from 'react';
import { Button, notification, Menu } from 'antd';
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
          <Menu.Item key='2' icon={<DesktopOutlined />}>
            Scheduled
          </Menu.Item>
          <Menu.Item key='3' icon={<ContainerOutlined />}>
            History
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default Home;

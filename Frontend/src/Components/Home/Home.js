import React, { useState } from 'react';
import { Button, notification, Menu, Table, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import styles from '../Home.module.css';
import {
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  MailFilled,
  BarsOutlined,
} from '@ant-design/icons';
import TableData from '../Table/TableData';
import History from '../History/History';
import Scheduled from '../Scheduled/Scheduled';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [keyValue, setKeyValue] = useState('2');

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
            <Menu.Item
              key='2'
              icon={<ContainerOutlined />}
              onClick={() => setKeyValue('2')}
            >
              All Mails
            </Menu.Item>
            <Menu.Item
              key='3'
              icon={<DesktopOutlined />}
              onClick={() => setKeyValue('3')}
            >
              Scheduled
            </Menu.Item>
            <Menu.Item
              key='4'
              icon={<ContainerOutlined />}
              onClick={() => setKeyValue('4')}
            >
              History
            </Menu.Item>
          </Menu>
        </div>
        {keyValue === '2' && <TableData category='All Mails' />}
        {keyValue === '3' && <Scheduled />}
        {keyValue === '4' && <History />}
      </div>
    </>
  );
};

export default Home;

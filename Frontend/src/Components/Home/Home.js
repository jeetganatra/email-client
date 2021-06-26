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
  PlusCircleFilled,
} from '@ant-design/icons';
import TableData from '../Table/TableData';
import History from '../History/History';
import Scheduled from '../Scheduled/Scheduled';
import Compose from '../Compose/Compose';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [keyValue, setKeyValue] = useState('2');

  console.log('KEY', keyValue);
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
            mode='inline'
            inlineCollapsed={isCollapsed}
          >
            <Button
              type='primary'
              shape='round'
              size='large'
              icon={<PlusCircleFilled />}
              onClick={() => setKeyValue('1')}
              style={{ margin: '10px' }}
            >
              Compose
            </Button>
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
        {keyValue === '1' && <Compose setKeyValue={setKeyValue} />}
        {(keyValue === '2' || keyValue === '1') && (
          <TableData category='All Mails' />
        )}
        {keyValue === '3' && <Scheduled />}
        {keyValue === '4' && <History />}
      </div>
    </>
  );
};

export default Home;

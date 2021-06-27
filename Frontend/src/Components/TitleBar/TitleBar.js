import React from 'react';
import { Menu, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import styles from '../Home.module.css';
import { MailFilled } from '@ant-design/icons';
const TitleBar = () => {
  return (
    <div className={styles['header']}>
      <div className={styles['header-left']}>
        <MailFilled
          style={{ fontSize: '2rem', color: 'black', marginLeft: '10px' }}
        />
        <div>
          <h1>notGmail</h1>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;

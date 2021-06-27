import React from 'react';
import { Menu, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import styles from '../Home.module.css';
import { MailFilled } from '@ant-design/icons';
const TitleBar = () => {
  return (
    <div className={`${styles.header} navbar bg-dark`}>
      <div className={styles['header-left']}>
        <a href='#!' style={{ fontSize: '2rem', alignItems: 'center' }}>
          Welcome to <i className='fas fa-envelope' />{' '}
          <span> notGmail.....</span>{' '}
        </a>
      </div>
    </div>
  );
};

export default TitleBar;

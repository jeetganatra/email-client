import React, { useState, useEffect } from 'react';
import { Button, notification, Menu } from 'antd';
import 'antd/dist/antd.css';
import styles from '../Home.module.css';
import {
  DesktopOutlined,
  ContainerOutlined,
  MailFilled,
  MenuOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import TableData from '../Table/TableData';
import History from '../History/History';
import Scheduled from '../Scheduled/Scheduled';
import Compose from '../Compose/Compose';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMails } from '../../actions/mails';
import { useSelector } from 'react-redux';

const Home = () => {
  console.log('home called');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [keyValue, setKeyValue] = useState('2');
  let historyData = [];
  let scheduledData = [];
  const history = useHistory();
  const dispatch = useDispatch();
  const mailList = useSelector((state) => state.mails.mailList);
  const postReqSuc = useSelector((state) => state.mails.postReqSuc);
  const isLogged = localStorage.getItem('isLogged');
  const user = JSON.parse(localStorage.getItem('profile'));
  const name = JSON.parse(localStorage.getItem('profile'))?.profile?.name;
  const fname = JSON.parse(localStorage.getItem('profile'))?.profile?.fname;
  const lname = JSON.parse(localStorage.getItem('profile'))?.profile?.lname;
  console.log(mailList);

  useEffect(() => {
    console.log('use effect home');
    if (keyValue == '2' || postReqSuc) {
      dispatch(getMails());
      dispatch({ type: 'POST_SUC', payload: false });
    }
  }, [keyValue, postReqSuc]);

  // console.log(typeof isLogged);

  if (isLogged === 'false') {
    alert('Enter credentials first!!');
    history.push('/');
    return <div>login required</div>;
  }

  const data = Object.keys(mailList).map(function (key, index) {
    return mailList[key];
  });
  // console.log(mailList);
  console.log(data);
  let filteredData = [];
  let copies = [];
  for (let i = data.length - 1; i >= 0; i--) {
    if (
      data[i].creator === user.profile._id ||
      data[i].creator === user.profile.googleId
    ) {
      if (filteredData.length === 0) {
        filteredData.push({ ...data[i], copies: 1 });
      } else {
        console.log(i, filteredData.slice(-1)[0], data[i]);
        if (
          data[i].body === filteredData.slice(-1)[0].body &&
          data[i].creator === filteredData.slice(-1)[0].creator &&
          data[i].scheduledFor === filteredData.slice(-1)[0].scheduledFor &&
          data[i].subject === filteredData.slice(-1)[0].subject &&
          data[i].to === filteredData.slice(-1)[0].to
        ) {
          filteredData.slice(-1)[0].copies++;
        } else {
          filteredData.push({ ...data[i], copies: 1 });
        }
      }
    }
  }

  for (let i = 0; i < filteredData.length; i++) {
    const mail = filteredData[i];
    const curTime = new Date().getTime();
    const det = new Date(mail.scheduledAt).getTime();
    const toCheck = parseFloat((curTime - det) / (1000 * 60));
    // console.log(mail.scheduledFor);

    if (mail.scheduledFor === 'Every minute' && toCheck > 1.0) {
      historyData.push(mail);
    } else if (mail.scheduledFor === 'Every week' && toCheck > 10080.0) {
      historyData.push(mail);
    } else if (mail.scheduledFor === 'Every month' && toCheck > 43200.0) {
      historyData.push(mail);
    } else if (mail.scheduledFor === 'Every year' && toCheck > 525600.0) {
      historyData.push(mail);
    } else if (mail.scheduledFor === '') {
      historyData.push(mail);
    } else {
      scheduledData.push(mail);
    }
  }

  return (
    <>
      <div className={`${styles.header} navbar bg-dark`}>
        <div className={styles['header-left']}>
          <a
            href='#!'
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ fontSize: '1.5rem', alignItems: 'center' }}
          >
            <i className='fas fa-bars' />
          </a>
          <a
            href='#!'
            onClick={() => {
              history.push('/home');
            }}
            style={{ fontSize: '2rem', alignItems: 'center' }}
          >
            <i className='fas fa-envelope' /> <span> notGmail</span>{' '}
          </a>
        </div>
        <div className={styles['header-right']}>
          <div>
            <i className='fas fa-user' />{' '}
            <span> {name ? name : fname + ' ' + lname} </span>{' '}
          </div>

          <a
            href='#!'
            onClick={() => {
              dispatch({ type: 'LOGOUT', payload: false });
              localStorage.setItem('isLogged', false);
              history.push('/');
            }}
          >
            <i className='fas fa-sign-out-alt' /> <span>Logout </span>{' '}
          </a>
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
              icon={<PlusOutlined />}
              onClick={() => setKeyValue('1')}
              style={{ margin: '10px', alignItems: 'center' }}
            >
              {!isCollapsed && `Compose`}
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
          <TableData category='All Mails' mailList={filteredData} />
        )}
        {keyValue === '3' && <Scheduled mailList={scheduledData} />}
        {keyValue === '4' && <History mailList={historyData} />}
      </div>
    </>
  );
};

export default Home;
